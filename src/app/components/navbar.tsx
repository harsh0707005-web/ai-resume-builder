import { motion } from "motion/react";
import { Sparkles, Menu, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  onLoginClick: () => void;
  onGetStartedClick: () => void;
}

export const Navbar = ({ onLoginClick, onGetStartedClick }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-6">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_-10px_rgba(99,102,241,0.15)] ring-1 ring-black/5"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Resu<span className="text-indigo-600">AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="transition-colors hover:text-indigo-600">Features</a>
          <a href="#templates" className="transition-colors hover:text-indigo-600">Templates</a>
          <a href="#payment-method" className="transition-colors hover:text-indigo-600">Pricing</a>
          <a href="#blog" className="transition-colors hover:text-indigo-600">Blog</a>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLoginClick}
            className="hidden sm:inline-flex rounded-xl font-medium"
          >
            Log in
          </Button>
          <Button
            size="sm"
            onClick={onGetStartedClick}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 flex items-center gap-2 font-semibold"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>
    </nav>
  );
};
