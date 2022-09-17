import { NextApiRequest, NextApiResponse } from 'next';
import * as chatService from '../../../server/services/chat-service';
import { tokenAuth } from '../../../utils/token-util';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = await tokenAuth(req, res);
  if (user) {
    if (req.method === 'POST') {
      const room = await chatService.createChatRoom([...req.body.users, user]);
      res.status(201).json(room);
    } else if (req.method === 'GET') {
      const { limit = 30, skip = 0, keyword = null } = req.query;
      const rooms = await chatService.getRooms({
        limit: Number(limit), skip: Number(skip), keyword: Number(keyword),
      });
      res.status(200).json(rooms);
    }
  }
}
