import { NextApiRequest, NextApiResponse } from 'next';
import * as userService from '../../server/services/user-service';
import { TokenError } from '../../server/errors/token-error';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password } = req.body;
  try {
    const token = await userService.createToken({ username, password });
    res.status(201).json({
      token,
    });
  } catch (e: unknown | TokenError) {
    if (e instanceof TokenError) {
      res.status(e?.status).json({
        message: e.message,
      });
    } else {
      res.status(500).json({
        message: '서버 오류 발생',
      });
    }
  }
}
