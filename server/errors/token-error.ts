export type TokenErrorCode = 'notFound' | 'passwordFail';
const TokenErrorMessage: { [code in TokenErrorCode]: string } = {
  notFound: '회원이 존재하지 않습니다',
  passwordFail: '패스워드가 일치하지 않습니다.',
};

export class TokenError extends Error {
  constructor(
    public code: TokenErrorCode,
    public status: number,
  ) {
    super(TokenErrorMessage[code]);
  }
}
