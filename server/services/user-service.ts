import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import {
  CreateUserParams, Password, PublicUserEntity, UserId, Username,
} from '../../types/user-type';
import { TokenError } from '../errors/token-error';
import { PaginationParams, PaginationResult } from '../../types/common-type';

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
  loginUserId,
}: PaginationParams & { loginUserId: UserId }): Promise<
  PaginationResult<PublicUserEntity>
  > {
  const condition = {
    where: {
      id: {
        not: loginUserId,
      },
      ...keyword ? {
        name: {
          endsWith: keyword,
        },
      } : {},
    },
  };
  const countUsers = await prisma.user.count({
    ...condition,
  });

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
    ...condition,
    orderBy: {
      id: 'desc',
    },
  });
  return {
    count: countUsers,
    results: users as PublicUserEntity[],
  };
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
