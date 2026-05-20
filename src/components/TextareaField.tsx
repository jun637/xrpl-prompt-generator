"use client";

interface Props {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextareaField({ value, onChange, placeholder, rows = 3 }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 rounded-xl border border-accent/55 bg-accent/[0.08] text-[14px] text-white placeholder:text-white/75 focus:outline-none focus:border-accent focus:bg-accent/[0.14] focus:ring-2 focus:ring-accent/50 resize-y leading-relaxed transition-colors"
    />
  );
}
