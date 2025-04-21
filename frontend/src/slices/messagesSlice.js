import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeChannel } from './channelsSlice';

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

export const removeMessage = createAsyncThunk(
  'messages/removeMessage',
  async (payload, message) => {
    const { id } = payload;
    if (message.channelId === id) {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/v1/messages/${message.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
);

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addNewMessage: (state, { payload }) => {
      state.messages.push(payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, { payload }) => {
      state.messages = payload;
      console.log(state.messages)
    });
    builder.addCase(removeChannel, (state, { payload }) => {
      const channelId = payload.id;
      const restMessages = state.messages.filter((message) => message.channelId !== channelId);
      state.messages = restMessages;
    });
  }
});

export const { addNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;