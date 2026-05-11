# Feature Agent 지침

기능 추가·수정 작업을 수행하는 에이전트를 위한 지침.

**관련 파일**: `index.html`, `styles.css`, `script.js`  
**참조 문서**: `docs/design-system.md`

---

## 핵심 제약

- **프레임워크 도입 금지**: React, Vue, Svelte, Alpine.js 등 JS 프레임워크/라이브러리를 추가하지 않음
- **빌드 도구 금지**: Vite, webpack, Parcel 등 빌드 파이프라인 도입 금지
- **외부 CSS 라이브러리 금지**: Bootstrap, Tailwind CDN 등 추가 금지
- **CSS 하드코딩 금지**: 색상, 여백, 폰트 등은 반드시 CSS Variable 사용

---

## 새 섹션 추가 패턴

1. `index.html`에 `<section class="section [section--alt]" id="[id]">` 추가
2. `styles.css`에 해당 섹션 스타일 추가 (기존 `.section`, `.card` 패턴 재사용 우선)
3. GNB 네비게이션 링크 추가 (`index.html:15–19`, `index.html:26–30` 두 곳 모두)

섹션 기본 구조:
```html
<section class="section" id="new-section">
  <div class="section__inner">
    <h2 class="section__title">섹션 제목</h2>
    <!-- 콘텐츠 -->
  </div>
</section>
```

교차 배경(어두운 계층) 섹션은 `class="section section--alt"`.

---

## 애니메이션 추가 규칙

**기존 패턴 재사용** (신규 라이브러리 도입 금지):

`script.js:38–51`의 Intersection Observer 패턴을 그대로 활용.
새 요소를 자동 감지 대상에 포함시키려면 `revealEls` 쿼리셀렉터에 추가하거나,
해당 요소에 `.reveal` 클래스를 직접 부여.

```js
// script.js:39 현재 감지 대상
const revealEls = document.querySelectorAll('.card, .section__title, .section__sub, .hero__inner');
```

Hero 진입 애니메이션(`fadeUp`)은 CSS만으로 처리됨 (`styles.css:234–268`). 동일 패턴:
```css
opacity: 0;
animation: fadeUp 0.6s ease [딜레이]s forwards;
```

---

## 반응형 작업 기준

브레이크포인트는 두 단계만 사용. 새로운 중간 값 추가 금지.

```css
@media (max-width: 768px) { /* 태블릿·모바일 공통 */ }
@media (max-width: 480px) { /* 소형 모바일 전용 */ }
```

| 768px 이하 적용 사항 | 480px 이하 추가 사항 |
|---------------------|---------------------|
| GNB → 햄버거 메뉴 | Skills 그리드 1열 |
| About → 1열 | Hero CTA 세로 배치 |
| Skills → 2열 | |
| 폼 → 1열 | |

---

## GNB 관련 작업

- 새 섹션을 nav에 추가할 때 PC nav(`index.html:15–19`)와 모바일 nav(`index.html:26–30`) **두 곳 모두** 수정
- `script.js:9`의 `sections` 쿼리는 `section[id]` 자동 감지이므로 별도 수정 불필요
- GNB 높이(`--gnb-height: 64px`)를 변경하면 `hero` 패딩탑도 같이 확인

---

## Contact Form 기능 구현 (현재 데모)

실제 이메일 전송이 필요한 경우 권장 방식:

**Formspree (서버리스, 무료 플랜 50건/월)**:
```html
<form id="contactForm" action="https://formspree.io/f/[YOUR_ID]" method="POST">
```
`script.js`의 submit 핸들러에서 `fetch`로 POST 전송 후 성공/에러 처리.

**EmailJS (클라이언트사이드)**:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```
API key는 코드에 직접 노출되어도 무방 (EmailJS의 도메인 화이트리스트로 보호).

---

## 카드 추가/제거

### 프로젝트 카드 추가
`index.html:150`의 `</div>` (`.card-grid--projects` 닫는 태그) 앞에 `<article>` 블록 삽입.
`docs/content-guide.md`의 카드 템플릿 사용.

### 스킬 카드 추가
`index.html:204`의 `</div>` 앞에 `<div class="card card--skill">` 블록 삽입.
그리드가 `auto-fill`이므로 열 수 자동 조정.
