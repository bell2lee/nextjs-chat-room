export type Chat = {
  id: string,
  lastDateTime: Date,
  thumbnail: string,
  description: string,
  name: string,
  notRead: number,
  active?: boolean,
};
