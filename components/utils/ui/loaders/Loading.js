export function ConversationLoading() {
    return (
        <div className="animate-pulse my-2 last:mb-0 px-2">
            <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2 py-1 ml-2">
                    <div className="h-2 bg-gray-200 rounded w-2/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
        </div>
    );
}

export function Loading() {
    return (
        <p className="absolute z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-lg text-charcoal dark:text-dawn">
            loading... Please wait
        </p>
    )
}