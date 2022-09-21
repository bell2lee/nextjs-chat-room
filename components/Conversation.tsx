import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { PublicUserEntity } from '../types/user-type';
import { ChatRoom } from '../types/chat-type';

export default function Conversation({
  chatRoom,
}: PropsWithChildren<{
  chatRoom: ChatRoom,
}>) {
  const targetText = chatRoom.participations.map((i) => i.user.name).join(', ');
  console.log(targetText);
  return (
    <div>
      <ConversationHeader>
        {targetText}
      </ConversationHeader>
    </div>
  );
}

const ConversationHeader = styled.header`
  padding:14px;
  border-bottom: 1px solid #ddd;
`;
