import { UserId } from '../../types/user-type';
import { ChatRoom, ChatRoomId } from '../../types/chat-type';
import prisma from '../prisma';

export async function createChatRoom(users: UserId[]) {
  const room = await prisma.chatRoom.create({ data: {} });
  await prisma.chatParticipation.createMany({
    data: [...new Set(users)].map((u) => ({
      roomId: room.id,
      userId: u,
    })),
  });

  return room;
}

export async function createChat(args: {
  roomId: ChatRoomId, message: string, token: string,
}) {
  return '';
}

export async function getRooms({
  limit = 30,
  skip = 0,
  keyword = null,
}: {
  limit: number,
  skip: number,
  keyword?: number | null,
}) {
  const rooms = await prisma.chatRoom.findMany({
    skip,
    take: limit,
    include: {
      chats: true,
      participations: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              description: true,
              online: true,
            },
          },
        },
      },
    },
  });

  return rooms;
}

export async function getRoom(roomId: ChatRoomId): Promise<ChatRoom | null> {
  const room = await prisma.chatRoom.findUnique({
    where: {
      id: roomId,
    },
    include: {
      chats: true,
      participations: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              description: true,
              online: true,
            },
          },
        },
      },
    },
  });
  return room as unknown as ChatRoom ?? null;
}

export async function createChatMessage({
  message,
  roomId,
}: {
  message: string,
  roomId: number,
}, userId: UserId): Promise<void> {
  await prisma.chat.create({
    data: {
      message,
      roomId,
      authorId: userId,
    },
  });
}
