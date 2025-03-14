import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (token) => {
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const addNewMessage = createAsyncThunk(
  'messages/addNewMessages',
  async ({ token, body, channelId, username }) => {
    const response = await axios.post('/api/v1/messages', { body, channelId, username }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  }
);

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (build) => {
    build.addCase(getMessages.fulfilled, (state, action) =>{
      state.messages = action.payload;
    });
    build.addCase(addNewMessage.fulfilled, (state, action) => {
      state.messages.push(action.payload);
    });
  }
});

export default messagesSlice.reducer;