# Options Library — v0 Decisions

work-order.md § 9 시드를 Jun 과 리뷰해 확정한 정본. 스캐폴드 직후 `lib/options.ts` 로 옮긴다.

**범례**: ★ = 시드 외 신규 추가, ✕ = 시드에서 제거

---

## 모드 A — 이미 프로덕트가 있다

### 1) Who

| 키 | 타입 | 옵션 |
|---|---|---|
| `who_team` | single | 스타트업 / 중견기업 / 대기업 / 금융기관 / **★ 거래소·VASP** / 공공·정부 / 학회·연구실 / 솔로 메이커 |
| `who_customer` | single | B2C 일반 소비자 / 중소사업자(SME) / 대기업 / 금융기관 / 공공·정부 / 개발자·빌더 / 크리에이터 / B2B2C 파트너 / **★ 거래소·VASP** / **★ 해외 송금 수요자(이주노동자·유학생 등)** |
| `who_user` | textarea | (자유 서술) |
| `who_stakeholder` | multi | 결제자 / 수취자 / 운영자 / 관리자 / 감독기관 / 정산 파트너 / 외부 BD 파트너 / **★ 지갑·커스터디** / **★ 발행자(issuer)** |

### 2) What

| 키 | 타입 | 옵션 |
|---|---|---|
| `what_problem` | textarea | (자유) |
| `what_core_feature` | multi | 결제 / 송금 / 정산 / 멤버십·포인트 / 자산 관리 / 인증·KYC / 마켓플레이스 / 콘텐츠 유통 / **★ 디지털자산 매매·교환** / **★ 쿠폰·티켓·바우처** / **★ 예약·예치(보증금)** / **✕ ~~데이터 분석~~** |
| `what_addon` | multi | 결제 / 정산 / 송금 / 토큰화 자산 발행(RWA) / 멤버십·포인트 / DID·인증 / 스테이블코인 / NFT / 에스크로 / **★ 디지털자산 교환(DEX)** / **★ 유동성 풀 (AMM)** / **★ 다중서명 (Multi-sig)** / **★ 온체인 영수증·증명** |
| `what_user_value` | textarea | (자유) |

### 3) When

| 키 | 타입 | 옵션 |
|---|---|---|
| `when_context` | multi | 일상 결제 / B2B 정산 사이클 / 월·분기 정산 / 이벤트 기반 / 크로스보더 송금 시점 / 자산 매수·매도 / 멤버십 가입·갱신 / **★ 정기 구독 갱신** / **★ 조건 충족 시 자동 실행** |
| `when_tx` | multi | 결제 완료 / 정산 마감 / 송금 요청 / 자산 발행·소각 / 인증 발급 / 멤버십 등급 변경 / **★ 에스크로 해제** / **★ DEX 매칭 체결** / **★ RWA 발행·환매** |
| `when_repeat` | single | 매일 / 주간 / 월간 / 분기 / 이벤트 발생 시 / 1회성 |

### 4) Where

| 키 | 타입 | 옵션 |
|---|---|---|
| `where_market` | multi | 핀테크 / 커머스 / 콘텐츠·미디어 / 게임 / 모빌리티 / 부동산 / 헬스케어 / 교육 / 공공·B2G / **★ 여행·관광** / **★ 물류·무역** |
| `where_geo` | single | 한국 only / 한국+동남아 / 한국+북미 / APAC / 글로벌 |
| `where_online_offline` | single | 온라인 / 오프라인 / 옴니채널(혼합) |
| `where_business_model` | single | B2B / B2C / B2B2C / B2G |

### 5) Why

| 키 | 타입 | 옵션 |
|---|---|---|
| `why_problem` | textarea | (자유) |
| `why_xrpl` | multi | 빠른 결제(3~5초) / 저렴한 수수료 / 크로스보더 결제 표준 / native DEX·토큰 발행 / 규제 친화 이미지 / 글로벌 파트너십 / 한국 커뮤니티 지원 / **★ 성숙한 네트워크(10년+ 운영)** |
| `why_web2_limit` | multi | 정산 지연 / 수수료 부담 / 신뢰 검증 비용 / 크로스보더 마찰 / 데이터 위·변조 가능성 / 중개자 lock-in / **★ 데이터 사일로(타기관 연동 마찰)** / **★ 감사 추적 어려움** |
| `why_xrpl_value` | textarea | (자유) |
| `why_business_impact` | textarea | (자유) |

### 6) How

| 키 | 타입 | 옵션 |
|---|---|---|
| `how_works` | textarea | (자유) |
| `how_flow` | multi | 결제 / 정산 / 자산 관리 / 포인트·멤버십 / 송금 / 인증 / 콘텐츠 유통 |
| `how_stack` | multi | Node.js / Python / Go / Rust / Java·Kotlin / Swift / React·Next.js / Flutter / 자체 백엔드 / AWS / GCP / Azure / 클라우드 함수 기반 / **★ Solidity 경험 있음** / **★ iOS·Android 네이티브** |
| `how_team_capacity` | textarea | (자유) |
| `how_partners` | textarea | (자유) |

### 7) 추가 정보 (모두 textarea, 시드 유지)

`extra_team`, `extra_mvp`, `extra_keep`, `extra_hypothesis`, `extra_uncertain`, `extra_concern`

---

## 모드 B — 아이디어만 있다 (미러링 규칙 적용)

**원칙**: 모드 A 와 의미가 같은 키는 모드 A 확정 옵션을 그대로 미러링. 모드 B 고유 키는 work-order.md § 9 시드 그대로 사용.

### 미러링 (모드 A 와 옵션 동일)

| 모드 B 키 | 미러링 대상 (모드 A) |
|---|---|
| `who_need` | `who_customer` |
| `who_stakeholder` | `who_stakeholder` |
| `what_features` | `what_addon` |
| `what_xrpl_fit` | `what_addon` 중 XRPL 관련 항목 subset (결제, 정산, 송금, RWA, DID·인증, 스테이블코인, NFT, 에스크로, DEX, Hooks/AMM, 온체인 영수증) |
| `when_tx` | `when_tx` |
| `when_repeat` | `when_repeat` |
| `where_market` | `where_market` |
| `where_geo` | `where_geo` |
| `why_legacy_limit` | `why_web2_limit` |
| `why_xrpl` | `why_xrpl` |
| `how_xrpl_point` | `what_xrpl_fit` 와 동일 subset |

### 모드 B 고유 키 (시드 유지)

| 키 | 타입 | 옵션 |
|---|---|---|
| `who_early` | textarea | (자유) |
| `who_buyer_vs_user` | single | 같다 / 다르다 (B2B2C) / 다르다 (B2G→시민) / 모름 |
| `what_make` | textarea | (자유) |
| `what_oneliner` | textarea | (자유) |
| `what_problem` | textarea | (자유) |
| `when_use` | textarea | (자유) |
| `where_context` | single | 온라인 B2C / 오프라인 B2C / B2B SaaS / B2B 정산·결제 / B2G / 옴니채널 |
| `where_initial_partner` | textarea | (자유) |
| `why_important` | textarea | (자유) |
| `why_user_need` | textarea | (자유) |
| `why_business` | textarea | (자유) |
| `how_flow` | textarea | (자유) — 모드 A 의 `how_flow` 와 달리 자유 서술 |
| `how_team` | single | 1인 / 2~3인 (개발자 포함) / 2~3인 (비개발) / 4~10인 / 외주 활용 예정 / 미정 |
| `how_strength` | textarea | (자유) |
| `how_first_mvp` | textarea | (자유) |
| `extra_*` | textarea | (자유) — 모드 A 와 키 일부 동일 |

---

## 공통 규칙

1. **모든 single/multi 질문에 "기타 (직접 입력)"** 자동 추가. 선택 시 인라인 텍스트 입력 노출.
2. 카드 그리드 레이아웃: 모바일 1열 → 태블릿 2열 → 데스크탑 2~3열 자동.
3. multi 칩이 9개를 넘어가는 질문 (`what_core_feature 11`, `what_addon 12`, `who_customer 10`, `where_market 11`, `how_stack 15`) 도 v0 에선 그냥 그리드로 펼침. 산만하면 v1 에서 검색 가능 dropdown 으로 전환 검토.
4. textarea 는 자유 서술이 본질인 질문에만 한정. v1 에서 정형화 가능한 패턴 발견되면 single/multi 로 승격.

---

## 변경 이력

- 2026-05-20: 모드 A 표 Jun 과 리뷰 → 신규 추가 18개, 제거 1개. 모드 B 는 미러링 규칙으로 자동 결정.
