import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Razorpay from "razorpay";

dotenv.config();

const app = express();

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY || "";
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET || "";

let razorpay = null;
if (razorpayKeyId && razorpayKeySecret) {
  razorpay = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });
} else {
  console.warn("⚠️ Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env");
}

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/resume-builder")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err.message));

// MongoDB Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  templateId: { type: String, default: "modern" },
  formData: { type: Object, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const templateSchema = new mongoose.Schema({
  name: String,
  description: String,
  color: String,
  layout: String
});

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  paymentId: { type: String },
  signature: { type: String },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  method: { type: String, default: "unknown" },
  userName: { type: String, default: "" },
  userEmail: { type: String, default: "" },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  failureReason: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Resume = mongoose.model("Resume", resumeSchema);
const Template = mongoose.model("Template", templateSchema);
const Payment = mongoose.model("Payment", paymentSchema);

// Middleware: Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Routes: Authentication
app.post("/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "24h" });
    res.json({ token, user: { id: user._id, email, name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "24h" });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes: Templates
app.get("/api/templates", async (req, res) => {
  try {
    let templates = await Template.find();

    // If no templates, create default ones
    if (templates.length === 0) {
      const defaultTemplates = [
        { name: "Modern", description: "Clean and modern design", color: "#4f46e5", layout: "modern" },
        { name: "Classic", description: "Traditional black and white", color: "#000000", layout: "classic" },
        { name: "Creative", description: "Colorful and creative", color: "#9333ea", layout: "creative" }
      ];
      templates = await Template.insertMany(defaultTemplates);
    }

    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes: Resume Operations
app.post("/api/resume/save", verifyToken, async (req, res) => {
  try {
    const { templateId, formData, content } = req.body;

    const resume = new Resume({
      userId: req.userId,
      templateId,
      formData,
      content
    });

    await resume.save();
    res.json({ success: true, resumeId: resume._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/resume/:id", verifyToken, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume || resume.userId.toString() !== req.userId) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes: Resume Generation (existing endpoint)
app.post("/generate", async (req, res) => {
  const { name, skills, experience, title } = req.body;

  const prompt = `Create a professional resume summary for:
Name: ${name}
Title: ${title || "Professional"}
Skills: ${skills}
Experience: ${experience}`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.send(response.data.choices[0].message.content);
  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);
    res.status(500).send("Something went wrong");
  }
});

// Routes: Payments
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const {
      amount = 9,
      currency = "INR",
      plan = "Pro",
      method = "unknown",
      userName = "",
      userEmail = "",
    } = req.body;

    if (!razorpay || !razorpayKeyId || !razorpayKeySecret) {
      return res.status(500).json({
        error: "Razorpay keys are not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend .env",
      });
    }

    const amountInPaise = Math.round(Number(amount) * 100);
    if (!amountInPaise || amountInPaise < 100) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt: `rcpt_${Date.now()}`,
      notes: {
        plan,
        method,
      },
    });

    await Payment.create({
      orderId: order.id,
      plan,
      amount: Number(amount),
      currency,
      method,
      userName,
      userEmail,
      status: "pending",
      updatedAt: new Date(),
    });

    return res.json({
      key: razorpayKeyId,
      order,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unable to create payment order" });
  }
});

app.post("/api/payment/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
      amount,
      method,
      userName,
      userEmail,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: "Missing payment verification fields" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          $set: {
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            status: "failed",
            failureReason: "Invalid payment signature",
            plan: plan || "Pro",
            amount: Number(amount || 0),
            method: method || "unknown",
            userName: userName || "",
            userEmail: userEmail || "",
            updatedAt: new Date(),
          },
        },
      );
      return res.status(400).json({ success: false, error: "Invalid payment signature" });
    }

    await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        $set: {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: "success",
          failureReason: "",
          plan: plan || "Pro",
          amount: Number(amount || 0),
          method: method || "unknown",
          userName: userName || "",
          userEmail: userEmail || "",
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );

    return res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || "Payment verification failed" });
  }
});

app.post("/api/payment/fail", async (req, res) => {
  try {
    const { orderId, reason = "Payment failed" } = req.body;
    if (!orderId) {
      return res.status(400).json({ success: false, error: "orderId is required" });
    }

    await Payment.findOneAndUpdate(
      { orderId },
      {
        $set: {
          status: "failed",
          failureReason: reason,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || "Unable to mark payment failure" });
  }
});

app.get("/api/payment/history", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit || 20), 100);
    const status = req.query.status;
    const filter = status ? { status } : {};

    const payments = await Payment.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("orderId paymentId plan amount currency method userName userEmail status failureReason createdAt updatedAt");

    return res.json({ count: payments.length, payments });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unable to fetch payment history" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
