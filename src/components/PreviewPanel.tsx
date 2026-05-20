"use client";

import { useEffect, useMemo, useState } from "react";

interface Props {
  text: string;
  onCopy: () => void;
  onDownload: () => void;
  charCount: number;
}

export function PreviewPanel({ text, onCopy, onDownload, charCount }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const highlighted = useMemo(() => renderHighlighted(text), [text]);

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/25 bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/15 bg-white/[0.04]">
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-[0.15em] text-white font-semibold">
            Master Prompt
          </span>
          <span className="text-[12px] text-white/85 mt-0.5">
            {charCount.toLocaleString()} 글자
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDownload}
            className="px-3.5 py-2 rounded-lg border border-white/30 bg-white/[0.06] text-[12px] font-medium text-white hover:border-white/55 hover:bg-white/[0.10] transition-colors"
            title=".txt 로 저장"
          >
            ↓ 저장
          </button>
          <button
            type="button"
            onClick={() => {
              onCopy();
              setCopied(true);
            }}
            className={
              "px-4 py-2 rounded-lg text-[12px] font-semibold transition-all border " +
              (copied
                ? "bg-accent-bright text-white border-accent-bright"
                : "bg-accent hover:bg-accent-bright text-white border-accent")
            }
          >
            {copied ? "복사됨 ✓" : "전체 복사"}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 preview-text">{highlighted}</div>
    </div>
  );
}

function renderHighlighted(text: string) {
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    const match = line.match(/^(- [^:]+:)\s*$/);
    if (match) {
      return (
        <div key={idx} className="placeholder-line">
          {match[1]}
          <span className="placeholder-hint"> 여기에 답변</span>
        </div>
      );
    }
    return <div key={idx}>{line || " "}</div>;
  });
}
