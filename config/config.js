/*
// Title: App configuration file
// Description: Application configuration setup here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 2.0
// Date: 03/22/2025
*/

const appConfig = {
    is_production: process.env.NEXT_PUBLIC_MODE === "production",
    app_env: process.env.NEXT_PUBLIC_MODE ?? "development",
    app_name: process.env.NEXT_PUBLIC_APP_NAME ?? "Next Chat",
    app_url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:4000/",
    api_url: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:7000/api",
    api_base_url: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:7000/"
}

export default appConfig;
