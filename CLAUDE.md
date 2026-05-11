# Portfolio — CLAUDE.md

## 프로젝트 개요

Jung Eun의 개인 포트폴리오 웹사이트. 프레임워크 없이 Vanilla HTML/CSS/JS로 구성된 정적 사이트.

- **오너**: Jung Eun (ari@memecore.org)
- **언어**: 한국어 주, 영어 혼용
- **배포 타겟**: GitHub Pages 또는 Netlify (정적 호스팅)

---

## 기술 스택

| 역할 | 기술 |
|------|------|
| 마크업 | HTML5 (시맨틱 태그) |
| 스타일 | Vanilla CSS (CSS Variables 기반 다크 테마) |
| 인터랙션 | Vanilla JavaScript (ES6+, Intersection Observer) |
| 빌드 도구 | 없음 (No build step) |
| 패키지 매니저 | 없음 |

> **프레임워크 도입 금지**: 이 프로젝트는 의도적으로 빌드 도구 없이 유지됩니다. React/Vue/Next.js 등의 도입은 사전 논의 없이 진행하지 않습니다.

---

## 파일 구조

```
Portfolio/
├── CLAUDE.md           ← 이 파일 (에이전트 진입점)
├── index.html          ← 단일 페이지 (모든 섹션 포함)
├── styles.css          ← 전체 스타일 (661줄, CSS Variables 기반)
├── script.js           ← 인터랙션 (GNB, 모바일 메뉴, 스크롤 리빌)
└── docs/
    ├── design-system.md      ← 색상·타이포·컴포넌트 가이드
    ├── content-guide.md      ← 콘텐츠 입력 체크리스트
    ├── deployment.md         ← 배포 절차
    └── agents/
        ├── feature-agent.md  ← 기능 추가/수정 에이전트 지침
        ├── content-agent.md  ← 콘텐츠 수정 에이전트 지침
        └── review-agent.md   ← 코드 리뷰 에이전트 지침
```

---

## index.html 섹션 맵

| 섹션 | ID | 줄 범위 |
|------|----|---------|
| GNB (고정 헤더) | `#gnb` | 12–31 |
| Hero | `#hero` | 34–47 |
| About | `#about` | 50–74 |
| Projects | `#projects` | 77–152 |
| Skills | `#skills` | 155–206 |
| Contact | `#contact` | 209–234 |
| Footer | — | 237–239 |

---

## 디자인 시스템 요약

디자인 토큰은 모두 `styles.css:4–20` 의 `:root` CSS Variables로 정의됨.

```css
--color-accent:   #7c6fff  /* 메인 퍼플 */
--color-accent-2: #ff6b9d  /* 핑크 포인트 */
--color-bg:       #0f0f13  /* 최상위 배경 */
--color-surface:  #1e1e28  /* 카드 배경 */
--color-text:     #e8e8f0  /* 본문 텍스트 */
--color-muted:    #888899  /* 보조 텍스트 */
```

상세 가이드 → [docs/design-system.md](docs/design-system.md)

---

## 작업 지침

- **색상 변경 시** 반드시 CSS Variable 값만 수정 (하드코딩 금지)
- **새 섹션 추가 시** `section[id]` 패턴 유지 (script.js의 active nav 감지에 필요)
- **애니메이션 추가 시** `reveal` 클래스 + Intersection Observer 패턴 재사용 (`script.js:38–51`)
- **반응형 작업 시** 브레이크포인트는 `768px`(태블릿), `480px`(모바일) 두 단계만 사용
- **Contact Form**은 현재 데모 전용 (실제 전송 기능 없음)

---

## 에이전트별 전문 지침

| 작업 유형 | 참조 파일 |
|-----------|-----------|
| 기능 추가·수정 | [docs/agents/feature-agent.md](docs/agents/feature-agent.md) |
| 텍스트·콘텐츠 수정 | [docs/agents/content-agent.md](docs/agents/content-agent.md) |
| 코드 리뷰·품질 검사 | [docs/agents/review-agent.md](docs/agents/review-agent.md) |
