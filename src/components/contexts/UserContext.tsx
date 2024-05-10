import { useQueryClient } from '@tanstack/react-query';
import request from 'graphql-request';
import Cookies from 'js-cookie';
import { ReactNode, createContext, useEffect, useState } from 'react';
import loginEmailMutation from '../../queries/LoginEmail';
import loginPhoneCodeMutation from '../../queries/LoginPhoneCode';

export interface UserContext {
  token: string;
  login: (email: string, password: string) => void;
  loginPhone: (phone: string, code: string) => void;
  logout: () => void;
};

const defaultUser: UserContext = {
  token: '',
  login: () => null,
  loginPhone: () => null,
  logout: () => null,
};

export const UserContext = createContext<UserContext>(defaultUser);

interface UserProviderProps {
  children?: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [token, setToken] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    const savedCookie = Cookies.get('token') + '';
    if (savedCookie) {
      setToken(savedCookie);
    }
  }, []);

  useEffect(() => {
    Cookies.set('token', token);
  }, [token]);

  async function login(email: string, password: string) {
    queryClient.invalidateQueries({ queryKey: ['profile'] });

    const payload = await request(
      'http://localhost:8080/',
      loginEmailMutation,
      { email: email, password: password },
    );

    setToken(payload.loginEmail.token);

    return payload;
  }

  async function loginPhone(phone: string, code: string) {
    queryClient.invalidateQueries({ queryKey: ['profile'] });

    const payload = await request(
      'http://localhost:8080/',
      loginPhoneCodeMutation,
      { phone, code },
    );

    setToken(payload.loginPhoneCode.token);

    return payload;
  }

  function logout() {
    setToken('');
  }

  const valueObj = {
    token,
    login,
    loginPhone,
    logout,
  };

  return (
    <UserContext.Provider value={valueObj}>{children}</UserContext.Provider>
  );
}
