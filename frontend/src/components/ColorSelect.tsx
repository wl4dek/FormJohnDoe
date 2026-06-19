import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";
import { colorOptions } from "../utils/constants";

interface ColorSelectProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  touched?: boolean;
}

export function ColorSelect({ value, onChange, error, touched }: ColorSelectProps) {
  const selectedColor = colorOptions.find((c) => c.value === value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="group flex-1"
    >
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
        <Palette className="h-3.5 w-3.5 text-primary-500" />
        Cor Preferida
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-slate-800 outline-none backdrop-blur-sm transition-all duration-200
            ${touched && error
              ? "border-rose-300 shadow-sm shadow-rose-100 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
              : touched && value
                ? "border-emerald-300 shadow-sm shadow-emerald-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                : "border-slate-200 shadow-sm shadow-slate-100/50 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            }
          `}
        >
          {colorOptions.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <AnimatePresence>
          {selectedColor?.hex && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="pointer-events-none absolute top-1/2 right-10 -translate-y-1/2"
            >
              <div
                className="h-4 w-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: selectedColor.hex }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {touched && error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 text-xs font-medium text-rose-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
