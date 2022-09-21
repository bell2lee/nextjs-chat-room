import axios from 'axios';
import { UserId } from '../types/user-type';
import { ChatRoom, ChatRoomId } from '../types/chat-type';

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

export async function getChatRoom(id: ChatRoomId, token: string): Promise<ChatRoom> {
  const res = await axios.get(`/api/rooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function sendMessage(args: {
  roomId: ChatRoomId,
  message: string,
}, token: string): Promise<void> {
  await axios.post('/api/rooms/chats', args, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
