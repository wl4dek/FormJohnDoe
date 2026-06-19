import { motion } from "framer-motion";

export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-blue-200/25 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, 15, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl"
      />
    </div>
  );
}
