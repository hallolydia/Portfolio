# Content Guide

`index.html`에 실제 콘텐츠를 채우기 위한 체크리스트 및 작성 가이드.

---

## 섹션별 콘텐츠 체크리스트

### GNB (index.html:12–31)
- [ ] 로고 텍스트 변경 (현재 `JE.`) → `index.html:14`

### Hero (index.html:34–47)
- [ ] 인사말 수정 (현재 `안녕하세요,`) → `index.html:36`
- [ ] 이름 수정 (현재 `정은 입니다`) → `index.html:37`
- [ ] 한 줄 소개 수정 → `index.html:38`

### About (index.html:50–74)
- [ ] 실제 이름 입력 (현재 `Jung Eun`) → `index.html:56`
- [ ] 직함 수정 (현재 `Frontend Developer`) → `index.html:57`
- [ ] 자기소개 bio 수정 → `index.html:58`
- [ ] GitHub URL 연결 → `index.html:60`
- [ ] 이메일 주소 확인 (현재 `ari@memecore.org`) → `index.html:61`
- [ ] 위치 수정 (현재 `서울, 대한민국`) → `index.html:66`
- [ ] 경력 수정 (현재 `3년차`) → `index.html:67`
- [ ] 관심사 수정 → `index.html:68`
- [ ] 사용 언어 수정 → `index.html:69`
- [ ] 프로필 이미지 추가 (현재 그라디언트 원 placeholder) → `card__avatar` 클래스에 `<img>` 삽입

### Projects (index.html:77–152)
각 프로젝트 카드 구조:
```html
<article class="card card--project">
  <div class="card__thumb" style="background: linear-gradient(...)">
    <span class="card__tag">태그명</span>
  </div>
  <div class="card__body">
    <h3>프로젝트 이름</h3>
    <p>한두 문장 설명 — 어떤 문제를 해결했는지 중심으로 작성</p>
    <div class="card__stack">
      <span>기술1</span><span>기술2</span><span>기술3</span>
    </div>
    <div class="card__actions">
      <a href="데모URL" class="btn btn--sm btn--primary" target="_blank" rel="noopener">Demo</a>
      <a href="깃허브URL" class="btn btn--sm btn--outline" target="_blank" rel="noopener">GitHub</a>
    </div>
  </div>
</article>
```

카드 태그 권장값: `Web App` / `Mobile` / `Tool` / `Open Source` / `API` / `Design`

썸네일 그라디언트 팔레트 (기존 4가지):
```
보라: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
핑크: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
파랑: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)
초록: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)
```

- [ ] 프로젝트 A 이름·설명·스택·Demo링크·GitHub링크 채우기 → `index.html:82–97`
- [ ] 프로젝트 B 이름·설명·스택·Demo링크·GitHub링크 채우기 → `index.html:99–114`
- [ ] 프로젝트 C 이름·설명·스택·Demo링크·GitHub링크 채우기 → `index.html:116–131`
- [ ] 프로젝트 D 이름·설명·스택·Demo링크·GitHub링크 채우기 → `index.html:133–148`

### Skills (index.html:155–206)
- [ ] Frontend 스킬 목록 수정 → `index.html:163–168`
- [ ] Backend 스킬 목록 수정 → `index.html:174–179`
- [ ] Database 스킬 목록 수정 → `index.html:185–190`
- [ ] DevOps 스킬 목록 수정 → `index.html:196–201`

스킬 카드 추가 시:
```html
<div class="card card--skill">
  <div class="card__skill-icon">🔧</div>
  <h3>카테고리명</h3>
  <ul>
    <li>스킬1</li>
    <li>스킬2</li>
  </ul>
</div>
```

### Contact (index.html:209–234)
- [ ] 섹션 부제목 수정 (현재 `새로운 기회나 협업에 대해...`) → `index.html:212`
- [ ] 폼 실제 전송 기능 연결 (현재 데모) — Formspree 또는 EmailJS 권장
  - Formspree: `<form action="https://formspree.io/f/[YOUR_ID]" method="POST">`
  - EmailJS: `script.js`의 submit 핸들러 교체 필요

### Footer (index.html:237–239)
- [ ] 연도 및 이름 확인 (현재 `© 2026 Jung Eun.`)

---

## SEO 메타태그 체크리스트

`index.html:3–8` `<head>` 영역에 추가 권장:

```html
<meta name="description" content="Jung Eun — Frontend Developer 포트폴리오. React, TypeScript, Node.js 기반 웹 개발" />
<meta name="keywords" content="Frontend, Developer, React, TypeScript, Portfolio" />
<meta property="og:title" content="Jung Eun — Portfolio" />
<meta property="og:description" content="사용자 경험을 중심에 두는 프론트엔드 개발자" />
<meta property="og:image" content="[썸네일 이미지 URL]" />
<meta property="og:url" content="[배포 URL]" />
<link rel="canonical" href="[배포 URL]" />
<link rel="icon" href="favicon.ico" />
```

---

## 이미지 규격

| 용도 | 권장 크기 | 형식 |
|------|-----------|------|
| 프로필 사진 | 200×200px 이상 | WebP 또는 JPEG |
| 프로젝트 썸네일 | 560×320px 이상 | WebP 또는 PNG |
| OG 이미지 | 1200×630px | JPEG 또는 PNG |
| Favicon | 32×32, 180×180 | ICO, PNG |

프로필 이미지 삽입 방법 (`card__avatar`를 이미지로 교체):
```html
<!-- styles.css에서 .card__avatar 배경 제거 후 -->
<div class="card__avatar">
  <img src="images/profile.webp" alt="Jung Eun 프로필 사진" width="96" height="96"
       style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
</div>
```
