# Review Agent 지침

코드 품질 검사 및 리뷰를 수행하는 에이전트를 위한 지침.

**검사 대상**: `index.html`, `styles.css`, `script.js`

---

## 검사 기준 및 목표

| 항목 | 목표 |
|------|------|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 90+ |
| Lighthouse Best Practices | 90+ |
| Lighthouse SEO | 90+ |
| 모바일 반응형 | 320px~1440px 범위 정상 표시 |
| 브라우저 호환 | Chrome/Safari/Firefox 최신 2버전 |

---

## Accessibility 체크리스트

### index.html
- [ ] 모든 `<img>`에 `alt` 속성 존재
- [ ] `<button>`에 텍스트 또는 `aria-label` 있음 (햄버거 버튼: `aria-label="메뉴 열기"` ← 현재 존재)
- [ ] 폼 `<input>`과 `<label>`이 `for`/`id`로 연결됨 (현재 연결됨: name, email, message)
- [ ] 색상 대비 AA 기준 충족 (WCAG 2.1)
  - `--color-muted` (#888899) on `--color-bg` (#0f0f13): 대비비 ~5.6:1 (AA 통과)
  - `--color-text` (#e8e8f0) on `--color-bg`: 충분한 대비
- [ ] 키보드 탐색 가능 (Tab 포커스 순서 논리적)
- [ ] `<html lang="ko">` 설정됨 (현재 설정됨)
- [ ] 섹션 제목 계층(h1→h2→h3) 순서 올바름

### 포커스 스타일
현재 CSS에 `:focus-visible` 스타일이 명시적으로 없음. 추가 권장:
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

---

## 성능 체크리스트

- [ ] 외부 CSS/JS 없음 (현재 외부 의존성 0)
- [ ] 이미지에 `width`/`height` 속성 지정 (CLS 방지)
- [ ] 이미지에 `loading="lazy"` 적용 (above-the-fold 제외)
- [ ] CSS에 사용되지 않는 규칙 없음
- [ ] JavaScript가 렌더 블로킹 없이 `</body>` 직전에 위치 (현재 `index.html:241` ← 올바름)
- [ ] `scroll` 이벤트 리스너에 `{ passive: true }` 설정 (현재 `script.js:3` ← 올바름)

---

## CSS 네이밍 컨벤션

이 프로젝트는 BEM을 사용하지 않고 **수정된 시맨틱 네이밍**을 사용.

패턴: `[컴포넌트]__[요소]` 및 `[컴포넌트]--[수정자]`

```
.gnb              → 컴포넌트
.gnb__inner       → 컴포넌트 내부 요소
.gnb__nav         → 컴포넌트 하위 요소
.gnb.scrolled     → JS로 토글되는 상태 클래스 (BEM의 --modifier 아님)

.card             → 기본 카드
.card--profile    → 프로필 카드 수정자
.card--project    → 프로젝트 카드 수정자

.btn              → 기본 버튼
.btn--primary     → 수정자
.btn--sm          → 수정자
.btn--full        → 수정자 (조합 가능)
```

리뷰 시 이 패턴을 따르지 않는 새 클래스명은 수정 제안.

---

## JavaScript 코드 품질

- [ ] `const`/`let` 사용 (var 금지)
- [ ] 이벤트 리스너 제거(`removeEventListener`) 필요 여부 확인 (SPA가 아니므로 불필요)
- [ ] `document.getElementById` vs `querySelector` 혼용은 허용 (성능 차이 미미)
- [ ] `IntersectionObserver` unobserve 처리 (`script.js:46` ← 현재 올바름)
- [ ] 전역 변수 최소화 (현재 파일 최상단 변수 선언은 모듈 패턴 없이도 허용 — 단일 파일이므로)

---

## 보안 체크리스트

- [ ] 외부 링크에 `rel="noopener noreferrer"` 또는 최소 `rel="noopener"` 적용
  - 현재 GitHub 링크: `rel="noopener"` 존재 (`index.html:60`)
  - 프로젝트 카드 외부 링크 추가 시 동일하게 적용할 것
- [ ] `<form>`에 CSRF 토큰 불필요 (정적 사이트, 서버리스 폼 서비스 사용 시 해당 서비스가 처리)
- [ ] 사용자 입력을 `innerHTML`에 직접 삽입 금지 (현재 해당 없음)

---

## 일반 리뷰 가이드라인

1. 프레임워크·빌드 도구 도입을 제안하지 않음 (의도적 선택)
2. CSS 변수 사용 여부 우선 확인 (하드코딩된 색상 값은 즉시 지적)
3. 반응형 브레이크포인트 768px/480px 외 추가 여부 확인
4. JS 인라인 이벤트 핸들러(`onclick=""`) 신규 추가 금지
5. `!important` 사용은 기존 코드에도 없으므로 추가 금지
