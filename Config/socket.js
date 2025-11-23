import { io } from "socket.io-client";
import appConfig from "./config";

/***
 * @next_step - check socket states before connect or close or disconnect...
 */
let socket;
export const initSocket = () => {
    if(!socket) {
        socket = io(appConfig.api_base_url, {
            reconnectionDelay: 10000,
            reconnection: true,
            reconnectionAttempts: 5,
            transports: ["websocket"],
            auth: (cb) => {
                if(typeof window !== "undefined") {
                    // we call the connect only on client
                    const token = localStorage.getItem("token");
                    if (token) {
                        cb({ token });
                    }
                }
            },
        });
    }

    return socket;
}

export const getSocket = () => {
    if(!socket) {
        return initSocket();
    }
    return socket;
}

// socket.on("connect", () => {
//     console.log("Connected to server!");
// });

// socket.on('reconnect', () => {
//     console.log('socket reconnected');
// });

// socket.on("connect_error", (err) => {
//     console.log("Connection error : ", err);
// });
    
// socket.on("disconnect", (reason) => {
//     console.log("Disconnected:", reason);
// });