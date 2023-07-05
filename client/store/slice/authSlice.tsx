import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export interface IUserInfo {
  id: number;
  email: string;
  token: string;
}

interface AuthState {
  userInfo: IUserInfo | null;
}

const cookies = parseCookies();
const storedUserInfo = cookies.userInfo;

const initialState: AuthState = {
  userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserInfo | null>) => {
      state.userInfo = action.payload;
      if (action.payload !== null) {
        setCookie(null, 'userInfo', JSON.stringify(action.payload), {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/', // cookie is accessible from all paths
        });
      } else {
        destroyCookie(null, 'userInfo', { path: '/' });
      }
    },
    logout: (state) => {
      state.userInfo = null;
      destroyCookie(null, 'userInfo', { path: '/' });
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;