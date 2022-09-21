import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Head from 'next/head';
import ChatRoomLayout from '../../components/layouts/ChatRoomLayout';
import { ChatRoom, ChatRoomId, ChatRoomProps } from '../../types/chat-type';
import { set } from '../../utils/state-util';
import Conversation from '../../components/stateful/Conversation';
import useToken from '../../hooks/useToken';
import useCreateRoom from '../../hooks/useCreateRoom';
import CreateRoomModal from '../../components/CreateRoomModal';
import { getChatRoom, getChatRooms } from '../../apis/chat-api';

const roomToRoomProps = (room: ChatRoom) => ({
  id: room.id,
  name: room.participations.map((i) => i.user.name).join(', '),
  description: room.chats.length
    ? room.chats[room.chats.length - 1].message
    : '마지막 메시지가 없습니다.',
  lastDateTime: new Date(),
  active: false,
  thumbnail: 'https://images.unsplash.com/photo-1662581871625-7dbd3ac1ca18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80',
  notRead: 1,
});

export default function ChatRoomPage() {
  const {
    router,
    cookies,
    removeCookie,
  } = useToken();
  const {
    searchUser,
    userSearchInput,
    isOpen,
    selectUsers,
    createRoom,
    setIsOpen,
    setUserSearchInput,
    onAddUser,
    onDeleteUser,
    onUserSearch,
    onCloseModal,
  } = useCreateRoom();

  const [chats, setChats] = useState<ChatRoomProps[]>([]);
  const [selectChatRoom, setSelectChatRoom] = useState<ChatRoom | null>();
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const updateChatRoom = () => {
    // TODO : 페이지네이션이 가능하도록 변경
    getChatRooms({
      limit: 100,
      skip: 0,
      keyword: searchKeyword,
    }, cookies.chatToken).then((chatRooms) => {
      setChats(chatRooms.map(roomToRoomProps));
    });
  };
  const updateSelectChatRoom = (roomId: ChatRoomId) => getChatRoom(roomId, cookies.chatToken)
    .then((chatRoom) => {
      setSelectChatRoom(chatRoom);
      return chatRoom;
    })
    .catch(() => toast.error('대화를 가져오지 못했습니다.'));

  const onSearch = () => {
    updateChatRoom();
  };

  const onChangeRoom = (id: ChatRoomId) => {
    const updateTargetIndex = chats.findIndex((i) => i.id === id);
    if (updateTargetIndex >= 0) {
      updateChatRoom();
    }
    if (selectChatRoom?.id === id) {
      updateSelectChatRoom(id);
    }
  };

  useEffect(() => {
    updateChatRoom();
  }, []);

  useEffect(() => {
    if (!cookies.chatToken) {
      router.push('/');
    }
  }, [cookies.chatToken, router]);

  useEffect(() => {
    if (router.query.slug) {
      const roomId = Number(router.query.slug[0]);
      setChats((state) => state.map((i) => ({
        ...i,
        active: roomId === i.id,
      })));
      updateSelectChatRoom(roomId).catch();
    }
  }, [router.query.slug]);

  return (
    <ChatRoomLayout
      chats={chats}
      searchKeyword={searchKeyword}
      onSearchChange={(e) => set(e, setSearchKeyword)}
      onSearch={onSearch}
      onLogout={() => removeCookie('chatToken')}
      onNewMessage={() => setIsOpen(true)}
    >
      <Head>
        <title>
          {selectChatRoom ? selectChatRoom.participations.map((i) => i.user.name).join(', ') : '대화상대를 선택해주세요'}
          - 메신저
        </title>
      </Head>
      {!router.query.slug && <div>대화 대상을 선택해주세요</div>}
      <Conversation
        chatRoom={selectChatRoom ?? null}
        onChangeRoom={onChangeRoom}
      />

      <CreateRoomModal
        createRoom={() => createRoom(updateChatRoom)}
        selectUsers={selectUsers}
        onAddUser={onAddUser}
        searchUser={searchUser}
        userSearchInput={userSearchInput}
        setUserSearchInput={setUserSearchInput}
        onUserSearch={onUserSearch}
        onDeleteUser={onDeleteUser}
        isOpen={isOpen}
        closeModal={onCloseModal}
      />
    </ChatRoomLayout>
  );
}
