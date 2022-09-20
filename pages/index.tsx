import { useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import {
  BorderButton, Button, Fields, Form, FormLayout, Label, TextInput,
} from '../styles/forms';
import { set } from '../utils/state-util';
import * as userApi from '../apis/user-api';
import { Password, Username } from '../types/user-type';
import useToken from '../hooks/useToken';

export default function Home() {
  const { router, setCookie } = useToken();
  const [username, setUsername] = useState<Username>('');
  const [password, setPassword] = useState<Password>('');
  const onLogin = async () => {
    try {
      const token = await userApi.signin({ username, password });
      toast.success('환영합니다.');
      setCookie('chatToken', token);
    } catch (e: unknown | AxiosError) {
      if (e instanceof AxiosError) {
        toast.error(e.response!.data.message);
      } else {
        toast.error('오류');
      }
    }
  };
  return (
    <FormLayout>
      <Form>
        <h1>안녕하세요. 메신저입니다.</h1>

        <Fields>
          <Label htmlFor="username">
            <div>아이디</div>
            <TextInput
              id="username"
              value={username}
              placeholder="paperlee"
              onChange={(e) => set(e, setUsername)}
            />
          </Label>

          <Label htmlFor="password">
            <div>패스워드</div>
            <TextInput
              id="password"
              value={password}
              placeholder="****"
              type="password"
              onChange={(e) => set(e, setPassword)}
            />
          </Label>
        </Fields>
        <Button onClick={onLogin}>로그인</Button>
        <BorderButton onClick={() => router.push('/signup')}>회원가입</BorderButton>
      </Form>
    </FormLayout>
  );
}
