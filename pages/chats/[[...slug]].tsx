import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ChatRoomLayout from '../../components/layouts/ChatRoomLayout';
import { Chat } from '../../types/chat-type';
import { set } from '../../utils/state-util';
import Conversation from '../../components/Conversation';
import useToken from '../../hooks/use-token';

export default function ChatRoom() {
  const {
    router,
    cookies,
    setCookie,
    removeCookie,
  } = useToken();
  const { slug } = router.query;
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [chats, setChats] = useState<Chat[]>([]);
  setTimeout(() => {
    setChats([{
      id: 'test',
      thumbnail: 'https://images.unsplash.com/photo-1662581871625-7dbd3ac1ca18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80',
      notRead: 1,
      name: '이종휘',
      description: 'ㅇㄹㄹㅇㄹㅇㄹㅇㄹㅇ',
      lastDateTime: new Date(),
      active: true,
    }, {
      id: 'test2',
      thumbnail: 'https://images.unsplash.com/photo-1662581871625-7dbd3ac1ca18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80',
      notRead: 0,
      name: '이종휘',
      description: 'ㅇㄹㄹㅇㄹㅇㄹㅇㄹㅇ',
      lastDateTime: new Date(),
    }, {
      id: 'test3',
      thumbnail: 'https://images.unsplash.com/photo-1662581871625-7dbd3ac1ca18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80',
      notRead: 20,
      name: '이종휘',
      description: 'ㅇㄹㄹㅇㄹㅇㄹㅇㄹㅇ',
      lastDateTime: new Date(),
    }]);
  }, 1000);
  const onSearch = () => {
    console.log(searchKeyword);
  };
  const onLogout = () => removeCookie('chatToken');

  useEffect(() => {
    if (!cookies.chatToken) {
      router.push('/');
    }
  }, [cookies.chatToken]);

  return (
    <ChatRoomLayout
      chats={chats}
      searchKeyword={searchKeyword}
      onSearchChange={(e) => set(e, setSearchKeyword)}
      onSearch={onSearch}
      onLogout={onLogout}
    >
      {!slug && <div>대화 대상을 선택해주세요</div>}
      <Conversation />
    </ChatRoomLayout>
  );
}
