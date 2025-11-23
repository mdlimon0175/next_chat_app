import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100">
            <h1 className="mb-6 text-center text-4xl font-extrabold text-gray-900">404</h1>
            <p className="text-lg text-gray-600 mb-6">
                {`Oops! The page you're looking for doesn't exist.`}
            </p>
            <Link
                className="custom_transition px-11 py-[14px] bg-sky-400 hover:bg-sky-500 text-lg font-semibold rounded-[50px] capitalize text-white"
                href="/"
            >
                Return Home
            </Link>
        </div>
    );
}