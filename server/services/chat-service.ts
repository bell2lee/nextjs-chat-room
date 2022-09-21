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
  keyword?: string | null,
}, loginUserId: UserId) {
  const rooms = await prisma.chatRoom.findMany({
    skip,
    take: limit,
    where: {
      participations: {
        some: {
          AND: [
            {
              userId: loginUserId,
            },
            {
              user: {
                ...keyword ? {
                  name: {
                    endsWith: keyword,
                  },
                } : {},
              },
            },
          ],
        },
      },
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

  return rooms;
}

export async function getRoom(roomId: ChatRoomId): Promise<ChatRoom | null> {
  const userSelect = {
    select: {
      id: true,
      username: true,
      name: true,
      description: true,
      online: true,
    },
  };
  const room = await prisma.chatRoom.findUnique({
    where: {
      id: roomId,
    },
    include: {
      chats: {
        include: {
          author: userSelect,
        },
      },
      participations: {
        include: {
          user: userSelect,
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
