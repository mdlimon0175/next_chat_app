import moment from "moment";

export default function Message({ data, is_sender }) {
    const { message, sent_at } = data || {};

    return (
        <div className={`flex pb-3 ${is_sender ? "justify-end" : "justify-start"}`}>
            <div title={moment(sent_at).fromNow()} className={`${is_sender ? "message_sender" : "message_receiver"} message_body`}>
                <span className="block">{message}</span>
            </div>
        </div>
    );
}