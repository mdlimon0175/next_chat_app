import LoginForm from "@/components/Form/LoginForm";
import AuthHeader from "@/components/Header/AuthHeader";

export const metadata = {
    title: "Login",
}

export default function Login() {
    return (
        <>
            <AuthHeader title={"Sign in to your account"} />
            <LoginForm />
        </>
    );
}
