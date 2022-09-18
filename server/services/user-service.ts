import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import {
  CreateUserParams, Password, PublicUserEntity, Username,
} from '../../types/user-type';
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

export async function getUsers({
  limit = 30,
  skip = 0,
  keyword = null,
}: {
  limit: number,
  skip: number,
  keyword?: string | null,
}): Promise<PublicUserEntity[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      description: true,
      online: true,
    },
    take: limit,
    skip,
    where: {
      // ...keyword ? {
      //   name: {
      //     search: keyword,
      //   },
      // } : {},
    },
    orderBy: {
      id: 'desc',
    },
  });
  return users as PublicUserEntity[];
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
