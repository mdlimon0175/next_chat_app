import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
    return (
        <Toaster
            toastOptions={{
                className: "!text-midnight",
                error: {
                    // className: "!text-red-400",
                    iconTheme: {
                        primary: "#f87171", // "#ef4444", // text-red-500
                    },
                },
                success: {
                    // className: "!text-green-400",
                    iconTheme: {
                        primary: "#4ade80", // "#22c55e", // text-green-500
                    },
                },
            }}
        />
    );
}
