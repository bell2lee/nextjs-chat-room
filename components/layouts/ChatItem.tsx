import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ChatRoomProps } from '../../types/chat-type';

export default function ChatItem({ chat, onClick }: PropsWithChildren<{
  chat: ChatRoomProps,
  onClick: () => void,
}>) {
  return (
    <ItemRoot active={chat.active} read={Boolean(chat.notRead)} onClick={onClick}>
      <Thumbnail url={chat.thumbnail} />
      <Summary>
        <Header>
          <Name>
            {chat.name}
            {/* {Boolean(chat.notRead) && `(${chat.notRead})`} */}
          </Name>
          <Dot />
          <div>{chat.lastDateTime.toDateString()}</div>
        </Header>
        <Description>
          {chat.description}
        </Description>
      </Summary>
    </ItemRoot>
  );
}

const ItemRoot = styled.div<{ active?: boolean, read?: boolean }>`
  display:flex;
  gap:14px;
  align-items: center;
  padding:14px 12px;
  border-bottom:1px solid #ddd;
  border-left:2px solid ${({ active }) => (active ? '#0038FF' : 'transparent')};
  background:${({ read }) => (!read ? '#f3f3f3' : '#fff')};
  &:first-child {
    border-top:1px solid #ddd;
  }
  
  &:hover {
  }
  
  cursor:pointer;
`;

const Summary = styled.div`
  display:flex;
  flex-direction: column;
  gap:6px;
  width:70%;
`;

const Thumbnail = styled.div<{ url: string }>`
  background:url('${({ url }) => url}') center center;
  width:52px;
  height:52px;
  background-size: cover;
  border-radius:26px;
`;

const Header = styled.div`
  display:flex;
  gap:6px;
  align-items: center;
`;

const Name = styled.div`
  font-size:16px;
  font-weight:bold;
`;

const Dot = styled.div`
  width:4px;
  height:4px;
  background:#ddd;
  border-radius:2px;
`;

const Description = styled.div`
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-wrap:break-word;
`;
