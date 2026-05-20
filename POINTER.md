# XRPL Prompt Generator

- **클라이언트**: XRPL Korea (별도 라인 — KFIP/Midnight/PoC 와 분리)
- **owner**: Jun
- **목적**: KFIP 참가자에게 공유했던 XRPL 마스터 프롬프트를 폼-기반 웹앱으로 고도화. 입력 마찰을 줄이기 위해 **좌측 폼은 선택형(라디오/체크박스/세그먼트)이 디폴트**, 직접 입력은 fallback.
- **배포**: Vercel → `prompt-generator.xrplkorea.org` (xrplkorea.org 서브도메인, CNAME → cname.vercel-dns.com)
- **스택**: Next.js 15 (App Router) + TypeScript + Tailwind v4
- **작업 주체**: 본 폴더에서 별도 Claude Code 세션이 단독 진행. 진입점은 `CLAUDE.md` → `work-order.md`.
- **Jarvis 역할**: 부트스트랩 완료(2026-05-20). 이후 진행은 별도 세션. Jun 이 마일스톤 알릴 때만 메모리 업데이트.

## 자비스 사용법

**맥락만 알아두기.** D:\Jun 에서 이 프로젝트에 대해 질문 받으면:
- "별도 세션에서 진행 중이고 owner 는 Jun"
- "선택형 우선 UX 가 핵심 설계 원칙"
- "배포 도메인은 `prompt-generator.xrplkorea.org`"

진행 상태 트래킹은 **본 폴더의 `work-order.md` 변경 이력**이 단일 정본. 추가 보강 요청이 들어오면 work-order.md 를 직접 수정하거나 별도 세션에 위임.

## 상태

- 2026-05-20 (목): 부트스트랩 완료
  - `work-order.md` (마스터 프롬프트 본문 + UI/UX + 옵션 라이브러리 시드)
  - `CLAUDE.md` (새 세션 부팅용)
  - `references/pg1.png ~ pg4.png` (ai-narrative.io 캡쳐 4장)
  - 다음 단계: Jun 이 본 폴더에서 새 Claude Code 세션 시작
