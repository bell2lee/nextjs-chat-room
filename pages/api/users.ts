import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as userService from '../../server/services/user-service';

type Data = {
  id: number,
  username: string,
  name: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { password, ...user } = await userService.createUser(req.body);
    res.status(200).json(user);
  } catch (e: unknown | PrismaClientKnownRequestError) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        res.status(400).json({ message: 'username이 이미 존재합니다.' });
      }
    } else {
      res.status(500).json({ message: 'server error' });
    }
  }
}
