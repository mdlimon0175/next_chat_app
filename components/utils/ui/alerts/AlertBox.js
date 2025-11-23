export default function AlertBox({ type, message }) {
    const bgColor = () => {
        if (type === "success") {
            return "bg-green-400";
        } else {
            return "bg-red-400";
        }
    }

    return (
        <div className={`px-4 py-2 rounded shadow-lg text-white ${bgColor()}`}>
            <p>{message}</p>
        </div>
    )
}