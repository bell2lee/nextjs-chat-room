import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { ChatRoomProps } from '../../types/chat-type';
import ChatItem from './ChatItem';

export default function ChatList({ chats }: PropsWithChildren<{
  chats: ChatRoomProps[],
}>) {
  const router = useRouter();
  return (
    <List>
      {chats.map((chat) => (
        <ChatItem
          chat={chat}
          key={`chatroom-${chat.id}`}
          onClick={() => router.push(`/chats/${chat.id}`)}
        />
      ))}
      <div />
    </List>
  );
}

const List = styled.div`
  display:flex;
  flex-direction: column;
`;
