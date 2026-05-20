# XRPL Prompt Generator

XRPL 기반 제품 구조를 빠르게 구체화하기 위한 **Claude / Claude Code 용 마스터 프롬프트** 생성기.

좌측 폼에서 선택 / 입력하면 우측 프리뷰가 실시간으로 마스터 프롬프트를 완성합니다. 그대로 복사해서 Claude 에 붙여넣으면 됩니다.

- 배포: [prompt-generator.xrplkorea.org](https://prompt-generator.xrplkorea.org)
- Owner: XRPL Korea
- 클라이언트 라인: KFIP / Midnight / PoC 와 별도

## 두 가지 모드

- **이미 프로덕트가 있다** — 운영 / 준비 중인 제품에 XRPL 을 어떻게 연결할지 진단
- **아이디어만 있다** — 아직 프로덕트가 없는 아이디어를 실제 제품 구조로 발전시키기

## 설계 원칙

빈 칸을 직접 채우는 마찰을 줄이는 것이 본질입니다. **모든 질문은 선택형이 디폴트**이고, "기타 (직접 입력)" 은 fallback 입니다. textarea 는 자유 서술이 본질인 소수 항목에만 사용합니다.

## 개발

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
npm run lint
```

스택: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Pretendard / DM Sans

## 폴더

```
src/
  app/              page.tsx, layout.tsx, globals.css, icon.png
  components/       RadioCardGroup, ChipMultiSelect, SegmentedControl, TextareaField, PreviewPanel
  lib/              options.ts, prompt-template.ts, types.ts, use-persisted-state.ts
public/             logo.png + Next 기본 svg
```

## 정본 문서

- [`work-order.md`](./work-order.md) — 마스터 프롬프트 본문 + UI/UX 요구사항 + 옵션 라이브러리 시드
- [`brand-notes.md`](./brand-notes.md) — 컬러 / 폰트 / 카드 토큰
- [`options-decisions.md`](./options-decisions.md) — v0 옵션 라이브러리 확정 (work-order § 9 시드 → 리뷰 후 확정)

## 라이선스

XRPL Korea owned.
