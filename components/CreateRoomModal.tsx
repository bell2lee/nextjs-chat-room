import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { BorderButton, Button, TextInput } from '../styles/forms';
import { set } from '../utils/state-util';
import { PublicUserEntity } from '../types/user-type';

export default function CreateRoomModal({
  searchUser,
  userSearchInput,
  isOpen,
  selectUsers,
  closeModal,
  createRoom,
  onAddUser,
  onUserSearch,
  onDeleteUser,
  setUserSearchInput,
}: PropsWithChildren<{
  selectUsers: PublicUserEntity[],
  searchUser: PublicUserEntity[],
  userSearchInput: string,
  isOpen: boolean,
  closeModal: () => void,
  createRoom: () => void,
  onAddUser: (user: PublicUserEntity) => void,
  onDeleteUser: (user: PublicUserEntity) => void,
  onUserSearch: () => void,
  setUserSearchInput: (arg: string) => void,
}>) {
  return (
    <div>
      {isOpen && (
      <div>
        <ModalBg onClick={closeModal} />
        <ModalContent>
          <SearchBox>
            <TextInput
              value={userSearchInput}
              onChange={(e) => set(e, setUserSearchInput)}
              onKeyDown={(e) => e.code === 'Enter' && onUserSearch()}
            />
            <Button
              onClick={onUserSearch}
            >
              검색
            </Button>
          </SearchBox>
          <div className="select-user">
            선택 :
            {selectUsers.map((i) => (
              <div
                key={`select-user-${i.id}`}
                className="user"
              >
                {i.name}
                (
                {i.username}
                )
                <BorderButton
                  onClick={() => onDeleteUser(i)}
                >
                  취소
                </BorderButton>
              </div>
            ))}
          </div>
          <UserList>
            {searchUser.map((i) => (
              <User
                key={i.id}
              >
                <div className="user-data">
                  <div>
                    이름(아이디) :
                    {i.name}
                    (
                    {i.username}
                    )
                  </div>
                  <div className="description">
                    소개 :
                    {i.description}
                  </div>
                </div>
                <BorderButton
                  onClick={() => onAddUser(i)}
                >
                  추가
                </BorderButton>
              </User>
            ))}
          </UserList>
          <Button onClick={createRoom}>
            대화방 만들기
          </Button>
        </ModalContent>
      </div>
      )}
    </div>
  );
}

const UserList = styled.div`
  display:flex;
  flex-direction: column;
  gap:6px;
  border:1px solid #ddd;
`;

const User = styled.div`
  padding:14px;
  gap:4px;
  display:flex;
  justify-content: space-between;
  .description {
    color:#333;
  }
  .user-data {
    display:flex;
    flex-direction: column;
  }
`;

const ModalBg = styled.div`
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  top:0;
  z-index:10;
  background:rgba(255, 255, 255, .3);
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  position:fixed;
  width:460px;
  height:460px;
  box-sizing: border-box;
  padding:24px;
  left:50%;
  margin-left:-230px;
  top:50%;
  margin-top:-230px;
  z-index:10;
  background:#fff;
  box-shadow:0 0 24px rgba(0,0,0, .2);
  
  .select-user {
    padding:14px 0;
    display:flex;
    .user {
      padding-left:14px;
      border:1px solid #ddd;
      border-radius:14px;
    }
  }
`;

const SearchBox = styled.div`
  display:flex;
  gap:16px;
  > button {
    width:120px;
  }
`;
