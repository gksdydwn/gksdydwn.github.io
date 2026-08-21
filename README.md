# gksdydwn blog

공부한 내용과 소프로젝트 진행기를 기록하는 개인 블로그.

**https://gksdydwn.github.io**

Astro로 만든 정적 사이트이고, `main`에 push하면 GitHub Actions가 빌드해서 자동 배포한다.
글은 Obsidian으로 쓴다.

---

## 실행

```bash
npm install        # 최초 1회
npm run dev        # 개발 서버 (http://localhost:4321)
npm run build      # 정적 파일 굽기 → dist/
npm run preview    # 구운 결과 미리보기
```

터미널을 붙잡지 않고 띄우려면:

```bash
npm run dev:bg      # 백그라운드로 띄우기
npm run dev:status  # 돌고 있나 확인
npm run dev:stop    # 종료
```

## 글 쓰기

`src/content/blog/` 안에 `.md` 파일을 만든다. 맨 위 frontmatter는 이렇게 쓴다.

```yaml
---
title: "글 제목"
description: "한 줄 설명"
pubDate: "2026-08-22"
heroImage: "../../assets/blog-placeholder-1.jpg"
category: "Study"          # Study / Project / Interest 중 하나 (필수)
subcategory: "Python"      # 선택
tags: ["Python", "자료형"]   # 검색용, 여러 개
---
```

`category`는 **셋 중 하나여야 하고 반드시 있어야 한다.** 오타를 내면 빌드가 파일 이름과 함께 알려준다.

자세한 규칙과 이미지 넣는 법은 [BLOG_GUIDE.md](./BLOG_GUIDE.md) 참고.

## 폴더 구조

```
src/
├── assets/            이미지. diagrams/ 아래에 SVG 다이어그램
├── components/        Header, Footer, CategoryTree(분류 트리), Search(Ctrl+K), TableOfContents
├── content/blog/      글 원본 (.md)
├── content.config.ts  frontmatter 검사 규칙 (스키마)
├── layouts/           BlogPost.astro — 글 상세 3단 레이아웃
├── pages/             URL이 되는 파일들
└── styles/global.css  전역 스타일
prompts/               Gemini에게 다이어그램 SVG를 요청할 때 쓰는 프롬프트
```

## 배포

```bash
git add .
git commit -m "docs: add a post on ..."
git push origin main
```

푸시하면 `.github/workflows/deploy.yml`이 돌아 1~2분 뒤 사이트에 반영된다.
진행 상황은 `gh run list`로 볼 수 있다.

## 문서

| 파일 | 내용 |
| --- | --- |
| [BLOG_GUIDE.md](./BLOG_GUIDE.md) | 글쓰기 규칙, 이미지, Obsidian 연동, Git 흐름 |
| [BLOG_HISTORY.md](./BLOG_HISTORY.md) | 지금까지의 구축 이력과 설계 결정 |
| [CLAUDE.md](./CLAUDE.md) | AI 어시스턴트용 프로젝트 지침 |
