"use client";
import { useState } from "react";

export default function useCopyToClipboard() {
    const [status, setStatus] = useState("idle");

    function handleClipboardWrite(value) {
        if(typeof value !== "string") {
            setStatus("error");

            return;
        }
        navigator.clipboard.writeText(value).then(res => setStatus("success")).catch(error => setStatus("error"));
    }

    function reset() {
        setStatus("idle");
    }

    return [status, handleClipboardWrite, reset];
}
