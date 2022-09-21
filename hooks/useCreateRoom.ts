import { useState } from 'react';
import { toast } from 'react-toastify';
import * as userApi from '../apis/user-api';
import { PublicUserEntity } from '../types/user-type';
import useToken from './useToken';
import { createChatRoom } from '../apis/chat-api';

export default function useCreateRoom() {
  const {
    cookies,
  } = useToken();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<PublicUserEntity[]>([]);
  const [selectUsers, setSelectUsers] = useState<PublicUserEntity[]>([]);
  const [userSearchInput, setUserSearchInput] = useState<string>('');
  const onUserSearch = async () => {
    const userResults = await userApi.getMembers({
      limit: 30,
      skip: 0,
      keyword: userSearchInput,
    }, cookies.chatToken);
    setSearchUser(userResults.results);
  };

  const onAddUser = (user: PublicUserEntity) => {
    if (!selectUsers.find((i) => i.id === user.id)) {
      setSelectUsers((state) => [...state, user]);
    }
  };

  const onDeleteUser = (user: PublicUserEntity) => setSelectUsers(
    (users) => users.filter((u) => user.id !== u.id),
  );
  const onCloseModal = () => {
    setSelectUsers([]);
    setSearchUser([]);
    setIsOpen(false);
  };

  const createRoom = async (callback?: () => void) => {
    const promise = createChatRoom(selectUsers.map((i) => i.id), cookies.chatToken);
    await toast.promise(promise, {
      pending: '채팅방을 만드는 중입니다.',
      error: '채팅방 생성 실패',
      success: {
        render() {
          if (callback) callback();
          onCloseModal();
          return '채팅방을 만들었어요.';
        },
      },
    });
  };

  return {
    searchUser,
    isOpen,
    userSearchInput,
    selectUsers,
    setSelectUsers,
    setSearchUser,
    setUserSearchInput,
    setIsOpen,
    onUserSearch,
    onAddUser,
    onDeleteUser,
    onCloseModal,
    createRoom,
  };
}
