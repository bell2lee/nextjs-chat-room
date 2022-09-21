import styled from 'styled-components';
import { PropsWithChildren, useEffect, useState } from 'react';
import { connect } from 'socket.io-client';
import { ChatRoom } from '../types/chat-type';
import { Button, TextInput } from '../styles/forms';
import { sendMessage } from '../apis/chat-api';
import useToken from '../hooks/useToken';
import { set } from '../utils/state-util';

export default function Conversation({
  chatRoom,
}: PropsWithChildren<{
  chatRoom: ChatRoom,
}>) {
  const { cookies } = useToken();
  const [connected, setConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const targetText = chatRoom.participations.map((i) => i.user.name).join(', ');

  const onSendMessage = () => {
    sendMessage({
      message,
      roomId: chatRoom.id,
    }, cookies.chatToken);
  };

  useEffect(() => {
    console.log('next', process.env.NEXT_PUBLIC_API_URL);
    const socket = connect('', {
      path: '/api/rooms/chats/socket',
    });
    socket.on('connect', () => {
      console.log('socket connected');
      setConnected(true);
    });

    // socket.on("message", () => {
    //   chat.push(message);
    //   setChat([...chat]);
    // });
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [chatRoom]);

  return (
    <div>
      <ConversationHeader>
        {targetText}
        의 채팅방
      </ConversationHeader>
      <ConversationContent>
        {chatRoom.chats.map((i) => (
          <ChatItem
            key={i.id}
          >
            {i.message}
          </ChatItem>
        ))}
      </ConversationContent>
      <MessageInputBox>
        <TextInput
          type="text"
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={(e) => set(e, setMessage)}
        />
        <Button
          onClick={onSendMessage}
        >
          전송
        </Button>
      </MessageInputBox>
    </div>
  );
}

const ConversationHeader = styled.header`
  padding:14px;
  border-bottom: 1px solid #ddd;
`;

const ConversationContent = styled.ul`

`;

const ChatItem = styled.li`

`;

const MessageInputBox = styled.div`
  display:flex;
  border-top:1px solid #ddd;
  position:absolute;
  bottom:0;
  right:0;
  left:0;
  padding:24px;
  gap:14px;
  > button {
    width:140px;
  }
`;
