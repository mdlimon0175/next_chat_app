import ParentIcon from "./ParentIcon";

export default function CloseIcon(props) {
    return (
        <ParentIcon {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
            />
        </ParentIcon>
    );
}