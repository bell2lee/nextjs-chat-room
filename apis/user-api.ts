import axios from 'axios';
import { CreateUserParams, Password, Username } from '../types/user-type';

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
