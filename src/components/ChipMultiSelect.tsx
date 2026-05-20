"use client";

import { useMemo, useState } from "react";

interface Props {
  name: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
}

export function ChipMultiSelect({ name, options, value, onChange }: Props) {
  const predefinedSet = useMemo(() => new Set(options), [options]);
  const otherValues = useMemo(() => value.filter((v) => !predefinedSet.has(v)), [value, predefinedSet]);
  const [otherActive, setOtherActive] = useState(otherValues.length > 0);
  const [draft, setDraft] = useState("");

  function toggle(opt: string) {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  }

  function addOther() {
    const text = draft.trim();
    if (!text) return;
    if (value.includes(text)) {
      setDraft("");
      return;
    }
    onChange([...value, text]);
    setDraft("");
  }

  function removeOther(text: string) {
    onChange(value.filter((v) => v !== text));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={
                "px-3.5 py-2 rounded-full border text-[13px] font-medium transition-all " +
                (selected
                  ? "border-accent bg-accent/30 text-white ring-1 ring-accent/40"
                  : "border-white/30 bg-white/[0.04] text-white hover:border-white/55 hover:bg-white/[0.08]")
              }
              aria-pressed={selected}
            >
              {opt}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setOtherActive((v) => !v)}
          className={
            "px-3.5 py-2 rounded-full border-2 border-dashed text-[13px] font-medium transition-all " +
            (otherActive || otherValues.length > 0
              ? "border-accent bg-accent/20 text-white"
              : "border-white/35 text-white hover:border-white/55 hover:bg-white/[0.04]")
          }
          aria-pressed={otherActive || otherValues.length > 0}
        >
          {otherActive ? "기타 입력 닫기" : "+ 기타 직접 추가"}
        </button>
      </div>

      {otherValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {otherValues.map((text) => (
            <span
              key={text}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-accent/60 bg-accent/25 text-[13px] font-medium text-white"
            >
              {text}
              <button
                type="button"
                onClick={() => removeOther(text)}
                className="text-white/85 hover:text-white text-xs leading-none"
                aria-label={`${text} 삭제`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {otherActive && (
        <div className="flex gap-2">
          <input
            type="text"
            name={`${name}_other`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addOther();
              }
            }}
            placeholder="직접 추가하고 Enter 또는 추가 버튼"
            className="flex-1 px-4 py-2.5 rounded-xl border border-accent/55 bg-accent/[0.08] text-[14px] text-white placeholder:text-white/75 focus:outline-none focus:border-accent focus:bg-accent/[0.14] focus:ring-2 focus:ring-accent/50 transition-colors"
          />
          <button
            type="button"
            onClick={addOther}
            className="px-5 py-2.5 rounded-xl border border-accent bg-accent text-[14px] font-medium text-white hover:bg-accent-bright"
          >
            추가
          </button>
        </div>
      )}
    </div>
  );
}
