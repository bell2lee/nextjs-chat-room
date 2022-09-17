import styled from 'styled-components';

export default function Conversation() {
  return (
    <div>
      <ConversationHeader>
        이름
        직책
      </ConversationHeader>

    </div>
  );
}

const ConversationHeader = styled.header`
  padding:14px;
  border-bottom: 1px solid #ddd;
`;
