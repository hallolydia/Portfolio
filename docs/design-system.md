# Design System

Vanilla CSS 기반 다크 테마 디자인 시스템. 모든 토큰은 `styles.css:4–20`의 `:root` 블록에 정의됨.

---

## Color Palette

```css
/* 배경 계층 */
--color-bg:           #0f0f13   /* 최상위 배경 (body) */
--color-bg-alt:       #16161d   /* 섹션 교차 배경 (.section--alt) */
--color-surface:      #1e1e28   /* 카드·컴포넌트 배경 */
--color-surface-hover:#252531   /* 카드 hover 배경 */

/* 텍스트 */
--color-text:         #e8e8f0   /* 기본 본문 */
--color-muted:        #888899   /* 보조·설명 텍스트 */

/* 브랜드 */
--color-accent:       #7c6fff   /* 메인 퍼플 (CTA, 링크, 포인트) */
--color-accent-hover: #9b8fff   /* 퍼플 hover 상태 */
--color-accent-2:     #ff6b9d   /* 핑크 포인트 (그라디언트 보조) */

/* 경계 */
--color-border:       rgba(255,255,255,0.07)  /* 카드·구분선 테두리 */
```

### 사용 규칙
- 색상 값을 파일 어디에도 하드코딩하지 않음. 반드시 변수 사용
- 새 색상이 필요하면 `:root`에 변수를 추가한 뒤 사용
- `--color-accent` 계열은 인터랙티브 요소(버튼, 링크, 포커스)에만 사용
- 텍스트 대비: body text는 `--color-text`, 설명은 `--color-muted`

---

## Typography

```css
font-family: 'Pretendard', 'Apple SD Gothic Neo', -apple-system,
             BlinkMacSystemFont, 'Segoe UI', sans-serif;
line-height: 1.7;
```

| 용도 | 크기 | 굵기 |
|------|------|------|
| Hero 제목 | `clamp(2.8rem, 6vw, 5rem)` | 800 |
| 섹션 타이틀 | `2rem` | 800 |
| 카드 제목 | `1.05–1.3rem` | 700 |
| 본문 | `0.9–1rem` | 400 |
| 보조·레이블 | `0.75–0.85rem` | 500–600 |
| 버튼 | `0.8–0.9rem` | 600 |

- 제목 계열에는 `letter-spacing: -1px ~ -2px` 적용
- 한국어 콘텐츠에는 Pretendard 폰트를 우선 사용 (CDN 추가 시 Google Fonts 또는 cdn.jsdelivr.net/gh/orioncactus/pretendard)

---

## Spacing & Layout

```css
--gnb-height: 64px    /* GNB 고정 높이 */
--radius:     14px    /* 카드·모달 둥근 모서리 */
--radius-sm:  8px     /* 버튼·인풋 둥근 모서리 */
--shadow:     0 4px 24px rgba(0,0,0,0.4)
--transition: 0.22s ease
```

| 요소 | 값 |
|------|----|
| 섹션 패딩 (PC) | `100px 0` |
| 섹션 패딩 (태블릿) | `72px 0` |
| 컨테이너 최대 너비 | `1200px` |
| 컨테이너 좁은 버전 | `720px` (.section__inner--narrow) |
| 수평 패딩 | `24px` |
| 카드 그리드 gap | `20px` |

---

## Grid System

```css
/* About: 프로필 + 정보 2열 */
.card-grid--about    { grid-template-columns: 320px 1fr; }

/* Projects: 자동 채우기, 최소 280px */
.card-grid--projects { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }

/* Skills: 자동 채우기, 최소 220px */
.card-grid--skills   { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
```

---

## Responsive Breakpoints

| 브레이크포인트 | 적용 변화 |
|---------------|-----------|
| `≤ 768px` | GNB 햄버거 전환, About 1열, Skills 2열, form 1열, 섹션 패딩 축소 |
| `≤ 480px` | Skills 1열, Hero CTA 세로 배치 |

---

## Component Patterns

### 버튼
```html
<a class="btn btn--primary">Primary</a>
<a class="btn btn--outline">Outline</a>
<a class="btn btn--sm btn--primary">Small Primary</a>
<button class="btn btn--primary btn--full">Full Width</button>
```

### 카드
```html
<div class="card card--[profile|info|project|skill|contact]">...</div>
```
- 모든 카드는 `.card` 기본 클래스에 modifier 조합
- hover: `translateY(-4px)` + `box-shadow` + border 색상 변화

### 섹션 타이틀 (밑줄 효과)
```html
<h2 class="section__title">섹션명</h2>
```
`::after` pseudo로 accent 색상 40px 밑줄 자동 생성.

### Scroll Reveal 애니메이션
`script.js`가 페이지 로드 시 `.card`, `.section__title`, `.section__sub`, `.hero__inner`에 자동으로 `.reveal` 클래스 추가. CSS transition으로 처리됨.

---

## 다크 테마 규칙

- 배경은 항상 `--color-bg` 계열 변수 사용 (흰색 배경 절대 금지)
- 반투명 효과: GNB는 `rgba(15,15,19,0.82)` + `backdrop-filter: blur(16px)`
- 그라디언트 장식: `--color-accent`와 `--color-accent-2` 조합
- 포커스 링: `box-shadow: 0 0 0 3px rgba(124,111,255,0.1)`
