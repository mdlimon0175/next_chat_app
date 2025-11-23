const returnStyle = (className) => {
    if (className) {
        return className;
    }
    return "icon text-charcoaltext dark:text-dawn";
}

export default function ParentIcon({ children, className, fill, stroke }) {
    return (
        <svg
            fill={fill ?? "none"}
            viewBox="0 0 24 24"
            strokeWidth={stroke ?? "2"}
            stroke="currentColor"
            className={returnStyle(className)}
        >
            {children}
        </svg>
    );
}
