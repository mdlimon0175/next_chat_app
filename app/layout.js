/*
// Title: App root layout
// Description: Application layout will render from here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 2.0
// Date: 03/20/2025
*/

import "./globals.css";
import appConfig from "@/config/config";
import LayoutProvider from "@/components/Layout/LayoutProvider";

export const metadata = {
    title: {
        default: `${appConfig.app_name}`,
        template: `${appConfig.app_name} - %s`,
    },
    description: `${appConfig.app_name} is a real-time chat & calling app with webRTC and socket.io`
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-dawn dark:bg-midnight">
                <LayoutProvider>{children}</LayoutProvider>
            </body>
        </html>
    );
}