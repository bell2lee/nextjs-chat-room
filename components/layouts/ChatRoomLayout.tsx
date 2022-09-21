import { ChangeEvent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { BorderButton, Button, TextInput } from '../../styles/forms';
import { ChatRoomProps } from '../../types/chat-type';
import ChatList from './ChatList';

export default function ChatRoomLayout({
  children,
  chats,
  searchKeyword,
  onSearchChange,
  onSearch,
  onLogout,
  onNewMessage,
}: PropsWithChildren<{
  chats: ChatRoomProps[],
  searchKeyword: string,
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSearch: () => void,
  onLogout: () => void,
  onNewMessage: () => void,
}>) {
  return (
    <Layout>
      <Aside>
        <ChatRoomHeader>
          <h2>
            읽지 않은 대화
            (
            {chats.filter((c) => Boolean(c.notRead)).length}
            )
          </h2>
          <Button onClick={onNewMessage}>새로운 메시지</Button>
        </ChatRoomHeader>

        <SearchBox>
          <TextInput
            placeholder="대화 검색하기"
            onChange={onSearchChange}
            onKeyPress={(e) => e.code === 'Enter' && onSearch()}
            value={searchKeyword}
          />
        </SearchBox>
        <div>
          <ChatList chats={chats} />
        </div>
      </Aside>
      <Content>
        <ContentHeader>
          <BorderButton
            onClick={onLogout}
          >
            로그아웃
          </BorderButton>
        </ContentHeader>
        {children}
      </Content>
    </Layout>
  );
}

const Layout = styled.div`
  width:1280px;
  background:#fff;
  box-shadow: 0 0 24px rgba(0,0,0,.3);
  margin:0 auto;
  height:100vh;
  display:flex;
`;

const Aside = styled.aside`
  width:360px;
  border-right:1px solid #ddd;
`;

const ContentHeader = styled.header`
  padding:14px;
`;

const ChatRoomHeader = styled.header`
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding:14px;
  h2 {
    font-size:18px;
    padding:0;
    margin:0;
  }
`;

const Content = styled.main`
  flex:1;
  position:relative;
`;

const SearchBox = styled.div`
  padding:14px;
`;
