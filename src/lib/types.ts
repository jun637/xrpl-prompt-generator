export type Mode = "A" | "B";

export type SectionId = "who" | "what" | "when" | "where" | "why" | "how" | "extra";

export type QuestionType = "single" | "multi" | "segment" | "textarea";

export interface Question {
  key: string;
  mode: Mode | "both";
  section: SectionId;
  label: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  allowOther?: boolean;
}

export type AnswerValue = string | string[];

export type AnswersMap = Record<string, AnswerValue>;

export interface SectionMeta {
  id: SectionId;
  number: string;
  title: string;
  description?: string;
}

export const SECTIONS_A: SectionMeta[] = [
  { id: "who", number: "01", title: "Who", description: "팀과 사용자, 이해관계자" },
  { id: "what", number: "02", title: "What", description: "문제와 기능" },
  { id: "when", number: "03", title: "When", description: "사용 타이밍과 트랜잭션 시점" },
  { id: "where", number: "04", title: "Where", description: "시장과 비즈니스 모델" },
  { id: "why", number: "05", title: "Why", description: "이 문제와 XRPL 을 선택한 이유" },
  { id: "how", number: "06", title: "How", description: "현재 작동 방식과 기술 스택" },
  { id: "extra", number: "07", title: "추가 정보", description: "MVP 범위와 검증 가설" },
];

export const SECTIONS_B: SectionMeta[] = [
  { id: "who", number: "01", title: "Who", description: "타겟 사용자와 이해관계자" },
  { id: "what", number: "02", title: "What", description: "만들고 싶은 것" },
  { id: "when", number: "03", title: "When", description: "사용 타이밍과 트랜잭션 시점" },
  { id: "where", number: "04", title: "Where", description: "시장과 초기 파트너" },
  { id: "why", number: "05", title: "Why", description: "왜 이 아이디어인가" },
  { id: "how", number: "06", title: "How", description: "흐름과 팀 역량" },
  { id: "extra", number: "07", title: "추가 정보", description: "MVP 범위와 검증 가설" },
];
