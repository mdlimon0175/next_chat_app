export default function Blank({ message }) {
    return (
        <div className="relative w-full overflow-y-hiddeen h-[calc(100vh_-_85px)] flex flex-col items-center justify-center p-5 space-y-5">
            <div className="text-center text-charcoal dark:text-dawn">{message}</div>
        </div>
    );
}