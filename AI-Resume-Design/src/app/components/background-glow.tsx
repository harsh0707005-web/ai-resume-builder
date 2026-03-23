import { motion } from "motion/react";

export const BackgroundGlow = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{
          x: [0, -80, 120, 0],
          y: [0, 120, -80, 0],
          scale: [1, 1.1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/20 blur-[150px] rounded-full"
      />
      <motion.div
        animate={{
          x: [0, 150, -100, 0],
          y: [0, 100, 150, 0],
          scale: [1, 1.4, 0.8, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-blue-500/15 blur-[100px] rounded-full"
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
    </div>
  );
};
