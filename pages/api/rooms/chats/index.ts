import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../../../types/chat-type';
import * as chatService from '../../../../server/services/chat-service';
import { tokenAuth } from '../../../../utils/token-util';

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const user = await tokenAuth(req, res);
  const { message, roomId } = req.body;
  if (req.method === 'POST' && user && message && roomId) {
    await chatService.createChatMessage({
      message: String(message),
      roomId: Number(roomId),
    }, user);
    res.socket.server.io.emit('message', message);
    res.status(201).json(message);
  }
};
