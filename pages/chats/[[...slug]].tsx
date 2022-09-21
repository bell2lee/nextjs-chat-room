import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ChatRoomLayout from '../../components/layouts/ChatRoomLayout';
import { ChatRoom, ChatRoomProps } from '../../types/chat-type';
import { set } from '../../utils/state-util';
import Conversation from '../../components/Conversation';
import useToken from '../../hooks/useToken';
import useCreateRoom from '../../hooks/useCreateRoom';
import CreateRoomModal from '../../components/CreateRoomModal';
import { getChatRoom, getChatRooms } from '../../apis/chat-api';

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

  const { slug } = router.query;
  const [chats, setChats] = useState<ChatRoomProps[]>([]);
  const [selectChatRoom, setSelectChatRoom] = useState<ChatRoom | null>();
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const updateChatRoom = () => {
    getChatRooms(cookies.chatToken).then((chatRooms) => {
      setChats(chatRooms.map((room) => ({
        id: room.id,
        name: room.participations.map((i) => i.user.name).join(', '),
        description: '마지막 메시지',
        lastDateTime: new Date(),
        active: false,
        thumbnail: 'https://images.unsplash.com/photo-1662581871625-7dbd3ac1ca18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80',
        notRead: 1,
      })));
    });
  };

  const onSearch = () => {
    console.log(searchKeyword);
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
      getChatRoom(roomId, cookies.chatToken)
        .then((chatRoom) => setSelectChatRoom(chatRoom))
        .catch(() => toast.error('대화를 가져오지 못했습니다.'));
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
      {!slug && <div>대화 대상을 선택해주세요</div>}
      {selectChatRoom && (
      <Conversation
        chatRoom={selectChatRoom}
      />
      )}

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
