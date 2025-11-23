"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AlertBox from "../utils/ui/alerts/AlertBox";
import AlertText from "../utils/ui/alerts/AlertText";
import CloseIcon from "../utils/ui/icons/CloseIcon";
import PasswordInput from "../utils/ui/inputs/PasswordInput";
import { useRegistrationMutation } from "@/lib/features/auth/authApi";
import PrimarySubmitButton from "../utils/ui/buttons/PrimarySubmitButton";

export default function RegistrationForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [
        registration,
        { isLoading, data, isSuccess, isError, error, reset },
    ] = useRegistrationMutation();

    const formHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("password_confirmation", confirmPassword);
        formData.append("profile_picture", profilePic);

        registration({ url: "/registration", data: formData });
    }

    useEffect(() => {
        function setDefaultState() {
            setEmail("");
            setPassword("");
            setUsername("");
            setConfirmPassword("");
            setProfilePic(null);
        }

        if (data && isSuccess) {
            setDefaultState();
            reset();
            router.push("/auth/login");
        }
    }, [data, isSuccess, reset, router]);

    return (
        <div>
            <form className="space-y-[18px]" onSubmit={formHandler}>
                <div className="rounded-md shadow-sm space-y-[17px]">
                    <div>
                        <label className="form_label">Username</label>
                        <input
                            autoFocus
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required={true}
                            placeholder={"Username"}
                            className="form_input"
                        />
                        {isError && error.data?.error?.["username"] ? (
                            <AlertText 
                                message={error.data.error["username"].message}
                            />
                        ) : null}
                    </div>
                    <div>
                        <label className="form_label">Email</label>
                        <input
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
                    <div className="relative">
                        <PasswordInput
                            label={"Confrim Password"}
                            value={confirmPassword}
                            name={"password_confirmation"}
                            onChange={(value) => setConfirmPassword(value)}
                            placeholder={"Re-type Password"}
                            className="form_input placeholder:normal-case"
                        />
                        {isError && error.data?.error?.["password_confirmation"] ? (
                            <AlertText 
                                message={error.data.error["password_confirmation"].message}
                            />
                        ) : null}
                    </div>
                    <div>
                        <label className="form_label">Upload Profile Picture</label>
                        {profilePic && profilePic instanceof File && (
                            <div className="flex items-center gap-4 mb-1.5">
                                <div className="relative size-10">
                                    <Image fill sizes="40px" src={URL.createObjectURL(profilePic)} alt="" />
                                </div>
                                <span className="truncate text-sm text-charcoal dark:text-dawn">{profilePic.name}</span>
                                <span
                                    title="remove image"
                                    onClick={() => setProfilePic(null)}
                                    className="size-4 cursor-pointer rounded-full bg-red-400 flex items-center justify-center"
                                >
                                    <CloseIcon className={"text-white size-3"} stroke={3} />
                                </span>
                            </div>
                        )}
                        <div className="form_input">
                            <input
                                type="file"
                                name="profile_picture"
                                multiple={false}
                                onChange={(e) =>
                                    setProfilePic(e.target.files[0])
                                }
                                accept="image/jpeg, image/jpg, image/png"
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            />
                            <div className="flex cursor-pointer flex-col items-center">
                                <span className="text-gray-500">
                                    {"Upload profile pic"}
                                </span>
                            </div>
                        </div>
                        {isError && error.data?.error?.["profile_picture"] ? (
                            <AlertText 
                                message={error.data.error["profile_picture"].message} 
                            />
                        ) : null}
                    </div>
                </div>
                <div className="text-end text-sm">
                    <Link href={"/auth/login"} className="form_link">
                        {"Already have an account!"}
                    </Link>
                </div>
                <PrimarySubmitButton title={"Sign up"} disabled={isLoading} />
                {isError ? (
                    <AlertBox message={error.data.message} />
                ) : null}
            </form>
        </div>
    );
}
