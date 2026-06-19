import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  type: "success" | "error";
  title: string;
  description: string;
  onClose: () => void;
}

export function Toast({ type, title, description, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [onClose]);

  const isError = type === "error";

  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`fixed top-6 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border bg-white/95 px-5 py-4 shadow-xl backdrop-blur-sm ${isError
          ? "border-rose-200 shadow-rose-900/10"
          : "border-emerald-200 shadow-emerald-900/10"
        }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isError ? "bg-rose-100" : "bg-emerald-100"
          }`}
      >
        {isError ? (
          <AlertCircle className="h-5 w-5 text-rose-600" />
        ) : (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <button
        onClick={onClose}
        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
