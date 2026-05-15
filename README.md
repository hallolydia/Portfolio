# Lydia Portfolio

> **2026 Fall 미국 UX 인턴** (Google, Meta) · Product Designer  
> **UI 언어:** English only · **문서 언어:** 한국어 (이 README)

---

## 1. 목적

- 디자이너의 **사고 과정**과 **비즈니스 임팩트**가 보이는 포트폴리오
- 리뷰어가 **한 문장**으로 기억하고, **3분 안에** 강한 케이스 2~4개까지 탐색 가능하게

---

## 2. 기술 스택

### 현재 (배포·구현)

| 구분 | 기술 |
|------|------|
| 마크업 | HTML5 (시맨틱) |
| 스타일 | Vanilla CSS (CSS Variables, Manrope) |
| 인터랙션 | Vanilla JavaScript (ES6+) |
| 배포 | GitHub Pages / Netlify (정적) |

### 로드맵 (점진 마이그레이션)

| 구분 | 기술 |
|------|------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| 배포 | Vercel |

**규칙:** 한 작업 = 레거시 **또는** Next 중 하나만 수정. 상세 → [`rules/portfolio-rules.md`](rules/portfolio-rules.md)

---

## 3. 사이트 구조

### GNB (전 페이지)

```
[ Lydia → Home ]    Work · Lab · Article · About    [ Contact me! → LinkedIn ]
```

| 항목 | 규칙 |
|------|------|
| Lydia | 홈 (`/` 또는 `../`) |
| Work / Lab / Article / About | 각 서브 페이지 |
| **Contact me!** | GNB 맨 오른쪽 · LinkedIn 새 탭 · 문구 변경 금지 |

### 페이지 & Home 화이트리스트

| 경로 | 파일 | 허용 섹션 |
|------|------|-----------|
| `/` | `index.html` | Hero, Selected Work **4**, Proof strip (story-strip) |
| `/work/` | `work/index.html` | 필터 + 케이스 그리드 |
| `/about/` | `about/index.html` | 소개, 스킬, (선택) Resume PDF |
| `/lab/` | `lab/index.html` | 실험·프로세스 타일 |
| `/article/` | `article/index.html` | 아티클 목록 |
| `/resume/` | `resume/index.html` | 이력·PDF (GNB 메뉴에는 없음) |

**Home에 넣지 않음 (요청 전):** Referrals, Contact CTA 섹션, Contact 폼, Hero LinkedIn 버튼

---

## 4. 레이아웃

### 브레이크포인트

| 이름 | 범위 |
|------|------|
| Desktop | 1281px ~ 3840px |
| Tablet | 769px ~ 1280px |
| Mobile | 320px ~ 768px |

### 좌우 마진

| 구간 | 마진 |
|------|------|
| Desktop / Tablet | 40px (`section__inner`, footer 등) |
| Mobile | 20px |

### 그리드

- Home Selected Work: Desktop **2×2**, gap **32px** (Tablet 28px / Mobile 20px)
- max-width: **1200px**

---

## 5. Locked copy (임의 수정 금지)

| Key | Text |
|-----|------|
| `hero.headline` | I'm obsessed with finding the real problem — where users and business meet. |
| `gnb.cta` | Contact me! |
| `gnb.cta.url` | `https://www.linkedin.com/in/lydia-jeongeun-oh-2142a8198/` |

---

## 6. 케이스 스터디 템플릿 (`/work/[slug]` — 추후)

1. Overview · 2. Role / Timeline / Team · 3. Problem · 4. Process · 5. Outcome · 6. Learnings (≤3)

콘텐츠 없는 블록은 렌더하지 않음.

---

## 7. 로컬 실행

```bash
# 정적 사이트 (현재)
npx serve .

# 또는 Python
python3 -m http.server 8080
```

---

## 8. 금지 규칙 (요약)

- 요청 없는 섹션·애니메이션·아이콘 추가 금지
- Locked copy / 인벤토리 외 텍스트 작성 금지
- 색상은 CSS Variable만 (`styles.css` `:root`)
- 한 작업에 여러 페이지 동시 대규모 수정 지양
- UI 영어 카피를 한국어로 변경 금지

전체 → [`rules/portfolio-rules.md`](rules/portfolio-rules.md)

---

## 9. 에이전트 진입점

| 파일 | 역할 |
|------|------|
| **README.md** | 이 파일 (사람·에이전트 공통 요약) |
| **CLAUDE.md** | 에이전트 빠른 참조 |
| **rules/portfolio-rules.md** | 작업 시 필수 규칙 |
| **docs/design-system.md** | 토큰·컴포넌트 |

---

## 10. 완료 기준 (DoD)

- [ ] GNB: Lydia + 4메뉴 + **Contact me!** (모든 페이지)
- [ ] Home: Hero + Work 4 + Proof, Referrals/Contact 섹션 없음
- [ ] Hero 문구 §5와 일치
- [ ] 마진 40px / 20px
- [ ] placeholder·로렘 없음 (인벤토리 반영 후)

---

## 11. 추후

- [ ] Next.js 마이그레이션
- [ ] 디자인 시스템·콘텐츠 인벤토리·모션 가이드
- [ ] LinkedIn URL 확정

*최종 수정: 2026-05-16*
