# Portfolio — CLAUDE.md

> **에이전트는 먼저 [`README.md`](README.md)와 [`rules/portfolio-rules.md`](rules/portfolio-rules.md)를 읽을 것.**

## 한 줄 요약

Lydia Oh — 2026 Fall US UX 인턴용 포트폴리오. **현재 Vanilla HTML/CSS/JS 멀티 페이지**. Next.js는 로드맵.

## 오너 & 목표

- **오너:** Lydia Oh (Jung Eun) · ari@memecore.org
- **타겟:** Google, Meta UX intern
- **UI 언어:** English only

## 기술 스택 (현재)

| 역할 | 기술 |
|------|------|
| 마크업 | HTML5 |
| 스타일 | Vanilla CSS + CSS Variables (`styles.css`) |
| JS | `script.js` (GNB, reveal, 모바일 메뉴) |
| 폰트 | Manrope |

## 파일 구조

```
Portfolio/
├── README.md              ← 프로젝트 규칙 (최우선 요약)
├── CLAUDE.md              ← 이 파일
├── rules/portfolio-rules.md
├── index.html             ← Home
├── styles.css · script.js
├── work/ · about/ · lab/ · article/ · resume/
└── docs/
```

## GNB

- Lydia (home) · Work · Lab · Article · About · **`Contact me!`** → LinkedIn (맨 오른쪽)
- 플로팅 pill bar · `styles.css` GNB 섹션

## Home (`index.html`) 섹션

| 순서 | 내용 |
|------|------|
| Hero | Locked headline (README §5) |
| Selected Work | **4** cards |
| Proof | `.story-strip` |
| Footer | 공통 |

**없음:** Referrals, Contact CTA, Hero LinkedIn

## Locked copy

- Hero: `I'm obsessed with finding the real problem — where users and business meet.`
- GNB CTA: `Contact me!`

## 작업 지침

- 색상: CSS Variable만
- `rules/portfolio-rules.md` 금지 규칙 준수
- 한 작업 = 한 파일(또는 GNB처럼 동일 패턴 일괄) 위주

## 에이전트 문서

| 작업 | 파일 |
|------|------|
| 기능 | [docs/agents/feature-agent.md](docs/agents/feature-agent.md) |
| 콘텐츠 | [docs/agents/content-agent.md](docs/agents/content-agent.md) |
| 리뷰 | [docs/agents/review-agent.md](docs/agents/review-agent.md) |
