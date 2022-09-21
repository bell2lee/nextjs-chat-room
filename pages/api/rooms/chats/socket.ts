import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';
import { NextApiResponseServerIO } from '../../../../types/chat-type';

export default async function ChatSocket(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (!res.socket.server.io) {
    console.log('new Socket');
    const httpServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: '/api/rooms/chats',
    });
    res.socket.server.io = io;
  }
  res.end();
}
