import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      state.channels = payload;
    },
    addNewChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
    },
  }
});

export const { addChannels, addNewChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;