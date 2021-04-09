import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    chatName: null,
    hamburgerClass: false,
  },
  reducers: {
    setChat: (state, action) => {
      state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
    },
    setHamburgerClass: (state, action) => {
      state.hamburgerClass = action.payload.hamburgerClass;
    },
  },
});

export const { setChat, setHamburgerClass } = chatSlice.actions;
export const selectChatId = (state) => state.chat.chatId;
export const selectChatName = (state) => state.chat.chatName;
export const hamburgerMenu = (state) => state.chat.hamburgerClass;

export default chatSlice.reducer;
