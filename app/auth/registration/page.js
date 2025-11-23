import AuthHeader from "@/components/Header/AuthHeader";
import RegistrationForm from "@/components/Form/RegistrationForm";

export const metadata = {
    title: "Registration",
};

export default function Registration() {
    return (
        <>
            <AuthHeader title={"Create an account"} />
            <RegistrationForm />
        </>
    );
}
