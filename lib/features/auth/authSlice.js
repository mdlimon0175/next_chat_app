import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    loading: true,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            if(action.payload) {
                state.user = action.payload; // only get the user object
                state.loggedIn = true;
            }
            state.loading = false;
        },
        userLogout: (state) => {
            state.user = null;
            state.loggedIn = false;
        },
    },
});

export const { userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;