import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { ChatRoomProps } from '../../types/chat-type';
import ChatItem from './ChatItem';

export default function ChatList({ chats, setMenuOpen }: PropsWithChildren<{
  chats: ChatRoomProps[],
  setMenuOpen: (isOpen: boolean) => void,
}>) {
  const router = useRouter();
  return (
    <List>
      {chats.map((chat) => (
        <ChatItem
          chat={chat}
          key={`chatroom-${chat.id}`}
          onClick={() => {
            setMenuOpen(false);
            router.push(`/chats/${chat.id}`, `/chats/${chat.id}`);
          }}
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
