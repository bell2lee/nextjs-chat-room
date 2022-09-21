import { NextApiRequest, NextApiResponse } from 'next';
import { tokenAuth } from '../../../utils/token-util';
import * as chatService from '../../../server/services/chat-service';

// TODO : 채팅방을 토큰인증을 통해 가져오도록 취약점 개선 해야함.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await tokenAuth(req, res);
  const roomId = Number(req.query.id);
  if (user) {
    const room = await chatService.getRoom(roomId);
    res.status(room ? 200 : 404).json(room);
  }
}
