import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  id: string | null;
  token: string | null;
  username: string | null;
  email: string | null;
  lastSignInTime: string | null;
}

const initialState: AuthUser = {
  id: null,
  token: null,
  username: null,
  email: null,
  lastSignInTime: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.lastSignInTime = action.payload.lastSignInTime;
    },
    removeUser: (state) => {
      state.id = null;
      state.token = null;
      state.username = null;
      state.email = null;
      state.lastSignInTime = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
