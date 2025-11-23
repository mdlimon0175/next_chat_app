import { useSearchParams } from "next/navigation";

export default function useConversationIdParam() {
    const searchParams = useSearchParams();
    return searchParams.get('conversation_id') ?? "";
}
