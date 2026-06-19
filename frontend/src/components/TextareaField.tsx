import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";

interface TextareaFieldProps {
  value: string;
  onChange: (val: string) => void;
}

export function TextareaField({ value, onChange }: TextareaFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="group"
    >
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
        <FileText className="h-3.5 w-3.5 text-primary-500" />
        Observações
      </label>
      <div
        className={`relative overflow-hidden rounded-xl border bg-rose-50/40 backdrop-blur-sm transition-all duration-200
          ${
            focused
              ? "border-primary-300 shadow-sm shadow-primary-100 ring-2 ring-primary-100"
              : "border-slate-200 shadow-sm shadow-slate-100/50"
          }
        `}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Alguma informação adicional? (opcional)"
          rows={4}
          className="w-full resize-y bg-transparent px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
        <div className="flex items-center justify-between border-t border-slate-100/60 px-4 py-2">
          <span className="text-xs text-slate-400">
            <Sparkles className="mr-1 inline h-3 w-3" />
            Campo opcional
          </span>
          <span
            className={`text-xs transition-colors ${
              value.length > 500
                ? "text-rose-500"
                : "text-slate-400"
            }`}
          >
            {value.length}/1000
          </span>
        </div>
      </div>
    </motion.div>
  );
}
