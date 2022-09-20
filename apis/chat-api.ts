import axios from 'axios';
import { UserId } from '../types/user-type';

// eslint-disable-next-line import/prefer-default-export
export async function createChatRoom(target: UserId[], token: string) {
  await axios.post('/api/rooms', {
    users: target,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
