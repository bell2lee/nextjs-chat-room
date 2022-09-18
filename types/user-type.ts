export type UserId = number;
export type Username = string;
export type Name = string;
export type Password = string;
export type Description = string;

export type CreateUserParams = {
  username: Username,
  name: Name,
  password: Password,
  description?: Description,
};

export type PublicUserEntity = {
  id: UserId,
  username: Username,
  name: Name,
  description: Description,
  online: boolean
};

export type CodeLabelUserEntity = PublicUserEntity & {
  Password: Password,
};
