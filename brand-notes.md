# Brand Notes (v0)

xrplkorea.org 의 Framer CSS 토큰에서 추출 + Jun 확정.

## 컬러

| 역할 | 값 | 비고 |
|---|---|---|
| 배경 (primary) | `#080808` | xrplkorea.org 본가 다크 |
| 배경 (elevated card) | `#131313` | 카드/패널 한 단 위 |
| 텍스트 (primary) | `#ffffff` | |
| 텍스트 (muted) | `#999999` | 플레이스홀더, secondary |
| 보더 (subtle) | `#ffffff1a` (10% white) | 카드 외곽선 |
| 보더 (focused) | `#4f1ad6` | 선택된 카드/포커스 |
| **Accent (signature)** | **`#4f1ad6`** | 딥 퍼플. CTA, 선택 상태, 강조 |
| Accent (subtle bg) | `#4f1ad626` (15% alpha) | 선택된 카드 채움 |
| Off-white | `#efeeec` | 본가 보조 톤 (사용 가능) |

`#0080ff` (블루) 은 본가의 보조 액센트이지만 v0 에선 사용 보류. 단일 액센트로 충분.

## 타이포

- **영문**: `DM Sans` (본가 동일, Google Fonts)
- **한글**: `Pretendard` (next/font 로 self-host)
- 본문 16px, label 14px, 섹션 헤더 18~20px
- 가중치: 400 (본문), 500 (label), 600 (헤더), 700 (CTA)

## 카드 스타일

- 모서리 `12px` (라운드 가볍게)
- 보더 1px `#ffffff1a` (선택 안 됨) → `#4f1ad6` (선택됨)
- 선택 시 배경 `#4f1ad626` + 좌측 또는 우상단에 체크 아이콘
- hover 시 보더 `#ffffff33` (살짝 밝게)
- 그림자: 다크 모드라 거의 사용 X. 필요 시 `0 0 0 1px #4f1ad6` 같은 ring 효과로

## Spacing / Radius 토큰 (Tailwind)

- radius: `lg = 12px`, `md = 8px` (칩, 작은 요소)
- 섹션 간 간격 `48px`
- 카드 패딩 `16px ~ 20px`

## 출처

xrplkorea.org 의 Framer 인라인 토큰에서 직접 추출 (2026-05-20).
- Framer 토큰 변수: `--token-f951c3a8-... : #4f1ad6` 등
- DM Sans 인라인 `font-family: 'DM Sans'` 확인
