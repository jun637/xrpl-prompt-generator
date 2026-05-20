"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { ChipMultiSelect } from "@/components/ChipMultiSelect";
import { PreviewPanel } from "@/components/PreviewPanel";
import { RadioCardGroup } from "@/components/RadioCardGroup";
import { SegmentedControl } from "@/components/SegmentedControl";
import { TextareaField } from "@/components/TextareaField";
import { getQuestions } from "@/lib/options";
import { renderPrompt } from "@/lib/prompt-template";
import {
  SECTIONS_A,
  SECTIONS_B,
  type AnswerValue,
  type AnswersMap,
  type Mode,
  type SectionId,
} from "@/lib/types";
import { usePersistedState } from "@/lib/use-persisted-state";

interface AppState {
  mode: Mode;
  answersA: AnswersMap;
  answersB: AnswersMap;
}

const INITIAL_STATE: AppState = {
  mode: "A",
  answersA: {},
  answersB: {},
};

const STORAGE_KEY = "xrpl-prompt-generator:v0";

export default function Home() {
  const [state, setState] = usePersistedState<AppState>(STORAGE_KEY, INITIAL_STATE);
  const [previewOpen, setPreviewOpen] = useState(false);

  const mode = state.mode;
  const answers = mode === "A" ? state.answersA : state.answersB;
  const questions = useMemo(() => getQuestions(mode), [mode]);
  const sections = mode === "A" ? SECTIONS_A : SECTIONS_B;

  const setMode = useCallback(
    (next: Mode) => setState((s) => ({ ...s, mode: next })),
    [setState],
  );

  const setAnswer = useCallback(
    (key: string, value: AnswerValue) => {
      setState((s) => {
        const targetKey = s.mode === "A" ? "answersA" : "answersB";
        return { ...s, [targetKey]: { ...s[targetKey], [key]: value } };
      });
    },
    [setState],
  );

  const resetCurrentMode = useCallback(() => {
    if (!confirm(`${mode === "A" ? "프로덕트가 있다" : "아이디어만 있다"} 모드의 답변을 모두 비울까요?`)) {
      return;
    }
    setState((s) => {
      const targetKey = s.mode === "A" ? "answersA" : "answersB";
      return { ...s, [targetKey]: {} };
    });
  }, [mode, setState]);

  const renderedPrompt = useMemo(() => renderPrompt(mode, answers), [mode, answers]);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(renderedPrompt);
  }, [renderedPrompt]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([renderedPrompt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const fname = `xrpl-prompt-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}.txt`;
    a.href = url;
    a.download = fname;
    a.click();
    URL.revokeObjectURL(url);
  }, [renderedPrompt]);

  const groupedQuestions = useMemo(() => {
    const map = new Map<SectionId, typeof questions>();
    for (const s of sections) map.set(s.id, []);
    for (const q of questions) {
      const arr = map.get(q.section);
      if (arr) arr.push(q);
    }
    return map;
  }, [questions, sections]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/15 px-6 lg:px-10 py-4 lg:py-5 bg-black/40 backdrop-blur">
        <div className="max-w-[1440px] mx-auto flex items-center">
          <a
            href="https://xrplkorea.org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="XRPL Korea 홈으로 이동"
            className="inline-block"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.png`}
              alt="XRPL Korea"
              width={3654}
              height={405}
              priority
              className="h-7 lg:h-8 w-auto"
            />
          </a>
        </div>
      </header>

      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-10 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(440px,42%)] gap-8 lg:gap-10">
          <div className="flex flex-col gap-10">
            <section className="rounded-2xl border border-white/25 bg-surface p-6 lg:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                    XRPL Prompt Generator
                  </h1>
                  <p className="text-[15px] lg:text-[16px] text-white/90 leading-relaxed">
                    XRPL 기반 제품 구조를 빠르게 구체화하기 위한 Claude / Claude Code 용 마스터 프롬프트를 생성합니다.
                  </p>
                </div>

                <ul className="flex flex-col gap-4 border-t border-white/15 pt-5 text-[15px] lg:text-[16px] text-white leading-relaxed">
                  <li>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-accent text-white text-[13px] font-semibold mr-2.5 align-middle">
                      의사결정권자
                    </span>
                    <span className="align-middle">
                      아이디어나 파트너십 제안이 실제 비즈니스 가치로 이어지는지 빠르게 가늠합니다.
                    </span>
                  </li>
                  <li>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-accent text-white text-[13px] font-semibold mr-2.5 align-middle">
                      기획자
                    </span>
                    <span className="align-middle">
                      막연한 아이디어를 사용자 흐름, 핵심 기능, 온체인 트랜잭션 구조, MVP 범위로 정리합니다.
                    </span>
                  </li>
                  <li>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-accent text-white text-[13px] font-semibold mr-2.5 align-middle">
                      개발자
                    </span>
                    <span className="align-middle">
                      XRPL 적용 지점, 온·오프체인 역할 분리, 시스템 아키텍처, 구현 우선순위를 빠르게 파악합니다.
                    </span>
                  </li>
                </ul>

                <div className="rounded-xl border border-white/40 px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 mb-2">
                    ⚑ 시작하기 전에 꼭 읽어주세요
                  </p>
                  <p className="text-[15px] lg:text-[16px] text-white leading-relaxed">
                    핵심은 &ldquo;XRPL 을 어디에 붙일까?&rdquo; 가 아니라,{" "}
                    <span className="font-bold">
                      사용자가 어떤 행동을 반복하고,
                      <br />
                      그 행동이 왜 온체인 트랜잭션으로 기록될 가치가 있는가?
                    </span>{" "}
                    를 찾는 것입니다.
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/15 pt-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                    모드 선택
                  </span>
                  <ModeToggle mode={mode} onChange={setMode} />
                </div>
              </div>
            </section>

            {sections.map((section) => {
              const items = groupedQuestions.get(section.id) ?? [];
              if (items.length === 0) return null;
              return (
                <section key={section.id} className="flex flex-col gap-6">
                  <div className="flex items-baseline gap-3 border-b border-white/15 pb-3">
                    <span className="text-[15px] font-bold font-mono text-accent-bright">
                      {section.number}
                    </span>
                    <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-white">
                      {section.title}
                    </h2>
                    {section.description && (
                      <span className="text-[13px] text-white/85 hidden sm:inline">
                        · {section.description}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-7">
                    {items.map((q) => (
                      <div key={q.key} className="flex flex-col gap-3">
                        <label className="text-[15px] font-semibold text-white leading-snug">
                          {q.label}
                        </label>
                        {q.type === "single" && (
                          <RadioCardGroup
                            name={q.key}
                            options={q.options ?? []}
                            value={(answers[q.key] as string) ?? ""}
                            onChange={(v) => setAnswer(q.key, v)}
                          />
                        )}
                        {q.type === "multi" && (
                          <ChipMultiSelect
                            name={q.key}
                            options={q.options ?? []}
                            value={(answers[q.key] as string[]) ?? []}
                            onChange={(v) => setAnswer(q.key, v)}
                          />
                        )}
                        {q.type === "segment" && (
                          <SegmentedControl
                            options={q.options ?? []}
                            value={(answers[q.key] as string) ?? ""}
                            onChange={(v) => setAnswer(q.key, v)}
                          />
                        )}
                        {q.type === "textarea" && (
                          <TextareaField
                            value={(answers[q.key] as string) ?? ""}
                            onChange={(v) => setAnswer(q.key, v)}
                            placeholder={q.placeholder}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={resetCurrentMode}
                className="text-[13px] text-white hover:text-accent-bright transition-colors underline underline-offset-4 decoration-white/40 hover:decoration-accent-bright"
              >
                현재 모드 답변 초기화
              </button>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-8 h-[calc(100vh-4rem)]">
              <PreviewPanel
                text={renderedPrompt}
                onCopy={handleCopy}
                onDownload={handleDownload}
                charCount={renderedPrompt.length}
              />
            </div>
          </aside>
        </div>
      </div>

      <footer className="border-t border-white/15 px-6 lg:px-10 py-8 mt-12">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-3 text-[13px] text-white">
          <p className="leading-relaxed">
            이 도구는 XRPL 기반 제품 구조를 빠르게 구체화하기 위한 Claude / Claude Code 용 마스터 프롬프트를 생성합니다.
            XRPLF 공식 레포를 참조하도록 구성되어 있어 Claude 계열에서 가장 잘 작동합니다.
          </p>
          <div className="flex flex-wrap items-center gap-3 font-medium">
            <a
              href="https://www.notion.so/Web3-2be898c680bf80de8ee5e7fde08315d9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-bright transition-colors"
            >
              블록체인 기반 서비스 기획 가이드 ↗
            </a>
            <span className="text-white/40">·</span>
            <a
              href="https://www.notion.so/XRPL-2bc898c680bf8068abb3fa5f93e5c697"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-bright transition-colors"
            >
              XRPL 기반 서비스 설계 가이드 ↗
            </a>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => setPreviewOpen(true)}
        className="lg:hidden fixed bottom-5 right-5 z-30 px-5 py-3.5 rounded-full border border-accent bg-accent text-[14px] font-semibold text-white shadow-xl shadow-accent/40 hover:bg-accent-bright"
      >
        프롬프트 보기
      </button>

      {previewOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 flex flex-col bg-black/85 backdrop-blur"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewOpen(false);
          }}
        >
          <div className="flex-1 mt-12 mx-4 mb-4 flex flex-col">
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="self-end mb-3 px-4 py-2 rounded-full bg-white/15 text-white text-[12px] font-medium border border-white/30"
            >
              닫기 ✕
            </button>
            <div className="flex-1 min-h-0">
              <PreviewPanel
                text={renderedPrompt}
                onCopy={handleCopy}
                onDownload={handleDownload}
                charCount={renderedPrompt.length}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="inline-flex rounded-xl border border-white/25 bg-white/[0.04] p-1 self-start w-full sm:w-auto">
      <button
        type="button"
        onClick={() => onChange("A")}
        className={
          "flex-1 sm:flex-initial px-5 sm:px-7 py-2.5 rounded-lg text-[14px] font-semibold transition-all " +
          (mode === "A"
            ? "bg-accent text-white border border-accent shadow-[0_0_0_1px_rgba(107,50,232,0.4)]"
            : "text-white hover:bg-white/[0.06] border border-transparent")
        }
        aria-pressed={mode === "A"}
      >
        이미 프로덕트가 있다
      </button>
      <button
        type="button"
        onClick={() => onChange("B")}
        className={
          "flex-1 sm:flex-initial px-5 sm:px-7 py-2.5 rounded-lg text-[14px] font-semibold transition-all " +
          (mode === "B"
            ? "bg-accent text-white border border-accent shadow-[0_0_0_1px_rgba(107,50,232,0.4)]"
            : "text-white hover:bg-white/[0.06] border border-transparent")
        }
        aria-pressed={mode === "B"}
      >
        아이디어만 있다
      </button>
    </div>
  );
}
