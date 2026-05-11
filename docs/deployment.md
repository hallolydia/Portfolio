# Deployment Guide

빌드 도구 없이 정적 파일만 배포하면 됩니다.

---

## 배포 전 체크리스트

- [ ] `index.html`의 `<title>` 태그 이름 확인
- [ ] OG 메타태그의 URL/이미지 실제 값으로 교체
- [ ] 프로젝트 Demo/GitHub 링크 `#` 제거 및 실제 URL 입력
- [ ] 프로필 이미지 경로 확인
- [ ] Contact form — 실제 전송 여부 테스트
- [ ] 모바일 브라우저에서 반응형 확인
- [ ] `favicon.ico` 루트에 존재 여부 확인

---

## GitHub Pages 배포

### 첫 배포
```bash
# 1. GitHub에 원격 저장소 생성 후 연결
git remote add origin https://github.com/[USERNAME]/[REPO].git

# 2. 파일 커밋
git add .
git commit -m "init: portfolio site"
git push -u origin main
```

**GitHub 저장소 설정 → Pages:**
- Source: `Deploy from a branch`
- Branch: `main` / `/ (root)`
- Save → 약 1분 후 `https://[USERNAME].github.io/[REPO]` 에서 확인

### 업데이트
```bash
git add .
git commit -m "update: [변경 내용]"
git push
```
푸시 후 자동 재배포 (~1분 소요).

---

## Netlify 배포

### 방법 1 — Drag & Drop (빌드 없이 즉시)
1. [app.netlify.com](https://app.netlify.com) 로그인
2. `Sites` → `Add new site` → `Deploy manually`
3. 프로젝트 폴더 전체를 드래그앤드롭
4. 즉시 `https://[random].netlify.app` 으로 배포

### 방법 2 — GitHub 연동 (자동 배포)
1. Netlify → `Add new site` → `Import an existing project`
2. GitHub 저장소 선택
3. Build settings:
   - **Build command**: (비워두기)
   - **Publish directory**: `.` 또는 `/`
4. Deploy → 이후 `main` 브랜치 push 시 자동 배포

---

## 커스텀 도메인 연결

### Netlify
1. `Site settings` → `Domain management` → `Add custom domain`
2. 도메인 입력 후 `Verify`
3. DNS provider에서 CNAME 레코드 추가:
   ```
   CNAME  www  [your-site].netlify.app
   ```
4. HTTPS는 Netlify가 자동 발급 (Let's Encrypt)

### GitHub Pages
1. 저장소 루트에 `CNAME` 파일 생성 (내용: 도메인만)
   ```
   www.yourdomain.com
   ```
2. DNS에서 A 레코드를 GitHub IP로 설정:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

---

## 성능 팁

- 이미지를 WebP 형식으로 변환 (파일 크기 30–50% 절감)
- 프로필 이미지에 `loading="lazy"` 속성 불필요 (above the fold)
- 프로젝트 썸네일이 실제 `<img>`라면 `loading="lazy"` 적용
- Google Fonts 사용 시 `<link rel="preconnect">` 먼저 추가
