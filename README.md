# Next Chat App

This is a modern chat application built with **Next.js 14**. The app leverages **Redux** for state management and **RTK Query** for efficient data fetching on the client side. It also features a simple video call functionality using **WebRTC**. The backend API is served via the **next_chat_app_api** repository available at https://github.com/mdlimon0175/next_chat_app_api

Features
--------

*   **State Management**: Utilizes **Redux** for efficient state management across the app.
    
*   **Data Fetching**: Uses **RTK Query** for fast and easy client-side data fetching.
    
*   **Dark & Light Themes**: Supports both **dark** and **light** themes with easy switching.
    
*   **Realtime Chatting/Messaging**: Enables **real-time messaging** using WebSockets for instant message delivery without page reloads.
    
*   **Video Call**: Integrated **WebRTC** for video call functionality, allowing users to communicate via video calls.

## Installation
First clone the project to your machine.
```bash
https://github.com/mdlimon0175/next_chat_app
```

Go to the cloned project directory
```bash
cd next_chat_app
```

Install dependencies
```bash
npm install
```

finally start the local server,
```bash
npm run dev
```
Application will run on http://localhost:4000 \
you can change port from pacage.json file.

Ensure the backend server is running on http://localhost:7000 (or configure accordingly). The backend API is required for user authentication, chat messaging, and more.

### Default Credentials

email: admin@test.com \
password: 1234

## WebRTC Video Call

To make a video call, simply click on a conversation and press the Video Call button. This feature uses WebRTC for peer-to-peer video calls, providing a seamless video communication experience directly in the app.

## API Integration

The app connects to a backend API that is located at: 
http://localhost:7000 \
Make sure your backend API server is up and running before you attempt to use the app.

### Package List
Here are the dependencies used in this project, along with their links to the official documentation or repositories:

- [**Nextjs**](https://nextjs.org) - The React Framework for the Web.
- [**Reduxjs**](https://redux.js.org) - A JS library for predictable and maintainable global state management.
- [**Moment.js**](https://momentjs.com) - Parse, validate, manipulate, and display dates and times in JavaScript.
- [**React Virtuoso**](https://virtuoso.dev/) - React Virtuoso is a family of React components that display large data sets using virtualized rendering, automatically handling variable item sizes and changes in items' sizes.
- [**React Hot Host**](https://react-hot-toast.com) - React Toast Notifications.
- [**Socket.IO**](https://socket.io) - The client-side library for interacting with Socket.IO servers.
- [**Tailwind CSS**](https://tailwindcss.com) - A utility-first CSS framework packed with classes.
- [**gravatar-url**](https://github.com/sindresorhus/gravatar-url) - A package to generate Gravatar URLs from an email address.

## Contact Information
- **Email**: [mdlimon0175@gmail.com](mailto:mdlimon0175@gmail.com)
- **WhatsApp**: [+8801568113207](https://wa.me/8801568113207)
- **Facebook**: [fb.com/mdlimon0175](https://fb.com/mdlimon0175)