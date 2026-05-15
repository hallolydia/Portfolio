# Lydia Portfolio

> **2026 Fall 미국 UX 인턴** (Google, Meta) · Product Designer  
> **UI 언어:** English only · **문서 언어:** 한국어 (이 README)

---

## 1. 목적 & 목표

**한 줄 포지셔닝:** "사용자와 비즈니스 사이의 진짜 문제를 찾는 디자이너"

| 목표 | 기준 |
|------|------|
| 인터뷰 콜 획득 | 리크루터가 30초 안에 "이 사람 괜찮다" 판단 가능 |
| 케이스 전달 | 시니어 디자이너가 3분 안에 사고 과정·임팩트 파악 가능 |
| 한 문장 기억 | 포트폴리오 닫은 후에도 Lydia = "why를 먼저 묻는 디자이너"로 남기 |

---

## 2. 핵심 타겟 유저

| 유저 | 특징 | 포트폴리오에서 필요한 것 |
|------|------|------------------------|
| 리크루터 | 5~10초 안에 판단, 빠른 스캔 | 첫인상, 명확한 구조, 한 줄 포지셔닝 |
| 디자인 시니어 | 사고과정·비즈니스 임팩트 중시 | 문제 정의, 결정 근거, 결과 수치 |
| 면접관 | 도메인 이해도·문제 정의 능력 평가 | 케이스별 깊이, 다양한 도메인 경험 |

---

## 3. UX 방향성 & 원칙

### 셀프 브랜딩
> 사용자 불편함과 조직의 비즈니스 간의 접점에 있는 문제를 해결하는 디자이너

### 방향성
- **정보 위계 명확하게** → 가장 중요한 것이 가장 먼저 보일 것
- **설명보다 증명** → 카피로 말하지 말고 프로젝트로 보여줄 것
- **빠른 스캔 가능** → 리크루터가 스크롤 한 번에 핵심 파악 가능하게

### 원칙
1. **Less is more** — 콘텐츠 최소화, 임팩트 최대화
2. **Motion with purpose** — 애니메이션은 의미 있을 때만
3. **Consistency** — 컴포넌트·타이포·간격 일관성 유지
4. **Business impact first** — 모든 프로젝트에 결과/임팩트 명시

### 하지 않는 것 (Anti-pattern)
- 스크롤 진행률 바, 파티클 배경 등 과시형 인터랙션
- 리크루터가 읽을 수 없는 작은 텍스트·낮은 명도 대비
- 모바일에서 깨지는 레이아웃 방치

---

## 4. 기술 스택

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

## 5. 사이트 구조

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

## 6. 레이아웃

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

## 7. Locked copy (임의 수정 금지)

| Key | Text |
|-----|------|
| `hero.headline` | I'm obsessed with finding the real problem — where users and business meet. |
| `gnb.cta` | Contact me! |
| `gnb.cta.url` | `https://www.linkedin.com/in/lydia-jeongeun-oh-2142a8198/` |

---

## 8. 케이스 스터디 템플릿 (`/work/[slug]` — 추후)

1. Overview · 2. Role / Timeline / Team · 3. Problem · 4. Process · 5. Outcome · 6. Learnings (≤3)

콘텐츠 없는 블록은 렌더하지 않음.

---

## 9. 로컬 실행

```bash
# 정적 사이트 (현재)
npx serve .

# 또는 Python
python3 -m http.server 8080
```

---

## 10. 금지 규칙 (요약)

- 요청 없는 섹션·애니메이션·아이콘 추가 금지
- Locked copy / 인벤토리 외 텍스트 작성 금지
- 색상은 CSS Variable만 (`styles.css` `:root`)
- 한 작업에 여러 페이지 동시 대규모 수정 지양
- UI 영어 카피를 한국어로 변경 금지

전체 → [`rules/portfolio-rules.md`](rules/portfolio-rules.md)

---

## 11. 에이전트 진입점

| 파일 | 역할 |
|------|------|
| **README.md** | 이 파일 (사람·에이전트 공통 요약) |
| **CLAUDE.md** | 에이전트 빠른 참조 |
| **rules/portfolio-rules.md** | 작업 시 필수 규칙 |
| **docs/design-system.md** | 토큰·컴포넌트 |

---

## 12. 완료 기준 (DoD)

- [ ] GNB: Lydia + 4메뉴 + **Contact me!** (모든 페이지)
- [ ] Home: Hero + Work 4 + Proof, Referrals/Contact 섹션 없음
- [ ] Hero 문구 §5와 일치
- [ ] 마진 40px / 20px
- [ ] placeholder·로렘 없음 (인벤토리 반영 후)

---

## 13. 추후

- [ ] Next.js 마이그레이션
- [ ] 디자인 시스템·콘텐츠 인벤토리·모션 가이드
- [ ] LinkedIn URL 확정

*최종 수정: 2026-05-16 (타겟 유저·목표·UX 원칙 추가)*
