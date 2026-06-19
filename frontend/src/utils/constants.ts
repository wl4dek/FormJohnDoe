export interface ColorOption {
  value: string;
  label: string;
  hex: string;
}

export const colorOptions: ColorOption[] = [
  { value: "", label: "Selecione uma cor", hex: "" },
  { value: "blue", label: "Azul", hex: "#3b82f6" },
  { value: "green", label: "Verde", hex: "#10b981" },
  { value: "red", label: "Vermelho", hex: "#ef4444" },
  { value: "purple", label: "Roxo", hex: "#8b5cf6" },
  { value: "orange", label: "Laranja", hex: "#f97316" },
  { value: "pink", label: "Rosa", hex: "#ec4899" },
  { value: "gray", label: "Cinza", hex: "#6b7280" },
  { value: "black", label: "Preto", hex: "#1f2937" },
];


export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';