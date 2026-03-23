import { motion } from "motion/react";
import { Zap, Shield, Rocket, Sparkles, Layout, Download, CheckCircle, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

export const FeatureSection = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      title: "AI Optimization",
      description: "Our advanced AI analyzes your experience and suggests the best way to frame your achievements."
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      title: "ATS-Friendly",
      description: "Every template is engineered to pass Applicant Tracking Systems with a 99% success rate."
    },
    {
      icon: <Layout className="w-6 h-6 text-blue-600" />,
      title: "Premium Designs",
      description: "Choose from dozens of professionally designed templates curated by hiring managers."
    },
    {
      icon: <Download className="w-6 h-6 text-teal-600" />,
      title: "Export Anywhere",
      description: "Download your resume in PDF, Word, or even JSON format for maximum flexibility."
    },
    {
      icon: <Rocket className="w-6 h-6 text-orange-600" />,
      title: "Instant Feedback",
      description: "Get a score and personalized recommendations on how to improve your resume instantly."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: "Real-time Preview",
      description: "See your resume update in real-time as you type or change sections."
    }
  ];

  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-4 ring-1 ring-indigo-200"
        >
          <Zap className="w-4 h-4" />
          Powerful AI Features
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight"
        >
          Build a resume that gets you <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-4">hired</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          We've helped over 10,000+ professionals land jobs at Google, Apple, and Amazon using our AI-driven builder.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="h-full bg-white/60 backdrop-blur-lg border-white/40 shadow-[0_10px_40px_-15px_rgba(99,102,241,0.1)] hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.2)] transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 ring-1 ring-slate-100">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 tracking-tight">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-[15px] leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const SocialProof = () => {
  return (
    <div className="py-12 border-y border-slate-100 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.15em] text-slate-400 mb-10">
          Trusted by professionals from leading companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale filter transition-all hover:grayscale-0 hover:opacity-100 duration-500">
          <div className="text-2xl font-bold text-slate-800">Microsoft</div>
          <div className="text-2xl font-bold text-slate-800">Google</div>
          <div className="text-2xl font-bold text-slate-800">Amazon</div>
          <div className="text-2xl font-bold text-slate-800">Netflix</div>
          <div className="text-2xl font-bold text-slate-800">Spotify</div>
        </div>
      </div>
    </div>
  );
};
