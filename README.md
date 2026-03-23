# AI Resume Builder

A full-stack AI-powered resume builder that helps users generate, edit, preview, export, and monetize professional resumes.

## Portfolio Summary

AI Resume Builder is an end-to-end product project that combines AI content generation, modern UI/UX, PDF export, user authentication, and Razorpay payment integration.

### Highlights

- Built a modern React + TypeScript frontend with interactive builder and A4 resume preview mode.
- Integrated AI resume generation workflow through a backend API.
- Added editable preview mode for real-time updates to contact details, skills, experience, and education.
- Implemented PDF export functionality for generated resumes.
- Added authentication APIs (register/login) with JWT and bcrypt.
- Integrated Razorpay checkout with secure server-side signature verification.
- Persisted payment transactions in MongoDB with status tracking (pending/success/failed).

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Radix UI, Motion
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Auth: JWT, bcryptjs
- Payments: Razorpay
- Utilities: jsPDF, Sonner, Lucide

## Key Features

- AI-assisted resume content generation
- Form-based resume builder
- Live resume preview and full-page A4 preview mode
- Edit mode directly inside preview
- PDF download/export
- Template selection section
- Login and create account flows
- Pricing and payment method flow
- Razorpay order creation and payment verification
- Payment history API

## API Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Resume

- `POST /generate`
- `POST /api/resume/save`
- `GET /api/resume/:id`

### Payments

- `POST /api/payment/create-order`
- `POST /api/payment/verify`
- `POST /api/payment/fail`
- `GET /api/payment/history`

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment

Create `.env` in the project root using values from `.env.example`.

Required keys:

- `MONGODB_URI`
- `JWT_SECRET`
- `GROQ_API_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

3. Start backend

```bash
node server.js
```

4. Start frontend

```bash
npm run dev
```

## Portfolio Usage

Use this project in your portfolio as a:

- Full-stack product engineering project
- AI + FinTech integration project
- Resume SaaS MVP concept

Suggested one-line description:

"Built a full-stack AI Resume Builder with real-time editing, PDF export, JWT auth, MongoDB persistence, and Razorpay payment integration."
