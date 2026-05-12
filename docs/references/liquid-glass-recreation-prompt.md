# Liquid Glass Landing Page — Recreation Prompt

> 레퍼런스 소스: 인스피레이션 프롬프트
> 기술 스택: React + TypeScript + Vite + Tailwind CSS + framer-motion + lucide-react

---

## 참고 사이트

- https://www.jiwonlee-designer.com/ — 포트폴리오 콘텐츠 레이아웃, 프로젝트별 논리적 흐름
- https://rachelportfolio.imweb.me/ — 논리적 프로젝트 흐름, 리서치 방안 참고

---

## 기본 설정

- 전체 배경: `bg-black`
- 폰트: **Instrument Serif** (italic & regular) — Google Fonts

```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
```

---

## Liquid Glass CSS

`index.css` → `@layer components` 안에 추가. 모든 유리 효과 요소에 `.liquid-glass` 재사용.

```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.15) 20%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.15) 80%,
    rgba(255, 255, 255, 0.45) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

---

## Section 1 — Hero (`Index.tsx`)

- 컨테이너: `min-h-screen overflow-hidden relative flex flex-col`

### 배경 영상

```
URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4
position: absolute inset-0, w-full h-full object-cover object-bottom
attrs: muted autoPlay playsInline preload="auto"
초기 opacity: 0
```

**영상 페이드 로직** (vanilla JS, ref 기반, CSS transition 없음):
- `canplay` → play 후 opacity 0→1 (500ms, requestAnimationFrame)
- `timeupdate` → 남은 시간 ≤ 0.55s면 opacity 현재→0 (500ms)
- `ended` → opacity 0, 100ms 대기, currentTime 0으로 리셋, 재생, opacity 0→1 (500ms)

### Navbar

- `liquid-glass` 둥근 pill, `max-w-5xl mx-auto px-6 py-3`, flex between
- 좌: Globe 아이콘(24px, white) + "Asme" 텍스트 + nav 링크 (Features / Pricing / About, 모바일 숨김)
- 우: "Sign Up" 텍스트 버튼 + "Login" liquid-glass 둥근 버튼

### Hero 콘텐츠

- `relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]`
- **헤딩**: `text-7xl md:text-8xl lg:text-9xl`, white, `font-family: 'Instrument Serif'`, `Know it then <em>all</em>.`
- **이메일 인풋**: `liquid-glass` 둥근 pill, `pl-6 pr-2 py-2`, 투명 input + 흰 원형 제출 버튼(ArrowRight 아이콘)
- **서브타이틀**: `text-white text-sm leading-relaxed`
- **Manifesto 버튼**: `liquid-glass rounded-full px-8 py-3`

### 소셜 아이콘 푸터

- Instagram / Twitter / Globe — 각각 `liquid-glass rounded-full p-4`

---

## Section 2 — About (`AboutSection.tsx`)

- `bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6`
- 미묘한 radial gradient 오버레이
- framer-motion `useInView` (once: true, margin: "-100px")

| 요소 | 애니메이션 |
|------|-----------|
| "About Us" 레이블 (uppercase, tracking-widest, text-white/40) | opacity 0→1, y 20→0, 0.6s |
| 헤딩 (text-4xl~text-7xl) | opacity 0→1, y 40→0, 0.8s, delay 0.1 |

**헤딩 구조**:
```
Pioneering then <em>ideas</em> (Instrument Serif italic, text-white/60) for
[줄바꿈, 모바일 숨김]
minds that then <em>create, build, and inspire.</em> (Instrument Serif italic, text-white/60)
```

---

## Section 3 — Featured Video (`FeaturedVideoSection.tsx`)

- `bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6`, max-w-6xl
- `rounded-3xl overflow-hidden aspect-video` — 애니메이션: opacity 0→1, y 60→0, 0.9s

```
영상: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4
attrs: muted autoPlay loop playsInline preload="auto"
```

- gradient overlay: `bg-gradient-to-t from-black/60 via-transparent to-transparent`

**하단 오버레이** (absolute bottom-0, flex row 데스크탑 / column 모바일):
- 좌: `liquid-glass rounded-2xl p-6 md:p-8 max-w-md` 카드
  - 레이블: "Our Approach" (text-white/50 xs tracking-widest uppercase)
  - 본문: "We believe in the power of curiosity-driven exploration..."
- 우: "Explore more" `liquid-glass rounded-full` 버튼, `whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}`

---

## Section 4 — Philosophy (`PhilosophySection.tsx`)

- `bg-black py-28 md:py-40 px-6`, max-w-6xl
- 헤딩: `text-5xl~text-8xl` — "Innovation" + `<em>x</em>` (Instrument Serif italic, text-white/40) + "Vision"
- 애니메이션: opacity 0→1, y 40→0, 0.8s

**2열 그리드** (`grid-cols-1 md:grid-cols-2 gap-8 md:gap-12`):

| | 좌 | 우 |
|--|--|--|
| 애니메이션 | opacity 0→1, x -40→0 | opacity 0→1, x 40→0 |
| 콘텐츠 | `rounded-3xl aspect-[4/3]` 영상 | 텍스트 블록 2개 (`w-full h-px bg-white/10` 구분선) |

```
좌 영상: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4
```

**우측 텍스트 블록**:
- 블록 1 — 레이블: "Choose your space" / 본문: "Every meaningful breakthrough begins at the intersection..."
- 블록 2 — 레이블: "Shape the future" / 본문: "We believe that the best work emerges when curiosity meets conviction..."

---

## Section 5 — Services (`ServicesSection.tsx`)

- `bg-black py-28 md:py-40 px-6`, max-w-6xl
- 미묘한 radial gradient 오버레이

**헤더 행** (flex between, 애니메이션 opacity 0→1, y 30→0, 0.7s):
- 좌: "What we do" (text-3xl md:text-5xl white)
- 우: "Our services" (text-white/40 text-sm, 모바일 숨김)

**2열 카드 그리드** (`grid-cols-1 md:grid-cols-2 gap-6 md:gap-8`):
- 카드: `liquid-glass rounded-3xl overflow-hidden group`
- 애니메이션: opacity 0→1, y 50→0, 0.8s, stagger 0.15s
- 영상 영역: `aspect-video`, hover 시 `group-hover:scale-105 transition-transform duration-700`
- 카드 바디 (`p-6 md:p-8`): 태그 레이블 + ArrowUpRight (liquid-glass 원형) + 제목 + 설명

**카드 1**:
```
영상: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4
태그: Strategy | 제목: Research & Insight
설명: "We dig deep into data, culture, and human behavior..."
```

**카드 2**:
```
영상: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4
태그: Craft | 제목: Design & Execution
설명: "From concept to launch, we obsess over every detail..."
```

---

## 차용 포인트 (Lydia 포트폴리오 적용 시)

| 레퍼런스 요소 | 포트폴리오 적용 방향 |
|---|---|
| Liquid Glass 효과 | 카드, GNB, 버튼에 유리질감 적용 |
| 영상 페이드 루프 | 프로젝트 썸네일 hover 시 영상 재생 |
| Hero 타이핑 stagger | 현재 hero__line 애니메이션과 방향 동일 |
| framer-motion scroll reveal | 현재 Intersection Observer 기반과 비교, 필요 시 전환 |
| Instrument Serif italic 믹스 | 헤딩 내 강조 단어에 serif italic 혼합 |
| 2열 카드 + hover scale | 현재 work-grid와 동일 구조, 영상 지원 강화 |
