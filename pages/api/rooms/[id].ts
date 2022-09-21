import { NextApiRequest, NextApiResponse } from 'next';
import { tokenAuth } from '../../../utils/token-util';
import * as chatService from '../../../server/services/chat-service';
import { getRoom } from '../../../server/services/chat-service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await tokenAuth(req, res);
  const roomId = Number(req.query.id);
  if (user) {
    const room = await chatService.getRoom(roomId);
    res.status(200).json(room);
  }
}
