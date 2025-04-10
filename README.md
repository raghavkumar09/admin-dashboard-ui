# Admin Dashboard - Frontend

This directory contains the React frontend application for the Admin Dashboard, built using Vite and styled with Tailwind CSS. It provides the user interface for administrators to log in, view dashboard statistics, and manage users (CRUD operations).

## Features

*   Admin Login Page
*   Protected Routes for authenticated admin access
*   Dashboard Page displaying key user statistics
*   User Management Pages:
    *   List all users with profile status and actions (View, Edit, Delete)
    *   View detailed user profile page
    *   Create new user form (including profile picture upload)
    *   Edit existing user form (including profile picture update)
*   Responsive UI using Tailwind CSS

## Tech Stack

*   React (v18+)
*   Vite (Build Tool)
*   Tailwind CSS (Styling)
*   JavaScript
*   `react-router-dom` (v6+ for Routing)
*   `axios` (HTTP Client for API communication)
*   `@heroicons/react` (Icons)

## Prerequisites

*   [Node.js](https://nodejs.org/) (v16.x or later)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   A running instance of the [Admin Dashboard Backend API](../backend). (Make sure the backend server is running to allow the frontend to fetch data).

## Setup & Installation (Local)

1.  **Navigate to the frontend directory:**
    ```bash
    # If you are in the project root:
    cd admin-dashboard-ui
    # Or provide the full path:
    # cd path/to/your-project/frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Create `.env.local` file:**
    Create a file named `.env.local` in this `frontend` directory. Vite uses this for local development environment variable overrides. Add the following:
    ```dotenv
    # URL for the backend API (including /api path)
    VITE_API_URL=http://localhost:5000/api

    # Base URL for the backend server (used for constructing image URLs if needed)
    VITE_BACKEND_BASE_URL=http://localhost:5000
    ```
    *(Adjust the port `5000` if your backend runs on a different one locally).*

## Running Locally

1.  **Ensure the backend server is running!**
2.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
3.  Vite will start the development server, typically on `http://localhost:5173`. Open this URL in your browser. The application will attempt to connect to the backend API specified by `VITE_API_URL`.

## Building for Production

```bash
npm run build
