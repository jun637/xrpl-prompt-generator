"use client";

import { useState } from "react";

interface Props {
  options: string[];
  value: string;
  onChange: (next: string) => void;
  allowOther?: boolean;
}

const OTHER_LABEL = "기타";

export function SegmentedControl({ options, value, onChange, allowOther = true }: Props) {
  const isPredefined = value === "" || options.includes(value);
  const [otherActive, setOtherActive] = useState(!isPredefined && value !== "");
  const otherText = !isPredefined ? value : "";

  return (
    <div className="flex flex-col gap-2.5">
      <div className="inline-flex flex-wrap rounded-xl border border-white/25 bg-white/[0.04] p-1 gap-1">
        {options.map((opt) => {
          const selected = value === opt && !otherActive;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setOtherActive(false);
                onChange(opt);
              }}
              className={
                "px-4 py-2 rounded-lg text-[14px] font-medium transition-all " +
                (selected
                  ? "bg-accent text-white border border-accent shadow-[0_0_0_1px_rgba(107,50,232,0.4)]"
                  : "text-white hover:bg-white/[0.06] border border-transparent")
              }
              aria-pressed={selected}
            >
              {opt}
            </button>
          );
        })}
        {allowOther && (
          <button
            type="button"
            onClick={() => {
              setOtherActive(true);
              if (isPredefined) onChange("");
            }}
            className={
              "px-4 py-2 rounded-lg text-[14px] font-medium transition-all " +
              (otherActive
                ? "bg-accent text-white border border-accent"
                : "text-white hover:bg-white/[0.06] border border-transparent")
            }
            aria-pressed={otherActive}
          >
            {OTHER_LABEL}
          </button>
        )}
      </div>
      {otherActive && (
        <input
          type="text"
          value={otherText}
          onChange={(e) => onChange(e.target.value)}
          placeholder="직접 입력"
          className="px-4 py-2.5 rounded-xl border border-accent/55 bg-accent/[0.08] text-[14px] text-white placeholder:text-white/75 focus:outline-none focus:border-accent focus:bg-accent/[0.14] focus:ring-2 focus:ring-accent/50 transition-colors"
        />
      )}
    </div>
  );
}
