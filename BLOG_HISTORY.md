# Astro 블로그 개발 이관 & 히스토리 리포트 (For Claude AI)

> 이 문서는 다음 Claude AI 코딩 세션이나 다른 AI 에시스턴트에게 블로그의 히스토리와 설정 상태를 **1초 만에 인계**하기 위해 작성되었습니다.
> 프로젝트 루트의 마크다운 파일은 Astro 빌드 및 포스팅 퍼블리싱에 아무런 영향을 주지 않으므로 안심하고 깃허브에 공유하여 보관하셔도 됩니다.

---

## 1. 프로젝트 개요 및 로컬 환경
* **프레임워크**: Astro 5.x (정적 웹사이트 생성 빌더)
* **로컬 디렉토리**: `c:\Users\User_\Desktop\클로드폴더\Code\git_blog`
* **운영 도메인**: `https://gksdydwn.github.io` (GitHub Pages 연동 완료)
* **주요 워크플로우**:
  - 로컬 테스트: `npm run dev` (`http://localhost:4321/` 구동)
  - 로컬 빌드 테스트: `npm run build`
  - 배포: `git add .` -> `git commit -m "..."` -> `git push origin main` 실행 시 GitHub Actions 배포 봇이 자동으로 빌드하여 실서버 반영.
  - Node.js 버전: GitHub Actions 빌드 봇 지원을 위해 **Node 22** 이상 강제 설정 완료.

---

## 2. 옵시디언(Obsidian) 연동 가이드라인
Astro 마크다운 빌더가 정적 상대경로 이미지를 강력하게 유효성 검사하므로 아래의 룰이 세팅되어 있습니다.

* **이미지 저장 위치**: `src/assets/`
* **옵시디언 내 필수 설정**:
  1. `Settings` -> `Files and links` -> `Use [[Wikilinks]]` 옵션: **OFF (비활성화)**
  2. `New link format`: **Relative path to file (파일의 상대 경로)**
  3. `Attachment folder path`: **`src/assets`**로 지정
* **효과**: 옵시디언에서 이미지를 드래그 앤 드롭해 노트에 붙여넣으면 `![](../../assets/파일명.png)` 형태의 상대 경로 코드가 자동으로 박히며 Astro와 완벽 호환됩니다.

---

## 3. 핵심 3단 위키(Wiki) 레이아웃 아키텍처

기존 1단 블로그 레이아웃을 **브런치 감성의 3단 명도 구획 구조**로 전면 리디자인 완료했습니다.

### 📐 가로 비율 및 레이아웃
* **황금 비율**: `좌측 트리 200px` | `중앙 본문 1fr (최대폭 제한)` | `우측 목차 180px` (그리드 간격 `gap: 1.2rem`)
* **구분선**: 좌측 사이드바 우측면과 우측 사이드바 좌측면에 얇고 은은한 세로선(`border: 1px solid rgba(0, 0, 0, 0.06)`)을 주어 3단 레이아웃을 명확하게 분할했습니다.

### 🎨 명도 대비를 통한 입체감(Contrast) 부여
* **배경 명도 다운**: `body` 배경색을 차분한 슬레이트 그레이(`background: #f1f5f9`)로 설정했습니다.
* **화이트 카드 입체화**: 중앙의 상세 본문 영역(`.content-card` 클래스) 및 메인 대시보드 카드들(`.dashboard-card`, `.about-card`)은 **순수 화이트(`#ffffff`) 배경**에 부드러운 그림자를 주어, 그레이 배경 위로 볼록하게 떠오른 듯한 웰메이드 입체 효과를 부여했습니다.

### 📂 좌측 사이드바: CategoryTree 컴포넌트
* **위치**: `src/components/CategoryTree.astro`
* **역할**: 마크다운 파일들의 Frontmatter 내 `tags` 정보를 파악하여, 태그별 폴더 트리를 동적으로 생성하고 아코디언 메뉴로 정렬합니다. 현재 활성화된 글은 하이라이트 표시됩니다.

### 📌 우측 사이드바: TableOfContents 컴포넌트
* **위치**: `src/components/TableOfContents.astro`
* **역할**: 마크다운 문서의 소제목(H2, H3)들을 추출하여 부드러운 스크롤링이 적용된 바로가기 목차를 노출합니다.

### 📊 중앙 영역: 메인 대시보드 (`src/pages/index.astro`)
* 첫 페이지도 상세 본문과 동일한 3단 뼈대를 공유합니다.
* 가운데 영역은 **최근 학습 노트**, **소프로젝트 진행바 위젯(Frontmatter 내 `completionRate: 수치`와 자동 게이지 연동)**, **관심사 카드 목록**이 3개 층의 위젯 레이아웃으로 출력됩니다.

### 👔 헤더 로고 정중앙 정렬 (`src/components/Header.astro`)
* `gksdydwn blog` 텍스트 로고가 화면 **정중앙**에 배치되고 스크롤 시 고정(Sticky)됩니다.
* 좌측 영역에 `[Home | Blog]` 바로가기가 오고, 우측에 `[GitHub 아이콘]`이 오도록 대칭형 CSS Grid가 탑재되어 있습니다.
* 비어있는 `About` 메뉴는 헤더 주석으로 숨겨져 있습니다.

---

## 🚀 다음 Claude AI 개발자에게 전하는 바
1. 블로그 스타일 및 비율을 추가로 손보고 싶다면 **`src/styles/global.css`**와 **`src/layouts/BlogPost.astro`**의 CSS 그리드를 열어 확인하세요.
2. 메인 화면 카드 위젯의 콘텐츠 로직을 수정하려면 **`src/pages/index.astro`**를 수정하세요.
3. 새로운 글을 작성하거나 테스트할 때는 마크다운 작성 후 로컬에서 `npm run build`로 유효성 에러가 발생하지 않는지 꼭 체크한 뒤, 깃허브 Pages에 푸시하여 배포하세요.
