# Content Agent 지침

텍스트 콘텐츠 업데이트를 담당하는 에이전트를 위한 지침.

**주요 수정 파일**: `index.html`  
**참조 문서**: `docs/content-guide.md`

---

## 수정 전 확인 사항

1. 반드시 `index.html` 전체를 먼저 읽은 뒤 수정
2. 구조(태그, 클래스)를 변경하지 말고 텍스트 노드만 수정
3. 링크 속성(`href`, `target`, `rel`) 외 HTML 속성은 수정 금지

---

## 섹션별 수정 위치 맵

| 수정 항목 | 파일:줄 |
|-----------|---------|
| GNB 로고 | `index.html:14` |
| Hero 인사말 | `index.html:36` |
| Hero 이름 | `index.html:37` |
| Hero 한 줄 소개 | `index.html:38` |
| About 이름 | `index.html:56` |
| About 직함 | `index.html:57` |
| About bio | `index.html:58` |
| GitHub 링크 | `index.html:60` |
| 이메일 링크 | `index.html:61` |
| 위치 | `index.html:66` |
| 경력 | `index.html:67` |
| 관심사 | `index.html:68` |
| 언어 | `index.html:69` |
| 프로젝트 A | `index.html:82–97` |
| 프로젝트 B | `index.html:99–114` |
| 프로젝트 C | `index.html:116–131` |
| 프로젝트 D | `index.html:133–148` |
| Frontend 스킬 | `index.html:163–168` |
| Backend 스킬 | `index.html:174–179` |
| Database 스킬 | `index.html:185–190` |
| DevOps 스킬 | `index.html:196–201` |
| Contact 부제목 | `index.html:212` |
| Footer 저작권 | `index.html:238` |

---

## 한국어·영어 혼용 정책

- 섹션 제목(About, Projects, Skills, Contact): **영어 유지** (디자인 의도)
- 본문 설명, bio, 프로젝트 설명: **한국어 우선**
- 기술 스택 태그, 버튼 텍스트(Demo, GitHub): **영어 유지**
- 폼 레이블과 placeholder: **한국어**

---

## 절대 변경 금지 항목

다음 속성과 클래스는 JS 동작과 직결되므로 수정 금지:

| 요소 | 금지 이유 |
|------|-----------|
| `section[id]` 속성 | `script.js`의 active nav 자동 감지 |
| `.gnb__nav a[href]` | 스크롤 위치 연동 |
| `id="gnb"` | 스크롤 shadow 적용 |
| `id="hamburger"` | 모바일 메뉴 토글 |
| `id="mobileNav"` | 모바일 메뉴 열기/닫기 |
| `id="contactForm"` | 폼 submit 핸들러 |
| `id="formNotice"` | 폼 성공/에러 메시지 표시 |
| `.card`, `.section__title`, `.section__sub` | scroll reveal 감지 대상 |

---

## 프로젝트 카드 교체 방법

기존 플레이스홀더 카드를 실제 프로젝트로 교체할 때:

```html
<!-- 이 구조를 유지하면서 내용만 교체 -->
<article class="card card--project">
  <div class="card__thumb" style="background: linear-gradient(...)">
    <span class="card__tag">태그</span>       ← 태그만 교체
  </div>
  <div class="card__body">
    <h3>실제 프로젝트 이름</h3>              ← 제목 교체
    <p>실제 설명 (1–2문장)</p>               ← 설명 교체
    <div class="card__stack">
      <span>기술1</span>                     ← 스택 교체
    </div>
    <div class="card__actions">
      <a href="실제URL" ...>Demo</a>          ← href 교체
      <a href="실제URL" ...>GitHub</a>        ← href 교체
    </div>
  </div>
</article>
```

Demo 링크가 없는 프로젝트: `btn--primary` 버튼 전체 제거, GitHub 버튼만 유지.

---

## 스킬 목록 수정

각 스킬 카드의 `<li>` 텍스트만 교체. 아이콘(이모지)은 선택적으로 변경 가능.

```html
<div class="card card--skill">
  <div class="card__skill-icon">🖥</div>   ← 이모지 변경 가능
  <h3>Frontend</h3>                         ← 카테고리명 변경 가능
  <ul>
    <li>스킬명</li>                          ← 텍스트만 수정
  </ul>
</div>
```
