import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  Description, Name, UserId, Username,
} from '../types/user-type';

const secret: string = process.env.API_SECRET_KEY!;

export type Payload = {
  rest: {
    id: UserId,
    username: Username,
    name: Name,
    description: Description,
    online: boolean
  },
  iat: number,
  exp: number,
  sub: 'user',
};

export async function tokenAuth(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<UserId | null> {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const payload: Payload = await jwt.verify(token, secret) as Payload;
      return payload.rest.id as UserId;
    } catch (e) {
      res.status(401).json({
        message: '인증된 회원이 아닙니다.',
      });
    }
  } else {
    res.status(401).json({
      message: '인증된 회원이 아닙니다.',
    });
  }
  return null;
}
