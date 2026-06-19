import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Fingerprint,
  Mail,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { useForm } from "./hooks/useForm";
import { BackgroundBlobs } from "./components/BackgroundBlobs";
import { Toast } from "./components/Toast";
import { InputField } from "./components/InputField";
import { ColorSelect } from "./components/ColorSelect";
import { TextareaField } from "./components/TextareaField";
import { formatCPF } from "./utils/validation";

export default function App() {
  const {
    form,
    errors,
    touched,
    isSubmitting,
    toast,
    updateField,
    handleSubmit,
    setToast,
  } = useForm();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 py-4 sm:px-6">
      <BackgroundBlobs />

      <AnimatePresence>
        {toast && (
          <Toast
            type={toast.type}
            title={toast.title}
            description={toast.description}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-2xl shadow-slate-900/5 backdrop-blur-xl">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-blue-600 px-8 py-8 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
              <div className="absolute right-0 bottom-0 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm"
            >
              <ShieldCheck className="h-7 w-7 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative text-xl font-bold tracking-tight text-white sm:text-2xl"
            >
              Formulário de Cadastro
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative mt-1 text-sm text-white/80"
            >
              Preencha seus dados para completar o cadastro
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 px-6 py-7 sm:px-8">
            <InputField
              label="Nome Completo"
              icon={User}
              value={form.fullName}
              onChange={(v) => updateField("fullName", v)}
              error={errors.fullName}
              touched={touched.fullName}
              placeholder="Digite seu nome completo"
            />

            <InputField
              label="E-mail"
              icon={Mail}
              value={form.email}
              onChange={(v) => updateField("email", v)}
              error={errors.email}
              touched={touched.email}
              placeholder="seu@email.com"
              type="email"
            />

            <div className="flex gap-5">
              <InputField
                label="CPF"
                icon={Fingerprint}
                value={form.cpf}
                onChange={(v) => updateField("cpf", formatCPF(v))}
                error={errors.cpf}
                touched={touched.cpf}
                placeholder="000.000.000-00"
                maxLength={14}
                hint="Digite apenas números"
              />

              <ColorSelect
                value={form.color}
                onChange={(v) => updateField("color", v)}
                error={errors.color}
                touched={touched.color}
              />
            </div>

            <TextareaField
              value={form.observation}
              onChange={(v) => updateField("observation", v)}
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                    />
                    <span className="relative">Enviando...</span>
                  </>
                ) : (
                  <>
                    <span className="relative">Enviar Cadastro</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs text-slate-400"
            >
              Seus dados estão protegidos e não serão compartilhados.
            </motion.p>
          </form>
        </div>

      </motion.div>
    </div>
  );
}
