# Astro & Obsidian 블로그 운용 마스터 가이드

`gksdydwn.github.io` 블로그를 운영하면서 필요한 것들을 모아둔 매뉴얼입니다.
글 쓰는 법, 분류 체계, 이미지 넣는 법, Obsidian 연동, 배포까지 다룹니다.

> 최종 갱신: 2026-08-22 / Astro 7.x 기준

---

## 목차

1. [디렉토리 구조](#1-디렉토리-구조)
2. [글 쓰기 — Frontmatter 규격](#2-글-쓰기--frontmatter-규격)
3. [분류 체계 — category / subcategory / tags](#3-분류-체계--category--subcategory--tags)
4. [스키마에 새 항목 추가하기](#4-스키마에-새-항목-추가하기)
5. [이미지와 다이어그램](#5-이미지와-다이어그램)
6. [검색 기능](#6-검색-기능)
7. [개발과 배포](#7-개발과-배포)
8. [Obsidian 연동](#8-obsidian-연동)
9. [자주 만나는 문제 (Q&A)](#9-자주-만나는-문제-qa)

---

## 1. 디렉토리 구조

```text
git_blog/
├── .github/workflows/
│   └── deploy.yml          [자동 배포] main에 push하면 실행되는 빌드·배포 스크립트
├── prompts/                [작업 도구] Gemini에게 다이어그램 SVG를 요청할 때 쓰는 프롬프트
├── public/                 [정적 자산] 파비콘 등 가공 없이 그대로 복사될 파일
├── src/
│   ├── assets/             [이미지] 글에 쓰는 사진. Astro가 자동 최적화한다
│   │   ├── fonts/          본문 폰트 파일
│   │   └── diagrams/       설명용 SVG 다이어그램
│   ├── components/         [UI 조각]
│   │   ├── Header.astro          상단 바 (로고, 메뉴, 검색 버튼)
│   │   ├── Footer.astro          하단 바
│   │   ├── CategoryTree.astro    좌측 분류 트리 (2단)
│   │   ├── TableOfContents.astro 우측 목차
│   │   ├── Search.astro          Ctrl+K 검색 팝업
│   │   ├── BaseHead.astro        <head> 메타 태그
│   │   ├── FormattedDate.astro   날짜 표시
│   │   └── HeaderLink.astro      헤더 메뉴 링크
│   ├── content/blog/       [글] 실제 포스팅 .md 파일들
│   ├── content.config.ts   [스키마] frontmatter 검사 규칙  ← 4장 참고
│   ├── layouts/
│   │   └── BlogPost.astro  글 상세 페이지 3단 레이아웃
│   ├── pages/              [URL] 파일 위치가 곧 주소가 된다
│   │   ├── index.astro           /          메인 대시보드
│   │   ├── about.astro           /about
│   │   ├── rss.xml.js            /rss.xml
│   │   └── blog/
│   │       ├── index.astro       /blog      글 목록
│   │       └── [...slug].astro   /blog/글이름/
│   └── styles/global.css   [스타일] 전역 CSS
├── package.json            부품 목록과 실행 스크립트
├── astro.config.mjs        Astro 설정 (site 주소, 통합 기능, 폰트)
└── tsconfig.json           타입스크립트 설정
```

> ⚠️ 스키마 파일은 **`src/content.config.ts`** 입니다. 예전 Astro의 `src/content/config.ts`가 아닙니다.

---

## 2. 글 쓰기 — Frontmatter 규격

`src/content/blog/` 아래에 `.md` 파일을 만들고 맨 위에 아래 정보를 적습니다.

```markdown
---
title: "글 제목"
description: "목록과 검색에 보이는 한 줄 설명"
pubDate: "2026-08-22"
heroImage: "../../assets/blog-placeholder-1.jpg"
category: "Study"
subcategory: "Python"
tags: ["Python", "자료형"]
---

여기부터 본문입니다.
```

| 항목 | 필수 | 설명 |
| --- | --- | --- |
| `title` | ✅ | 글 제목 |
| `description` | ✅ | 한 줄 설명. 목록·검색·SNS 미리보기에 쓰임 |
| `pubDate` | ✅ | `YYYY-MM-DD` 형식 |
| `category` | ✅ | **`Study` / `Project` / `Interest` 중 하나** |
| `heroImage` | | 대표 이미지 상대 경로 |
| `subcategory` | | 소분류. 자유 문자열 |
| `tags` | | 검색용 태그 배열. 생략하면 빈 배열 |
| `updatedDate` | | 수정일 |
| `completionRate` | | 0~100. `Project` 글의 진행률 게이지 |

### 파일 이름이 곧 주소입니다

```
src/content/blog/git-basics.md   →   /blog/git-basics/
```

**영문 소문자 + 하이픈**을 씁니다. 한글 파일명은 URL이 지저분해집니다.

### 필수 항목을 빠뜨리면 빌드가 막아줍니다

`category`를 안 적거나 오타를 내면 배포되기 전에 잡힙니다.

```
[InvalidContentEntryDataError] blog → my-post
  category: Invalid option: expected one of "Study"|"Project"|"Interest"
  Location: src\content\blog\my-post.md
```

파일 이름과 문제가 된 항목을 정확히 알려주므로, 그대로 고치면 됩니다.

---

## 3. 분류 체계 — category / subcategory / tags

세 칸은 **성격이 다릅니다.** 처음엔 전부 `tags` 하나에 넣었다가, 좌측 트리에서 같은 글이 여러 서랍에 동시에 나타나는 문제 때문에 나눴습니다.

| | 개수 | 성격 | 쓰임 |
| --- | --- | --- | --- |
| `category` | 글당 **1개** (필수) | 서랍 | 좌측 트리 대분류, 메인 위젯 |
| `subcategory` | 0~1개 | 서랍 속 칸막이 | 좌측 트리 소분류 |
| `tags` | 여러 개 | 꼬리표 | 검색, 우측 키워드 구름 |

```
📁 Study            ← category (고정된 3개 중 하나)
   📁 Python        ← subcategory (자유, 생략 가능)
      📄 리스트 정리
   📄 그냥 공부 메모  ← subcategory 없으면 대분류 바로 아래
📁 Project
   📁 블로그 구축
      📄 Astro 블로그 만들기
```

### 대분류가 메인 화면 위젯과 연결됩니다

| category | 메인 화면 위젯 |
| --- | --- |
| `Study` | 📖 최근 학습 노트 (최신 3개) |
| `Project` | 💻 소프로젝트 진행 현황 (`completionRate` 게이지) |
| `Interest` | 🎨 관심사 & 생각 정리 (최신 3개) |

### 분류를 늘리거나 줄이려면

`src/content.config.ts`의 배열을 고칩니다.

```ts
category: z.enum(['Study', 'Project', 'Interest', 'Book']),
//                                                 ^^^^^^ 추가
```

**추가는 단어 하나면 끝이고 기존 글은 건드릴 필요가 없습니다.**
반대로 뺄 때는, 그 값을 쓰던 글이 남아 있으면 빌드가 파일 이름과 함께 알려줍니다. 그 글들의 `category`만 바꾸면 됩니다.

소분류는 목록이 고정돼 있지 않아서 그냥 새 값을 쓰면 바로 생깁니다.

---

## 4. 스키마에 새 항목 추가하기

**이 장이 이 문서에서 가장 중요합니다.**

### 등록하지 않으면 조용히 사라집니다

frontmatter에 아무리 적어도, `src/content.config.ts`에 등록되지 않은 항목은 **경고도 에러도 없이 버려집니다.**

실제로 이 블로그에서 `tags`를 스키마에 넣지 않은 채 글에만 적어 두었더니, 빌드는 멀쩡히 성공하는데 **좌측 트리만 텅 비어 있는** 일이 있었습니다. 에러가 났다면 금방 알았을 텐데 아무 말이 없어서 한참 헤맸습니다.

Zod(검사 도구)의 `z.object()`가 정의되지 않은 키를 버리기 때문입니다.

### 반드시 3단계를 다 밟습니다

예를 들어 "이 글은 아직 초안"이라는 표시를 넣고 싶다면,

**① 스키마에 등록** — `src/content.config.ts`
```ts
draft: z.boolean().default(false),
```

**② 마크다운에 사용**
```markdown
---
title: "쓰다 만 글"
draft: true
---
```

**③ 코드에서 사용** — `.astro` 파일
```ts
const published = posts.filter(post => !post.data.draft);
```

> 반영이 안 되는 것 같으면 개발 서버를 재시작하세요. 설정 파일 변경은 hot reload가 못 잡는 경우가 있습니다.

### 자주 쓰는 스키마 표기

| 표기 | 의미 |
| --- | --- |
| `z.string()` | 문자열 **필수**. 없으면 빌드 에러 |
| `.optional()` | 없어도 됨. 없으면 `undefined` |
| `.default([])` | 없으면 `[]`로 채워 넣음 |
| `z.enum([...])` | 나열된 값 중 하나만 허용. 오타를 잡아줌 |
| `z.coerce.date()` | `"2026-08-22"` 문자열을 Date 객체로 변환 |
| `z.number().min(0).max(100)` | 0~100 범위의 숫자 |
| `image()` | 상대경로를 이미지 객체로 변환 + 경로 검증 |

`.optional()`과 `.default()`는 의도적으로 구분해서 씁니다.

- `tags`는 `.default([])` → 항상 배열이라 `post.data.tags.some(...)`을 바로 쓸 수 있습니다
- `completionRate`는 `.optional()` → **"0%"와 "설정 안 함"은 다른 의미**이기 때문입니다

---

## 5. 이미지와 다이어그램

### 사진 — `src/assets/`에 넣고 상대경로로

```markdown
![설명](../../assets/my-photo.png)
```

`src/content/blog/`의 글 기준으로 두 단계 위(`../../`)가 `src/`입니다.

Astro가 빌드할 때 **WebP 변환과 크기 최적화를 자동으로** 해줍니다. 경로가 틀리면 빌드가 에러로 잡아줍니다.

> `public/` 폴더에 넣고 `/images/x.png`처럼 절대경로로 쓸 수도 있지만, **최적화가 안 됩니다.** 특별한 이유가 없으면 `src/assets/`를 씁니다.

### 설명용 그림 — SVG를 쓴다

**코드블록에 ASCII로 그리지 않습니다.** 폰트에 따라 정렬이 깨지기 때문입니다.

실제로 측정해 보면 이렇습니다.

| 폰트 | 한글 폭 | 박스문자(`─│└`) 폭 |
| --- | --- | --- |
| 기본 `monospace` | 영문의 2.00배 | 영문의 **2.00배** |
| Cascadia Mono | 영문의 **1.71배** | 영문의 1.00배 |
| Consolas | 영문의 **1.82배** | 영문의 1.00배 |

어떤 폰트를 골라도 한쪽이 어긋납니다. 게다가 방문자의 OS와 설치 폰트에 따라 또 달라집니다.

**그래서 SVG 파일로 만들어 `src/assets/diagrams/`에 둡니다.**

```markdown
![Git의 3단계 구조](../../assets/diagrams/git-three-stages.svg)
```

| | SVG | PNG | 브라우저 Mermaid |
| --- | --- | --- | --- |
| 용량 | **3KB 안팎** | 60~300KB | +JS 수백 KB |
| 확대 | **항상 선명** | 흐려짐 | 선명 |
| 런타임 JS | **0** | 0 | 필요 |
| 수정 | 텍스트 편집 | 툴 재작업 | 텍스트 편집 |

### SVG는 Gemini에게 만들게 한다

`prompts/gemini_svg_diagram.md`에 **그대로 복사해서 쓸 프롬프트**가 준비돼 있습니다.

핵심은 **"그림을 그려줘"가 아니라 "SVG 코드를 써줘"** 라고 요청하는 것입니다. 생성형 이미지 모델은 그림 안의 글자를 자주 뭉개지만(`git commit` → `git commlt`), SVG는 코드라서 글자가 정확합니다.

프롬프트 파일에는 색상 팔레트, 글꼴 스택, 크기 제한, 완성된 참고 예시가 들어 있어서 블로그 톤에 맞는 결과가 나옵니다.

받은 코드를 `src/assets/diagrams/이름.svg`로 저장하면 끝입니다.

> 생성형 이미지가 적합한 곳도 있습니다. **글 대표 이미지(`heroImage`)** 는 글자가 없어도 되고 분위기만 내면 되므로 잘 맞습니다.

---

## 6. 검색 기능

헤더의 🔍 버튼 또는 **`Ctrl` + `K`** 로 열립니다.

- 제목, 설명, 태그, 분류, 소분류를 한 번에 훑습니다
- `#astro`처럼 `#`를 붙여도 되고 안 붙여도 됩니다
- 대소문자를 가리지 않습니다
- 여러 낱말을 넣으면 **전부 포함하는 글**만 나옵니다
- `↑` `↓`로 이동, `Enter`로 열기, `Esc`로 닫기

빌드할 때 색인을 만들어 페이지에 심어두고 브라우저에서 걸러내는 방식이라 **서버 왕복이 없습니다.** 본문은 색인에 넣지 않습니다 — 색인이 커져 첫 로딩이 무거워지기 때문입니다.

구현은 `src/components/Search.astro` 한 파일에 다 들어 있습니다.

---

## 7. 개발과 배포

### 명령

```bash
npm install        # 최초 1회, 또는 부품이 바뀌었을 때
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

> `npm run dev`는 터미널을 붙잡습니다. **`Ctrl + C`** 로 종료합니다.
> 새로 띄웠는데 주소가 `4322`, `4323`으로 밀려 나오면 **이전 서버가 안 죽고 남아 있다는 신호**입니다.
> `Get-Process node`로 확인하고(수백 MB짜리가 개발 서버) `Stop-Process -Id <PID> -Force`로 정리합니다.

### 배포

```bash
git add .
git commit -m "docs: add a post on ..."
git push origin main
```

push하면 `.github/workflows/deploy.yml`이 돌아 GitHub이 빌드하고 1~2분 뒤 사이트에 반영됩니다.

```bash
gh run list --limit 3      # 배포 진행 상황
```

**커밋 메시지는 영어 + Conventional Commits** 형식을 씁니다.

```
feat:     새 기능 추가
fix:      버그 수정
docs:     문서·글 추가/수정
refactor: 동작은 그대로, 구조만 개선
chore:    빌드 설정, 잡일
```

Git 자체에 대한 정리는 [Git 기본기 정리](https://gksdydwn.github.io/blog/git-basics/) 글에 따로 있습니다.

---

## 8. Obsidian 연동

`git_blog` 폴더를 **보관소(vault)로 열어서** 씁니다. 마크다운 파일이 그대로 블로그 글이 됩니다.

### 필수 설정 — 이미 적용되어 있음

`.obsidian/app.json`에 저장돼 있고 git으로 추적되므로, 다른 PC에서도 폴더만 받으면 따라옵니다.

```json
{
  "useMarkdownLinks": true,
  "newLinkFormat": "relative",
  "attachmentFolderPath": "src/assets"
}
```

| 설정 | 값 | 이유 |
| --- | --- | --- |
| `Use [[Wikilinks]]` | **끄기** | Astro는 `[[...]]`를 모릅니다 |
| `New link format` | **상대 경로** | `../../assets/x.png` 형태여야 빌드가 통과합니다 |
| `Attachment folder path` | **`src/assets`** | `Ctrl+V`로 붙인 이미지가 여기 저장됩니다 |

**효과**: 캡처한 그림을 노트에 `Ctrl+V`로 붙이면 파일이 `src/assets/`에 저장되고 본문에는 상대경로 링크가 자동으로 박힙니다.

> 설정을 바꿨다면 **Obsidian을 재시작**해야 반영됩니다.

### 글 템플릿 등록

매번 frontmatter를 손으로 치는 건 번거롭습니다.

1. 루트에 `_templates` 폴더를 만들고 `blog-post-template.md`를 넣습니다.
   ```markdown
   ---
   title: "{{title}}"
   description: ""
   pubDate: "{{date}}"
   heroImage: "../../assets/blog-placeholder-1.jpg"
   category: "Study"
   subcategory: ""
   tags: []
   ---
   ```
2. **설정 → Core plugins → Templates** 활성화
3. **Template folder path**: `_templates`
4. **Date format**: `YYYY-MM-DD`
5. **설정 → Hotkeys**에서 `Templates: Insert template`에 단축키 지정

새 노트에서 단축키를 누르면 오늘 날짜와 파일명이 채워진 양식이 들어옵니다.

### 원클릭 발행 (Obsidian Git)

커뮤니티 플러그인 **Obsidian Git**이 설치돼 있습니다.

- **설정 → Hotkeys**에서 `Obsidian Git: Commit and push all changes`에 단축키를 지정
- 글 쓰고 그 키만 누르면 add·commit·push가 한 번에 끝납니다

> 커밋 메시지가 `vault backup: 날짜` 같은 자동 문구로 들어갑니다. **글쓰기엔 괜찮지만 코드 수정엔 부적합합니다.**
> 플러그인 설정에서 *Specify custom commit message on auto backup*을 켜면 매번 메시지를 물어봅니다.
> 코드를 고쳤을 때는 VS Code(`Ctrl+Shift+G`)나 터미널에서 직접 커밋하는 편이 낫습니다.

---

## 9. 자주 만나는 문제 (Q&A)

### Q. frontmatter에 적었는데 화면에 안 나옵니다

**스키마에 등록했는지 확인하세요.** `src/content.config.ts`에 없는 항목은 에러 없이 버려집니다. → [4장](#4-스키마에-새-항목-추가하기)

### Q. 빌드가 `InvalidContentEntryDataError`로 멈춥니다

필수 항목이 없거나 값이 규격에 안 맞는 것입니다. 에러 메시지에 **파일 이름과 문제가 된 항목**이 나옵니다. `category` 오타가 가장 흔합니다.

### Q. 이미지가 안 보입니다

- 경로가 `../../assets/...` 형태인지 (글 파일 기준 두 단계 위)
- 파일이 실제로 `src/assets/`에 있는지
- Obsidian에서 붙였다면 `attachmentFolderPath` 설정이 적용됐는지 ([8장](#8-obsidian-연동))

### Q. 개발 서버 주소가 4322, 4323으로 밀려 나옵니다

이전 서버가 안 죽고 남아 있습니다. `npm run dev:stop`으로 안 되면 `Get-Process node`로 찾아서 `Stop-Process -Id <PID> -Force`.

### Q. 코드블록의 다이어그램이 어긋나 보입니다

박스 그리기 문자와 한글을 섞으면 어떤 폰트에서도 완벽히 맞출 수 없습니다. **SVG로 만드세요.** → [5장](#5-이미지와-다이어그램)

### Q. `astro` 명령이 없다고 합니다

`astro`는 컴퓨터 전체가 아니라 이 프로젝트의 `node_modules/.bin/`에만 설치돼 있습니다. `npm run ...`을 쓰거나 `npx astro ...`로 실행하세요.

### Q. Astro 설치할 때 "폴더가 비어 있지 않다"고 멈췄던 이유는?

깃허브에서 클론한 폴더에 이미 `.git`과 README가 있어서 설치기가 안전을 이유로 정지한 것입니다. 임시 폴더에 설치한 뒤 내용물을 옮기는 방법으로 우회했습니다. (그 흔적으로 `package.json`의 name이 `temp_astro`로 남아 있었고, 지금은 고쳤습니다)

### Q. `Set-ExecutionPolicy` 보안 경고는 왜 났나요?

Windows PowerShell이 검증되지 않은 스크립트 실행을 기본적으로 막기 때문입니다. `RemoteSigned`로 두면 로컬에서 직접 만든 스크립트는 실행됩니다.
