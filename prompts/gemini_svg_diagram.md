# Gemini에게 블로그 다이어그램 SVG 요청하기

이 파일은 **Gemini에게 그대로 복사해 붙여넣는 용도**다.
아래 `---` 사이의 내용을 전부 복사해서 Gemini 대화창에 붙여넣으면 된다.

받은 결과는 `src/assets/diagrams/` 폴더에 지정된 파일명으로 저장하고,
마크다운에서 이렇게 참조한다.

```markdown
![설명](../../assets/diagrams/파일명.svg)
```

> **왜 "그림을 그려줘"가 아니라 "SVG 코드를 써줘"인가**
> 생성형 이미지 모델은 그림 안의 글자를 자주 뭉갠다(`git commit` → `git commlt`).
> SVG는 그림이 아니라 코드라서 글자가 정확하고, 나중에 색이나 문구를 직접 고칠 수 있으며,
> 확대해도 흐려지지 않고 파일도 3KB 안팎으로 가볍다.

---

## 여기서부터 복사

당신은 기술 블로그에 들어갈 설명용 다이어그램을 **SVG 코드로 직접 작성**하는 역할입니다.
이미지를 생성하지 말고, 반드시 텍스트로 된 SVG 마크업을 출력하세요.

### 출력 규격 (반드시 지킬 것)

1. 순수 SVG 마크업만 출력합니다. 외부 이미지, 웹폰트, 스크립트를 참조하지 마세요.
   (이 SVG는 `<img>` 태그로 삽입되므로 외부 리소스를 불러올 수 없습니다.)
2. 루트 태그에 `xmlns`, `viewBox`, `width`, `height`를 모두 명시하세요.
3. 가로 폭은 **560 이하**로 하세요. 본문 칸이 820px이고, 좁은 화면에서도 잘리면 안 됩니다.
4. 스타일은 `<defs><style>` 안에 **클래스로 정리**하세요. 인라인 style 남발 금지.
5. 접근성을 위해 루트에 `role="img"`와 **한국어 `aria-label`**을 넣으세요.
6. 텍스트는 실제 `<text>` 요소로 넣으세요. 글자를 path로 변환하지 마세요.
7. 배경은 투명하게 두세요. (흰색 카드 위에 올라갑니다)

### 색상 (블로그 팔레트에 맞출 것)

| 용도 | 값 |
| --- | --- |
| 강조색 | `#3b82f6` |
| 진한 강조색 | `#1d4ed8` |
| 본문 글자 | `#1f2937` |
| 보조 글자 | `#6b7280` |
| 상자 배경(파랑) | `#eff6ff` / 테두리 `#bfdbfe` |
| 상자 배경(회색) | `#f1f5f9` / 테두리 `#cbd5e1` |
| 선·화살표 | `#93a3b8` |

### 글꼴 (웹폰트 금지, 시스템 글꼴만)

```
한글·본문 : 'Pretendard','Malgun Gothic','Apple SD Gothic Neo',sans-serif
코드·영문 : 'Cascadia Mono',Consolas,monospace
```

### 참고 예시 (이 톤과 구조를 그대로 따를 것)

아래는 같은 블로그에서 이미 쓰고 있는 완성된 SVG입니다. **색, 글꼴, 상자 모양, 화살표 처리, 클래스 구성 방식을 그대로 맞춰 주세요.**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 404" width="560" height="404" role="img" aria-label="Git의 3단계 구조">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#93a3b8"/>
    </marker>
    <style>
      .box   { fill: #eff6ff; stroke: #bfdbfe; stroke-width: 1.5; }
      .box4  { fill: #f1f5f9; stroke: #cbd5e1; stroke-width: 1.5; }
      .num   { font: 700 13px 'Pretendard','Malgun Gothic','Apple SD Gothic Neo',sans-serif; fill: #3b82f6; }
      .name  { font: 700 16px 'Pretendard','Malgun Gothic','Apple SD Gothic Neo',sans-serif; fill: #1f2937; }
      .sub   { font: 400 12px 'Cascadia Mono',Consolas,monospace; fill: #6b7280; }
      .cmd   { font: 700 13px 'Cascadia Mono',Consolas,monospace; fill: #1d4ed8; }
      .note  { font: 400 12px 'Pretendard','Malgun Gothic','Apple SD Gothic Neo',sans-serif; fill: #6b7280; }
      .line  { stroke: #93a3b8; stroke-width: 1.5; }
    </style>
  </defs>

  <rect class="box" x="20" y="12" width="300" height="60" rx="8"/>
  <text class="num"  x="38" y="38">1</text>
  <text class="name" x="54" y="38">작업 폴더</text>
  <text class="sub"  x="54" y="58">Working Directory</text>

  <line class="line" x1="170" y1="72" x2="170" y2="106" marker-end="url(#arrow)"/>
  <text class="cmd"  x="188" y="88">git add</text>
  <text class="note" x="188" y="104">프레임 안에 불러 모으기</text>

  <rect class="box" x="20" y="122" width="300" height="60" rx="8"/>
  <text class="num"  x="38" y="148">2</text>
  <text class="name" x="54" y="148">스테이징 영역</text>
  <text class="sub"  x="54" y="168">Staging Area</text>
</svg>
```

### 만들어 주세요 — 3개

각각 **별도의 SVG**로, 파일명을 제목으로 달아 출력해 주세요.

---

#### ① `git-refs-map.svg` — 이름표 관계도

Git 로그에 찍히는 `(HEAD -> main, origin/main, origin/HEAD)`가 각각 무엇을 가리키는지 보여주는 그림.

담을 내용:

- 오른쪽에 **커밋 노드** 하나: `b536005` (원형 또는 알약 모양, 아래에 "실제 커밋 (변하지 않음)" 설명)
- 왼쪽 위에서 두 단계 화살표: `HEAD` → `main` → 커밋
  - `HEAD` 아래 작은 설명: "내가 선 곳"
  - `main` 아래 작은 설명: "내 브랜치"
- 왼쪽 아래에서 두 단계 화살표: `origin/HEAD` → `origin/main` → 커밋
  - `origin/HEAD` 아래 설명: "깃허브 기본 브랜치"
  - `origin/main` 아래 설명: "깃허브 사본"
- 핵심 메시지: **HEAD는 커밋을 직접 가리키지 않고 브랜치를 거쳐서 가리킨다.**
  그래서 `HEAD -> main`처럼 화살표가 붙고, `origin/main`은 커밋을 직접 가리킨다.
- 이름표 4개(`HEAD`, `main`, `origin/main`, `origin/HEAD`)는 코드 글꼴로,
  설명 문구는 한글 글꼴로 작게.

---

#### ② `git-head-chain.svg` — HEAD가 커밋까지 이어지는 사슬

`.git` 폴더 안에서 HEAD가 실제 커밋 해시까지 어떻게 연결되는지 3단계로 보여주는 그림.

담을 내용 (세로 흐름 권장):

1. 파일 `.git/HEAD` — 내용: `ref: refs/heads/main`
2. 파일 `.git/refs/heads/main` — 내용: `b536005...`
3. 실제 커밋 `b536005` — "여기서 끝"

- 1 → 2 → 3 으로 아래로 화살표
- 파일 이름은 코드 글꼴, 파일 안의 내용은 상자 안에 코드 글꼴로
- 1, 2는 "텍스트 파일 한 줄"임이 드러나게 (파일 모양이나 작은 라벨로)
- 3만 색을 다르게 해서 "최종 목적지"임을 표시

---

#### ③ `git-ahead-of-origin.svg` — 커밋했지만 아직 푸시 안 한 상태

로컬이 깃허브보다 한 커밋 앞서 있는 상황을 보여주는 그림.

담을 내용:

- 커밋 노드 2개를 세로로 (위가 최신)
  - 위: `a1b2c3d` — 오른쪽에 이름표 `HEAD -> main`, 설명 "내 컴퓨터에만 있음"
  - 아래: `b536005` — 오른쪽에 이름표 `origin/main`, 설명 "깃허브는 아직 여기"
- 두 커밋을 세로선으로 연결 (아래가 부모)
- 맨 아래에 터미널 출력 한 줄을 코드 글꼴로:
  `Your branch is ahead of 'origin/main' by 1 commit.`
- 위 커밋과 아래 커밋의 색을 달리해서 "아직 안 올라간 것"이 구분되게

---

### 마지막 확인 사항

- 한글이 상자 밖으로 삐져나오지 않도록 상자 폭을 넉넉히 잡으세요.
  (한글 한 글자는 대략 글자 크기만큼의 폭을 차지합니다. 16px 글꼴이면 한 글자 ≈ 16px)
- 텍스트 세로 위치는 `dominant-baseline`에 의존하지 말고 `y` 값으로 직접 맞추세요. 브라우저마다 다르게 나옵니다.
- 각 SVG는 독립적으로 동작해야 합니다. `<marker>` id가 겹치지 않도록 파일마다 다른 이름을 쓰세요.
  (예: `arrowA`, `arrowB`, `arrowC`)
- 출력은 파일마다 ` ```svg ` 코드블록으로 감싸고, 그 앞에 파일명을 적어 주세요.

## 여기까지 복사

---

## 받은 뒤 할 일

1. Gemini가 준 SVG 코드를 각각 `src/assets/diagrams/파일명.svg`로 저장
2. `npm run build`로 에러가 없는지 확인
3. 브라우저에서 열어 글자가 상자 밖으로 나가지 않았는지, 화살표가 제자리인지 확인
4. 마크다운의 기존 코드블록 다이어그램을 이미지 참조로 교체

문제가 있으면 그 부분만 다시 요청하면 된다. SVG는 텍스트라서 숫자 몇 개만 고쳐도 된다.
