

# 기능 요구사항
- [x] 1:1 대화를 주고 받는 웹 어플리케이션을 작성해주시길 바랍니다.
- [x] 서버 구현은 되어 있다고 가정하고 진행하셔도 좋고 구현 가능하시면 편한 방법으로 구현하셔도 됩니다.
- [x] 화면은 이미지 를 참고로 하여 작성해주시길 바랍니다. (화면의 모든 기능이 꼭 존재할 필요는 없습니다.)
- [x] 대화 상대별로 대화방이 나뉘어 있으며, 각 대화방끼리 이동할 수 있어야 합니다.
- [x] 메시지를 전송하고 서로 이 내용을 확인할 수 있어야 합니다.
- [x] React, TypeScript 로 작성해주시길 바랍니다.
- [x] Github, Bitbucket 등 접속 가능한 Git Remote Repository로 전달 바랍니다.

# Optional
- [x] Next.js로 SSR을 구현해주세요. (SEO 고려 등)
  - 각 페이지 타이블 변경
- [x] Responsive를 지원합니다.
- [x] 로그인, 로그아웃을 할 수 있습니다.
- [x] 비 로그인 사용자 앱 실행 시 로그인을 유도 합니다.
- [x] 새로운 메시지 버튼 클릭 후 새 대화방 생성 시 대화 상대 검색이 가능합니다.
- [x] 대화에 URL이 있는 경우 Clickable하게(실제로 동작) 출력합니다.
- [ ] 읽지 않은 메시지가 있는 경우 화면상 표기를 다르게 합니다.
- [x] Production 환경을 구축하여 동작 가능한 임의의 URL로 접속 할 수 있습니다.



## Getting Started

### create .env file
```dotenv
DATABASE_URL="mysql://id:pw@127.0.0.1:3306/dbname"
API_SECRET_KEY="secretkey"

```

### install package

```bash
npm install
# or
yarn install
```

### run for dev

```bash
npm run dev
# or
yarn dev
```
