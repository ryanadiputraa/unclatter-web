'use client';

import { useContext } from 'react';

import { AppContext } from '..';
import { JWTToken } from '../reducers/auth';

export const useAuthAction = () => {
  const { authDispatch } = useContext(AppContext);

  const setJWTToken = (jwt: JWTToken | null) => {
    authDispatch({ type: 'SET_JWT', data: jwt });
  };

  return { setJWTToken };
};
