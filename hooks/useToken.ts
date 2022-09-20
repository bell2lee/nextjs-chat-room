import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

export default function useToken() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['chatToken']);

  useEffect(() => {
    if (cookies.chatToken) {
      router.push('/chats');
    }
  }, [cookies.chatToken]);

  return {
    router,
    cookies,
    setCookie,
    removeCookie,
  };
}
