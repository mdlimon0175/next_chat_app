/*
// Title: App store (redux)
// Description: The application's state is efficiently managed using Redux for predictable state management.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 2.0
// Date: 03/22/2025
*/

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "lib/features/api/apiSlice";
import authSlice from "lib/features/auth/authSlice";
import chatSlice from "lib/features/chat/chatSlice";
import callSlice from "lib/features/call/callSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    chat: chatSlice,
    call: callSlice
  },
  devTools: process.env.NEXT_PUBLIC_MODE !== "production",
  middleware: getDefaultMiddlewares => getDefaultMiddlewares().concat(apiSlice.middleware)
});

export default store;