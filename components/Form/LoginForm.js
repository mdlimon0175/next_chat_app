"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import AlertBox from "../utils/ui/alerts/AlertBox";
import AlertText from "../utils/ui/alerts/AlertText";
import PasswordInput from "../utils/ui/inputs/PasswordInput";
import { userLogin } from "@/lib/features/auth/authSlice";
import { useLoginMutation } from "@/lib/features/auth/authApi";
import PrimarySubmitButton from "../utils/ui/buttons/PrimarySubmitButton";

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isLoading, data, isSuccess, isError, error, reset }] =
        useLoginMutation();

    const formHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        login({ url: "/login", data: formData });
    }

    useEffect(() => {
        function setDefaultState() {
            setEmail("");
            setPassword("");
        }

        if (data && isSuccess) {
            setDefaultState();
            dispatch(userLogin(data.data.user));
            localStorage.setItem("token", data.data.token);
            reset();
            router.push("/");
        }
    }, [data, reset, isSuccess, dispatch, router])

    return (
        <div>
            <form className="space-y-[18px]" onSubmit={formHandler}>
                <div className="rounded-md shadow-sm space-y-[17px]">
                    <div>
                        <label className="form_label">Email</label>
                        <input
                            autoFocus
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                            placeholder={"Your Email"}
                            className="form_input"
                        />
                        {isError && error.data?.error?.["email"] ? (
                            <AlertText 
                                message={error.data.error["email"].message}
                            />
                        ) : null}
                    </div>
                    <div className="relative">
                        <PasswordInput
                            value={password}
                            onChange={(value) => setPassword(value)}
                        />
                        {isError && error.data?.error?.["password"] ? (
                            <AlertText 
                                message={error.data.error["password"].message}
                            />
                        ) : null}
                    </div>
                </div>
                <div className="text-end text-sm">
                    <Link href={"/auth/registration"} className="form_link">
                        {"Create an account"}
                    </Link>
                </div>
                <PrimarySubmitButton title={"Sign in"} disabled={isLoading} />
                {isError ? (
                    <AlertBox message={error.data.message} />
                ) : null}
            </form>
        </div>
    )
}