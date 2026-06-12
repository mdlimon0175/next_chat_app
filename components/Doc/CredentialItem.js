"use client"
import { 
    ClipboardDocumentListIcon,
    ClipboardDocumentCheckIcon 
} from "@heroicons/react/24/outline";
import useCopyToClipboard from "hooks/useCopyToClipboard";

export default function CredentialItem({ title, value }) {
    const [status, handleCopy, reset] = useCopyToClipboard();

    function handleOnClick(e) {
        const target = Array.from(e.currentTarget.querySelectorAll("span")).find(ele => ele.innerText === value);
        if(target === undefined) return;

        handleCopy(value);
        setTimeout(() => {
            reset();
        }, 1000)
    }

    return (
        <div onClick={handleOnClick} className="grid grid-cols-[1fr_auto] text-sm cursor-pointer bg-softgray dark:bg-midnight rounded-2xl p-5">
            <span>{title}</span>
            <span className="col-start-1 flex items-center justify-between font-semibold text-lg text-charcoaltext dark:text-white">{value}</span>
            {status === "success" ? (
                <ClipboardDocumentCheckIcon className="size-5 text-green-400" />
                ) : (
                <ClipboardDocumentListIcon className="size-5" />
            )}
        </div>
    )
}