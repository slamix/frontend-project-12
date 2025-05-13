import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalNewChat: {
    status: false,
  },
  modalRemoveChat: {
    status: false,
  },
  modalRenameChat: {
    status: false,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModalNewChat: (state) => {
      state.modalNewChat.status = true;
    },
    closeModalNewChat: (state) => {
      state.modalNewChat.status = false;
    },
    openModalRemoveChat: (state) => {
      state.modalRemoveChat.status = true;
    },
    closeModalRemoveChat: (state) => {
      state.modalRemoveChat.status = false;
    },
    openModalRenameChat: (state) => {
      state.modalRenameChat.status = true;
    },
    closeModalRenameChat: (state) => {
      state.modalRenameChat.status = false;
    },
  }
});

export const {
  openModalNewChat,
  closeModalNewChat,
  openModalRemoveChat,
  closeModalRemoveChat,
  openModalRenameChat, 
  closeModalRenameChat 
} = modalsSlice.actions;

export default modalsSlice.reducer;