"use client";
import { 
    ClipboardDocumentListIcon,
    ClipboardDocumentCheckIcon 
} from "@heroicons/react/24/outline";
import useCopyToClipboard from "hooks/useCopyToClipboard";

export default function InstallationCode({ code }) {
    const [status, handleCopy, reset] = useCopyToClipboard();

    function handleOnClick(e) {
        const target = Array.from(e.currentTarget.querySelectorAll("code")).find(ele => ele.innerText === code);
        if(target === undefined) return;

        handleCopy(code);
        setTimeout(() => {
            reset();
        }, 1000)
    }

    return (
        <span onClick={handleOnClick} className="cursor-pointer flex items-center justify-between bg-softgray dark:bg-midnight px-6 py-5">
            <code className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                {code}
            </code>
            {status === "success" ? (
                <ClipboardDocumentCheckIcon className="shrink-0 ml-2 size-5 text-green-400" />
                ) : (
                <ClipboardDocumentListIcon className="shrink-0 ml-2 size-5" />
            )}
        </span>
    );
}