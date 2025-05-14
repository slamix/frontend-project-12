/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: localStorage.getItem('username') || null,
    token: localStorage.getItem('token') || null,
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogIn: (state, { payload }) => {
      const { username, token } = payload;
      state.user = { username, token };
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    },
    userLogOut: (state) => {
      state.user.username = null;
      state.user.token = null;
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    }
  }
});

export const { userLogIn, userLogOut } = authSlice.actions;
export default authSlice.reducer;