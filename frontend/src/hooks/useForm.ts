import { useState } from "react";
import type { FormData, FormErrors } from "@/types/form";
import { validate } from "@/utils/validation";
import { create_user } from "@/service/http"

const INITIAL_FORM: FormData = {
  fullName: "",
  cpf: "",
  email: "",
  color: "",
  observation: "",
};

export function useForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    title: string;
    description: string;
  } | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      setErrors(validate(next));
      return next;
    });
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Record<string, boolean> = {
      fullName: true,
      cpf: true,
      email: true,
      color: true,
      observation: true,
    };
    setTouched(allTouched);

    const currentForm = form;
    const validation = validate(currentForm);
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    try {
      await create_user(currentForm);
      setToast({
        type: "success",
        title: "Cadastro realizado!",
        description: "Seus dados foram enviados com sucesso.",
      });
      setForm(INITIAL_FORM);
      setTouched({});
      setErrors({});
    } catch (error) {
      const body = error as { errors?: Array<{ field: string; message: string }>, success: boolean };
      if (body?.errors) {
        const serverErrors: FormErrors = {};
        for (const err of body.errors) {
          if (err.field === 'general' || err.field === 'server') {
            serverErrors.server = err.message;
          } else {
            (serverErrors as Record<string, string>)[err.field] = err.message;
          }
        }
        setErrors(serverErrors);
        setToast({
          type: "error",
          title: "Erro ao cadastrar",
          description: serverErrors.server ?? "Verifique os campos e tente novamente.",
        });
      } else {
        setErrors({ server: 'Erro inesperado. Tente novamente.' });
        setToast({
          type: "error",
          title: "Erro ao cadastrar",
          description: "Erro inesperado. Tente novamente.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }

  };

  return {
    form,
    errors,
    touched,
    isSubmitting,
    toast,
    setToast,
    updateField,
    handleSubmit,
  };
}
