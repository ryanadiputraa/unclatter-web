export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'SET_JWT':
      return {
        ...state,
        jwt: action.data,
      };

    default:
      return { ...state };
  }
};

export interface JWTToken {
  access_token: string;
  expires_at: string;
}

export interface AuthState {
  jwt: JWTToken | null;
}

export type AuthAction = { type: 'SET_JWT'; data: JWTToken | null };
