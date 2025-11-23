/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        // "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Dark Theme
                midnight: "#0B0F19",
                charcoal: "#1A1F2E",
                electric: "#00F7FF",
                aurora: "#B794F6",
                mint: "#4ADE80",
                // Light Theme
                dawn: "#F9FAFB",
                softgray: "#F3F4F6",
                purple: "#7C3AED",
                cyan: "#06B6D4",
                mintgreen: "#10B981",
                amber: "#F59E0B",
                softred: "#EF4444",
                charcoaltext: "#111827",
                graytext: "#6B7280",
                bordergray: "#D1D5DB",
                slategray: "#374151"
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
