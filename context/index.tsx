'use client';

import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';

import { AUTH_LS_KEY } from '@/utils/constant';
import { AuthAction, authReducer, AuthState, JWTToken } from './reducers/auth';
import { MainAction, mainReducer, MainState } from './reducers/main';

interface InitialState {
  main: MainState;
  auth: AuthState;
}

const tokenString = typeof window !== 'undefined' ? window?.localStorage.getItem(AUTH_LS_KEY) : null;
const token: JWTToken = JSON.parse(tokenString ?? '{}');

const initialState: InitialState = {
  main: {
    toast: {
      isOpen: false,
      type: 'info',
      message: '',
    },
  },
  auth: {
    jwt: tokenString ? token : null,
  },
};

const AppContext = createContext<{
  main: MainState;
  mainDispatch: Dispatch<MainAction>;
  auth: AuthState;
  authDispatch: Dispatch<AuthAction>;
}>({
  main: initialState.main,
  mainDispatch: () => null,
  auth: initialState.auth,
  authDispatch: () => null,
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mainState, mainDispatch] = useReducer(
    (main: MainState, action: MainAction) => mainReducer(main, action),
    initialState.main
  );
  const [authState, authDispatch] = useReducer(
    (auth: AuthState, action: AuthAction) => authReducer(auth, action),
    initialState.auth
  );

  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          main: mainState,
          mainDispatch: mainDispatch,
          auth: authState,
          authDispatch: authDispatch,
        }),
        [mainState, mainDispatch]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
