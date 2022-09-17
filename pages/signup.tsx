import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import {
  Button, Fields, Form, FormLayout, Label, TextInput,
} from '../styles/forms';
import * as userApi from '../apis/user-api';
import {
  CreateUserParams, Password,
} from '../types/user-type';
import useToken from '../hooks/use-token';

type FieldName = 'username' | 'name' | 'password' | 'rePassword' | 'description';
type UserFields = CreateUserParams & {
  rePassword: Password,
};

export default function Signup() {
  const { setCookie } = useToken();
  const [user, setUser] = useState<UserFields>({
    username: '',
    name: '',
    password: '',
    rePassword: '',
    description: '',
  });
  const setField = (field: FieldName, e: ChangeEvent<HTMLInputElement>) => setUser((state) => ({
    ...state,
    [field]: e.target.value,
  }));

  const onSubmit = async () => {
    if (Object.entries(user).filter(([, v]) => v).length !== 5) toast.error('모든 필드를 채워주세요.');
    else if (user.password !== user.rePassword) toast.error('패스워드, 패스워드 확인이 일치하지 않습니다.');
    else {
      const { rePassword, ...params } = user;
      await toast.promise(userApi.signup(params), {
        pending: '전송중입니다!',
        error: {
          render({ data }) {
            return data.response?.data?.message || '오류 발생';
          },
        },
        success: {
          render({ data }) {
            setCookie('chatToken', data);
            return '회원가입 되었습니다.';
          },
        },
      });
    }
  };

  return (
    <FormLayout>
      <Form>
        <Fields>
          <Label htmlFor="username">
            <div>아이디</div>
            <TextInput
              id="username"
              value={user.username}
              placeholder="paperlee"
              onChange={(e) => setField('username', e)}
            />
          </Label>

          <Label htmlFor="password">
            <div>패스워드</div>
            <TextInput
              id="password"
              value={user.password}
              placeholder="****"
              type="password"
              onChange={(e) => setField('password', e)}
            />
          </Label>

          <Label htmlFor="rePassword">
            <div>패스워드 확인</div>
            <TextInput
              id="rePassword"
              type="password"
              value={user.rePassword}
              placeholder="****"
              onChange={(e) => setField('rePassword', e)}
            />
          </Label>

          <Label htmlFor="name">
            <div>이름</div>
            <TextInput
              id="name"
              value={user.name}
              placeholder="이종휘"
              onChange={(e) => setField('name', e)}
            />
          </Label>

          <Label htmlFor="description">
            <div>자기소개</div>
            <TextInput
              id="description"
              value={user.description}
              placeholder="개발자"
              onChange={(e) => setField('description', e)}
            />
          </Label>
        </Fields>
        <ButtonGroup>
          <Button onClick={onSubmit}>회원가입</Button>
        </ButtonGroup>
      </Form>
    </FormLayout>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top:24px;
`;
