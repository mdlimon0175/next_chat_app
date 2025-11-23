import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    call_id: "",
    room_id: "",
    remote_stream: {
        video: false,
        audio: false
    },
    partner_info: null,
}

const callSlice = createSlice({
    name: "call",
    initialState,
    reducers: {
        activeCall: (state, action) => {
            if(action.payload) {
                const { payload } = action;
                state.call_id = payload.call_id;
                state.room_id = payload.room_id;
                state.partner_info = payload.partner;
            }
        },
        endCall: (state) => {
            state.call_id = "";
            state.room_id = "";
            state.partner_info = null;
        },
        toggleRemoteStream: (state, action) => {
            const { type, value } = action.payload;
            if(Array.isArray(type)) {
                for(let i = 0; i < type.length; i++) {
                    if(Object.hasOwn(state.remote_stream, type[i])) {
                        state.remote_stream[type[i]] = value
                    }
                    // else invalid type
                }
            } else {
                if(Object.hasOwn(state.remote_stream, type)) {
                    state.remote_stream[type] = value
                }
                // else invalid type
            }
        }
    },
});

export const { activeCall, endCall, toggleRemoteStream } = callSlice.actions;
export default callSlice.reducer;