import axios from 'axios';
import {
  CreateUserParams, Password, PublicUserEntity, Username,
} from '../types/user-type';
import { PaginationParams, PaginationResult } from '../types/common-type';

export async function signin(args: {
  username: Username,
  password: Password,
}): Promise<string> {
  const token = await axios.post('/api/tokens', args);
  return token.data.token;
}

export async function signup(args: CreateUserParams): Promise<string> {
  await axios.post('/api/users', args);
  const token = await signin({
    username: args.username,
    password: args.password,
  });
  return token;
}

export async function getMembers({
  limit = 30,
  skip = 0,
  keyword = null,
}: PaginationParams, token: string): Promise<PaginationResult<PublicUserEntity>> {
  const res = await axios.get('/api/users', {
    params: {
      limit,
      skip,
      keyword,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
