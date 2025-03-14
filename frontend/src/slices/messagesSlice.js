import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addOneMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (build) => {
    
  }
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;