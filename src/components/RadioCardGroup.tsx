"use client";

import { useState } from "react";

interface Props {
  name: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
}

const OTHER_LABEL = "기타 (직접 입력)";

export function RadioCardGroup({ name, options, value, onChange }: Props) {
  const isPredefined = value === "" || options.includes(value);
  const [otherActive, setOtherActive] = useState(!isPredefined && value !== "");
  const otherText = !isPredefined ? value : "";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
              "text-left px-4 py-3 rounded-xl border transition-all text-[14px] font-medium " +
              (selected
                ? "border-accent bg-accent/25 text-white ring-1 ring-accent/50"
                : "border-white/25 bg-white/[0.04] text-white hover:border-white/45 hover:bg-white/[0.08]")
            }
            aria-pressed={selected}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="leading-snug">{opt}</span>
              {selected && (
                <span className="text-white text-base leading-none flex-shrink-0">●</span>
              )}
            </div>
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => {
          setOtherActive(true);
          if (isPredefined) onChange("");
        }}
        className={
          "text-left px-4 py-3 rounded-xl border-2 border-dashed transition-all text-[14px] font-medium " +
          (otherActive
            ? "border-accent bg-accent/25 text-white"
            : "border-white/30 bg-transparent text-white hover:border-white/55 hover:bg-white/[0.04]")
        }
        aria-pressed={otherActive}
      >
        <div className="flex items-center justify-between gap-2">
          <span>{OTHER_LABEL}</span>
          {otherActive && (
            <span className="text-white text-base leading-none flex-shrink-0">●</span>
          )}
        </div>
      </button>
      {otherActive && (
        <input
          type="text"
          name={`${name}_other`}
          value={otherText}
          onChange={(e) => onChange(e.target.value)}
          placeholder="직접 입력"
          className="col-span-1 sm:col-span-2 mt-1 px-4 py-3 rounded-xl border border-accent/55 bg-accent/[0.08] text-[15px] text-white placeholder:text-white/75 focus:outline-none focus:border-accent focus:bg-accent/[0.14] focus:ring-2 focus:ring-accent/50 transition-colors"
        />
      )}
    </div>
  );
}
