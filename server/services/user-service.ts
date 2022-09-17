import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { CreateUserParams, Password, Username } from '../../types/user-type';
import { TokenError } from '../errors/token-error';

const secret: string = process.env.API_SECRET_KEY!;

export async function setUserOnline(username: Username, online: boolean) {
  await prisma.user.update({
    where: { username },
    data: { online },
  });
}

export async function createUser({
  username, name, password, description,
}: CreateUserParams) {
  const encryptedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
  const user = await prisma.user.create({
    data: {
      username,
      name,
      password: encryptedPassword,
      description,
    },
  });
  return user;
}

export async function createToken(args: {
  username: Username,
  password: Password,
}): Promise<string> {
  const user = await prisma.user.findUnique({
    where: {
      username: args.username,
    },
  });
  if (!user) throw new TokenError('notFound', 404);
  if (!await bcrypt.compare(args.password, user.password)) throw new TokenError('passwordFail', 401);
  const { password, ...rest } = user;
  const token = jwt.sign({
    rest,
  }, secret, {
    expiresIn: '7d',
    subject: 'user',
  });
  await setUserOnline(args.username, true);
  return token;
}
