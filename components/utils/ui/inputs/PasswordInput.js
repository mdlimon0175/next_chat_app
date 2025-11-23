"use client";

import { useState } from "react";
import EyeOpenIcon from "../icons/EyeOpenIcon";
import EyeCloseIcon from "../icons/EyeCloseIcon";

export default function PasswordInput({ label, name, value, onChange, required, placeholder, className }) {
    const [showPassword, setShowPassword] = useState(false);

    return (<>
        <label className="form_label">{label ?? "Password"}</label>
        <input
            name={name ?? "password"}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={e => onChange(e.target.value)}
            required={required ?? true}
            placeholder={placeholder ?? "Password"}
            className={className ?? "form_input"}
        />
        <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute z-20 top-[33px] md:top-[31px] right-3 cursor-pointer"
        >
            {showPassword ? (
                <EyeOpenIcon />
            ) : (
                <EyeCloseIcon />
            )}
        </span>    
    </>)
}
