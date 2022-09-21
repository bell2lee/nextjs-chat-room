import styled from 'styled-components';
import {
  PropsWithChildren, useEffect, useRef, useState,
} from 'react';
import { connect } from 'socket.io-client';
import { ChatRoom, ChatRoomId } from '../../types/chat-type';
import { Button, TextInput } from '../../styles/forms';
import { sendMessage } from '../../apis/chat-api';
import useToken from '../../hooks/useToken';
import { set } from '../../utils/state-util';

export default function Conversation({
  chatRoom,
  onChangeRoom,
}: PropsWithChildren<{
  chatRoom: ChatRoom | null,
  onChangeRoom: (id: ChatRoomId) => void,
}>) {
  const { cookies } = useToken();
  const [, setConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const chatUl = useRef<HTMLUListElement | null>(null);
  const onSendMessage = async () => {
    if (message && chatRoom) {
      await sendMessage({
        message,
        roomId: chatRoom.id,
      }, cookies.chatToken);
      setMessage('');
    }
  };
  const scrollBottom = () => {
    chatUl.current!.scrollTop = chatUl.current!.scrollHeight;
  };

  useEffect(() => {
    if (chatRoom) {
      scrollBottom();
      const socket = connect('', {
        path: '/api/rooms/chats/socket',
      });
      socket.on('connect', () => {
        console.log('socket connected');
        setConnected(true);
      });

      socket.on('roomId', (roomId) => {
        if (roomId) {
          onChangeRoom(roomId);
        }
      });
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
    return () => {};
  }, [chatRoom]);

  return (
    <div>
      {chatRoom && (
      <div>
        <ConversationHeader>
          {chatRoom.participations.map((i) => i.user.name).join(', ')}
          의 채팅방
        </ConversationHeader>
        <ConversationContent
          ref={chatUl}
        >
          {chatRoom.chats.map((i) => (
            <ChatItem
              key={i.id}
            >
              <Author>
                {i.author!.name}
              </Author>
              <Message>
                {i.message}
              </Message>
            </ChatItem>
          ))}
        </ConversationContent>
        <MessageInputBox>
          <TextInput
            type="text"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => set(e, setMessage)}
            onKeyPress={(e) => e.code === 'Enter' && onSendMessage()}
          />
          <Button
            onClick={async () => {
              await onSendMessage();
              scrollBottom();
            }}
          >
            전송
          </Button>
        </MessageInputBox>
      </div>
      )}
    </div>
  );
}

const ConversationHeader = styled.header`
  padding:14px;
  border-bottom: 1px solid #ddd;
`;

const ConversationContent = styled.ul`
  padding:14px;
  display:flex;
  flex-direction: column;
  gap:14px;
  overflow:scroll;
  height:calc(100vh - 226px);
`;

const ChatItem = styled.li`
  list-style:none;
  display:flex;
  align-items: center;
  gap:16px;
`;

const Author = styled.div`
  
`;
const Message = styled.div`
  background:#ddd;
  padding:8px;
  display:inline-block;
  border-radius:12px;
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
