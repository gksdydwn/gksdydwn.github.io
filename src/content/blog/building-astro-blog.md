---
title: "Astro와 Obsidian으로 구축하는 나만의 기술 블로그"
description: "깃허브 페이지 도메인을 생성하고 Astro 블로그 템플릿 설치 및 구동까지의 과정을 상세히 기록합니다."
pubDate: "2026-08-19"
heroImage: "../../assets/blog-placeholder-about.jpg"
tags: ["Astro", "GitHubPages", "Obsidian", "Blog", "Study", "Project"]
completionRate: 80
---

# Astro와 Obsidian으로 구축하는 나만의 기술 블로그

깃허브(GitHub) 저장소에 나만의 지식과 소프로젝트 기록을 유연하게 쌓아두기 위한 블로그 엔진으로 **Astro(아스트로)**를 선택하여 구축한 첫 번째 발자국입니다. 

이 포스팅에서는 블로그의 전체적인 운용 구조와 초기 세팅 과정을 상세히 정리해 둡니다.

---

## 1. 지식 관리 시스템의 전체 흐름

이 블로그는 단순한 포스팅 보관용이 아니라, 일상적인 메모부터 정교한 지식 데이터베이스로 발전할 수 있는 파이프라인으로 구성되어 있습니다.

```text
[ 모바일/이동 중 ] ──> 가벼운 아이디어는 GitHub Issues / Google Keep에 등록
      │
      ▼ (PC 환경)
[ Obsidian 메모앱 ] ──> 로컬 마크다운 문서화 (위키 링크 및 태그 부여)
      │
      ▼ (자동 동기화)
[ Git Commit & Push ] ──> GitHub Pages 서버로 전송
      │
      ▼ (자동 빌드)
[ GitHub Actions ] ──> Astro 정적 사이트로 고속 배포 및 실서비스 오픈
```

* **수집**: 밖에서 가볍게 떠오른 단상은 모바일 깃허브 이슈나 구글 Keep에 날것 그대로 적어둡니다.
* **정제**: 주말이나 조용한 저녁에 **옵시디언(Obsidian)**을 켜고, 수집한 소스를 바탕으로 링크와 구조를 엮어 완성도 있는 포스팅 마크다운 파일로 정제합니다.
* **배포**: 마크다운을 깃허브에 푸시하면, 서버가 알아서 고속으로 빌드하여 사이트를 새로 업데이트해 줍니다.

---

## 2. 블로그 디렉토리 구성 및 관리 구조

Astro 블로그 프로젝트는 아래와 같이 직관적이고 확장성 높은 구조로 배치됩니다. 나중에 새로운 주제나 공부 카테고리가 늘어나더라도 폴더 위치에 구애받지 않고 유연하게 대처할 수 있도록 설계했습니다.

```text
git_blog/ (블로그 루트)
├── .github/workflows/
│   └── deploy.yml          # push 시 자동 빌드/배포를 실행해 주는 로봇 설정
├── src/
│   ├── components/         # 화면 디자인을 구성하는 재사용 UI 요소
│   ├── content/
│   │   ├── config.ts       # 포스팅 메타데이터(날짜, 태그) 규칙 정의
│   │   └── blog/           # 실제 글(Markdown) 파일들이 쌓이는 방
│   │       ├── building-astro-blog.md  <-- (현재 작성 중인 글)
│   │       └── ...
│   └── pages/              # 웹사이트 주소 경로 (메인, 포스트 상세 등)
├── public/                 # 이미지, 파비콘 등 정적 자산 폴더
├── package.json            # 블로그 구동에 필요한 모듈 명세서
└── astro.config.mjs        # Astro 빌더 설정 파일
```

---

## 3. 구축 과정 요약 기록 (Astro 시작하기)

블로그 구축을 위해 로컬 PowerShell에서 실행했던 명령어들의 히스토리입니다.

### ① 깃허브 저장소 복제 (Git Clone)
`git_blog`라는 전용 디렉토리명을 직접 정의하여 깃허브 원격 저장소의 안테나(`.git` 폴더)를 로컬로 이식받았습니다.
```powershell
git clone https://github.com/gksdydwn/gksdydwn.github.io.git git_blog
cd git_blog
```

### ② 임시 경로를 통한 Astro 설치 및 의존성 주입
Astro의 엄격한 "비어있지 않은 폴더 설치 제한"을 우회하기 위해 임시 폴더에 받아온 뒤 내용물을 루트로 복사해 오는 테크닉을 적용했습니다.
```powershell
# 임시 폴더에 Astro 블로그 템플릿 설치
npx create-astro@latest temp_astro --template blog --no-git --no-install

# 원본 덮어쓰기 복사 및 임시 폴더 청소
Copy-Item -Path temp_astro\* -Destination ./ -Recurse -Force
Copy-Item -Path temp_astro\.* -Destination ./ -Recurse -Force
Remove-Item -Path temp_astro -Recurse -Force

# 블로그 실행을 위한 의존성 설치
npm install
```

### ③ 로컬 실시간 개발 서버 가동
코드나 글을 수정하면 브라우저가 알아서 감지해 실시간 반영해 주는 개발 모드입니다.
```powershell
npm run dev
```

---

## 4. 앞으로의 계획과 해시태그 규칙
학습한 내용(프로그래밍, CS)이나 소프로젝트 일지, 그리고 개인 독서록 등 카테고리를 아래의 표준화된 태그 규칙을 활용하여 메타데이터에 기록할 예정입니다. 

* **#Astro** : 블로그 기능 추가 및 개발 관련 기록
* **#GitHubPages** : 배포 설정 및 호스팅 서버 이슈 관리
* **#Obsidian** : 지식 관리 요령 및 옵시디언 꿀팁 정리
* **#Study** : 코딩 공부(언어, 라이브러리) 내용 정리
* **#Project** : 나만의 소소한 토이 프로젝트 개발기 누적
