import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { Server as NetServer, Socket } from 'net';
import { PublicUserEntity } from './user-type';

export type ChatRoomId = number;

export type ChatRoomProps = {
  id: number,
  lastDateTime: Date,
  thumbnail: string,
  description: string,
  name: string,
  notRead: number,
  active?: boolean,
};

export type Chat = {
  id: number,
  createAt: string,
  deleted: boolean,
  message: string,
  author?: PublicUserEntity,
};

export type ChatRoom = {
  id: number,
  chats: Chat[],
  participations: {
    id: number,
    createAt: string,
    roomId: number,
    userId: number,
    user: PublicUserEntity,
  }[],
};

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
