import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface InputFieldProps {
  label: string;
  icon: React.ElementType;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  className?: string;
  touched?: boolean;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  children?: React.ReactNode;
  hint?: string;
}

export function InputField({
  label,
  icon: Icon,
  value,
  onChange,
  error,
  className,
  touched,
  placeholder,
  type = "text",
  maxLength,
  children,
  hint,
}: InputFieldProps) {
  const hasError = touched && !!error;
  const isValid = touched && !error && value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex-1"
    >
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
        <Icon className="h-3.5 w-3.5 text-primary-500" />
        {label}
      </label>
      <div className="relative">
        {children || (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`${className && className.length > 0 ? className : "w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none backdrop-blur-sm transition-all duration-200 placeholder:text-slate-400"}
              ${hasError
                ? "border-rose-300 shadow-sm shadow-rose-100 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                : isValid
                  ? "border-emerald-300 shadow-sm shadow-emerald-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  : "border-slate-200 shadow-sm shadow-slate-100/50 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              }
            `}
          />
        )}
        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
              <AlertCircle className="h-4 w-4 text-rose-500" />
            </motion.div>
          )}
          {isValid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 text-xs font-medium text-rose-500"
          >
            {error}
          </motion.p>
        )}
        {hint && !hasError && (
          <p className="mt-1 text-xs text-slate-400">{hint}</p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
