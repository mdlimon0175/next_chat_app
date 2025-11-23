export default function AlertText({ type, message }) {
    const textColor = () => {
        if (type === "success") {
            return "text-green-400";
        } else {
            return "text-red-400";
        }
    }

    return (
        <p className={`text-sm font-semibold rounded text-red ${textColor()}`}>
            {message}
        </p>
    )
}