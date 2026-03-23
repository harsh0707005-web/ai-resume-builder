import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Senior Product Designer at Meta",
    image: "https://images.unsplash.com/photo-1666113604293-d34734339acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZW9wbGUlMjBzbWlsaW5nJTIwaGVhZHNob3RzfGVufDF8fHx8MTc3NDI1NTg4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    text: "ResuAI completely transformed my job hunt. Within 48 hours of using my new AI-generated resume, I had 3 interview requests from top-tier companies."
  },
  {
    name: "David Chen",
    role: "Full Stack Engineer at Google",
    image: "https://images.unsplash.com/photo-1712168567852-ea607c2d3177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9mZXNzaW9uYWwlMjBwZW9wbGUlMjBmYWNlfGVufDF8fHx8MTc3NDI1NTg4MXww",
    text: "The ATS-optimization is what sold me. I used to get ghosted by automated systems, but now my resume sails through every single time."
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director at Netflix",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    text: "The interface is so clean and the AI suggestions are actually smart. It didn't just rephrase my words, it enhanced my entire professional narrative."
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Success stories from our users</h2>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
          </div>
          <p className="mt-4 text-slate-500 font-medium">Rated 4.9/5 by over 12,000+ professionals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/60 backdrop-blur-lg border border-white/80 p-8 rounded-3xl shadow-xl shadow-slate-200/50 relative"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-indigo-50 opacity-50" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-100">
                  <ImageWithFallback src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed italic">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
