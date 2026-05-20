# XRPL Prompt Generator — Project Instructions

## 시작점

**먼저 [`work-order.md`](./work-order.md) 를 처음부터 끝까지 읽으세요.** 이 문서가 자기완결 프롬프트입니다.

특히 다음 섹션이 핵심입니다:
- **§ 2. 왜 마스터 프롬프트 → Generator 인가** ← 디자인 모든 결정의 기준점
- **§ 5.2 핵심 인터랙션** ← 선택형 UX 패턴
- **§ 9. 옵션 라이브러리 시드** ← 각 질문의 선택지 출발점

## 정체성

- **클라이언트**: XRPL Korea owned 산출물 (KFIP / Midnight / PoC 라인과 별도)
- **owner**: Jun (Catalyze Researcher)
- **배포 타깃**: Vercel → `prompt-generator.xrplkorea.org`
- **이 폴더 = 코드 작업 본체**

## 작업 원칙

- **Jun 이 owner**. 디자인·카피·모드 구성·옵션 라이브러리 등 결정은 Jun 의 손에. 단정짓지 말고 옵션 제시 후 결정 받기.
- **em dash (—) 사용 금지**. 마침표·쉼표·괄호로 분리.
- **한국어 응답** 기본. 비개발자도 이해 가능한 카피.
- **짧고 직접적인 톤**. 자기 작업 자랑·요약·오지랖 X. 탐색과 결정을 분리.
- **선택형 UX 가 본질**. 모든 질문은 선택형이 디폴트, 자유 입력은 fallback. textarea 는 자유 서술이 필수인 소수 항목에만 한정.

## 참고 자료

- `work-order.md` — 마스터 프롬프트 본문 + UI/UX 요구사항 전체 + 옵션 라이브러리 시드
- `references/pg1.png ~ pg4.png` — ai-narrative.io 스타일 폼-기반 프롬프트 생성기 캡쳐 (레이아웃·인터랙션 패턴 레퍼런스)

## Jarvis 와의 관계

- 이 폴더의 부트스트랩(이 CLAUDE.md, work-order.md, references/, POINTER.md) 은 **Jarvis(D:\Jun 세션)** 가 작성했습니다.
- Jarvis 는 이 프로젝트의 진행을 일일이 추적하지 않습니다. 본 세션이 코드 작업과 Jun 과의 합의를 단독으로 수행합니다.
- 큰 마일스톤(예: v0 배포 완료) 시점에는 Jun 이 Jarvis 측 POINTER.md 를 직접 업데이트하거나, 본 세션이 한 줄 알림을 만들어 Jun 에게 전달해 동기화하면 됩니다.
