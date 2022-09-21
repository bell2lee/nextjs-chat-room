import axios from 'axios';
import { UserId } from '../types/user-type';
import { ChatRoom } from '../types/chat-type';

export async function createChatRoom(target: UserId[], token: string) {
  await axios.post('/api/rooms', {
    users: target,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getChatRooms(token: string): Promise<ChatRoom[]> {
  const res = await axios.get('/api/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
