import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  Download,
  Share2,
  Mail,
  Phone,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { generatePDF } from "../../utils/pdfExport";

interface ResumeData {
  name: string;
  title: string;
  skills: string[];
  experience: string[];
  education?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export const ResumePreview = ({
  data,
  isGenerating,
  isA4Mode = false,
  onUpdateData,
}: {
  data: ResumeData | null;
  isGenerating: boolean;
  isA4Mode?: boolean;
  onUpdateData?: (nextData: ResumeData) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const updateField = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    if (!data || !onUpdateData) return;
    onUpdateData({ ...data, [key]: value });
  };

  const handleDownloadPDF = () => {
    if (!data) {
      toast.error("Generate your resume first.");
      return;
    }

    const safeName = (data.name || "resume")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const fileName = `${safeName || "resume"}.pdf`;

    const success = generatePDF(data, fileName);
    if (success) {
      toast.success("PDF downloaded successfully.");
    } else {
      toast.error("Failed to download PDF.");
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-24 bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-2xl space-y-10 min-h-[700px]">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-32 h-32 rounded-full border-4 border-dashed border-indigo-200"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 w-32 h-32 rounded-full border-t-4 border-indigo-600"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-4">
          <motion.h3
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            AI is Crafting...
          </motion.h3>
          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-500 font-medium">
              Optimizing for ATS compatibility
            </p>
            <p className="text-slate-400 text-sm italic">
              "Did you know? AI-optimized resumes get 3x more
              responses."
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl space-y-4 min-h-[500px] border-dashed">
        <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner border border-slate-100">
          <Briefcase className="w-10 h-10 text-slate-300" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-slate-700">
            Preview your success
          </h3>
          <p className="text-slate-500 max-w-[320px] mx-auto text-sm leading-relaxed">
            Fill in the details above and see how your
            professional journey transforms into a premium
            resume.
          </p>
        </div>
      </div>
    );
  }

  const email = data.email || `hello@${data.name.toLowerCase().replace(/\s+/g, "")}.com`;
  const phone = data.phone || "+1 (555) 0123 4567";
  const location = data.location || "San Francisco, CA";
  const education = data.education || "Master of Computer Science - Stanford University (2016-2020)";
  const skillsText = data.skills.join(", ");
  const experienceText = data.experience.join("\n\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="group relative"
    >
      {/* Glow effect behind the resume */}
      {!isA4Mode && (
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />
      )}

      <div
        className={`relative bg-white border border-slate-100 overflow-hidden min-h-[800px] flex flex-col transition-all duration-500 ${
          isA4Mode
            ? "mx-auto rounded-lg w-full max-w-[794px] min-h-[1123px] shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]"
            : "rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(99,102,241,0.15)] hover:shadow-[0_60px_120px_-30px_rgba(99,102,241,0.2)]"
        }`}
      >
        {/* Header Section */}
        <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full -translate-x-24 translate-y-24" />

          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={data.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="h-12 text-slate-100 bg-white/10 border-white/25"
                  />
                  <Input
                    value={data.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="h-11 text-indigo-100 bg-white/10 border-white/25"
                  />
                </div>
              ) : (
                <>
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-5xl font-black tracking-tighter"
                  >
                    {data.name}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-medium text-indigo-400/90 tracking-tight"
                  >
                    {data.title}
                  </motion.p>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400 font-medium">
              {isEditing ? (
                <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    value={email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="h-10 text-slate-100 bg-white/10 border-white/25"
                  />
                  <Input
                    value={phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="h-10 text-slate-100 bg-white/10 border-white/25"
                  />
                  <Input
                    value={location}
                    onChange={(e) => updateField("location", e.target.value)}
                    className="h-10 text-slate-100 bg-white/10 border-white/25"
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-400" /> {email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-400" /> {phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-400" /> {location}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow p-12 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Main Body */}
          <div className="md:col-span-8 space-y-12">
            <section className="space-y-6">
              <h3 className="flex items-center gap-3 text-xl font-extrabold text-slate-900 uppercase tracking-widest border-b-2 border-indigo-50 pb-4">
                <Briefcase className="w-6 h-6 text-indigo-600" />
                Experience
              </h3>
              <div className="space-y-10 relative before:absolute before:left-0 before:top-4 before:bottom-0 before:w-0.5 before:bg-slate-100 ml-2 pl-8">
                {isEditing ? (
                  <Textarea
                    value={experienceText}
                    onChange={(e) =>
                      updateField(
                        "experience",
                        e.target.value
                          .split(/\n\n+/)
                          .map((item) => item.trim())
                          .filter(Boolean),
                      )
                    }
                    className="min-h-[200px]"
                  />
                ) : (
                  data.experience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="relative group/item"
                    >
                      <div className="absolute -left-[35px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-4 border-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)] z-10 group-hover/item:scale-125 transition duration-300" />
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xl font-bold text-slate-800 leading-tight">
                            Professional Achievement
                          </h4>
                          <span className="text-sm font-semibold text-slate-400 tabular-nums">
                            2020 — PRESENT
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-[17px]">
                          {exp}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="flex items-center gap-3 text-xl font-extrabold text-slate-900 uppercase tracking-widest border-b-2 border-indigo-50 pb-4">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                Education
              </h3>
              <div className="flex justify-between items-center p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition duration-300">
                {isEditing ? (
                  <Input
                    value={education}
                    onChange={(e) => updateField("education", e.target.value)}
                    className="h-11"
                  />
                ) : (
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-800">Education</h4>
                    <p className="text-slate-600">{education}</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-12">
            <section className="space-y-6">
              <h3 className="flex items-center gap-3 text-xl font-extrabold text-slate-900 uppercase tracking-widest border-b-2 border-indigo-50 pb-4">
                <Award className="w-6 h-6 text-indigo-600" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {isEditing ? (
                  <Input
                    value={skillsText}
                    onChange={(e) =>
                      updateField(
                        "skills",
                        e.target.value
                          .split(",")
                          .map((skill) => skill.trim())
                          .filter(Boolean),
                      )
                    }
                    placeholder="React, Node.js, TypeScript"
                    className="h-11"
                  />
                ) : (
                  data.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-600 hover:text-white transition duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))
                )}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="flex items-center gap-3 text-xl font-extrabold text-slate-900 uppercase tracking-widest border-b-2 border-indigo-50 pb-4">
                Expertise
              </h3>
              <div className="space-y-4">
                {[
                  "Leadership",
                  "Communication",
                  "Problem Solving",
                  "Adaptability",
                ].map((soft, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold text-slate-700">
                      <span>{soft}</span>
                      <span>95%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{
                          duration: 1,
                          delay: idx * 0.1,
                        }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer / Actions */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={`view-avatar-${i}`}
                  className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-500">
              Viewed by 12 hiring managers
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing((prev) => {
                  const next = !prev;
                  toast.success(next ? "Edit mode enabled" : "Changes saved");
                  return next;
                });
              }}
              className="rounded-2xl border-slate-200 text-slate-700 font-bold px-6"
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl border-slate-200 text-slate-700 font-bold px-6"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleDownloadPDF}
              className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 shadow-xl shadow-indigo-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};