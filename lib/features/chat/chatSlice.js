import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hide_conversation_section: false
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        toggleConversationsSection: (state, action) => {
            state.hide_conversation_section = action.payload;
        }
    },
});

export const { toggleConversationsSection } = chatSlice.actions;
export default chatSlice.reducer;