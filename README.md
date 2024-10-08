
---

# HealTether

**HealTether** is a comprehensive health management application built using the **MERN stack**. The project focuses on providing users with a secure and intuitive platform for health-related services. The application utilizes modern technologies to ensure a seamless user experience across various devices.

## Live Link

[View Live Demo](#) *(https://heal-tether-murex.vercel.app/)*

## Tech Stack

- **Frontend**:
  - **Vite**: For fast and efficient development.
  - **React**: For building dynamic user interfaces.
  - **JavaScript**: Core programming language for interactivity.
  - **Redux & Redux Toolkit**: For effective state management.
  - **Chakra UI**: For a clean, responsive design with accessibility features, including dark mode support.

- **Backend**:
  - **Node.js**: For server-side development.
  - **Express**: Web framework for building APIs.
  - **Mongoose**: For MongoDB object modeling.
  - **dotenv**: For environment variable management.
  - **CORS**: To enable cross-origin resource sharing.
  - **bcrypt**: For password hashing and security.
  - **express-validator**: For validating user input.
  - **jsonwebtoken**: For secure token-based authentication.

## Project Overview

### Backend Development

The backend of **HealTether** is built using **Node.js**, and consists of the following key components:

- **Models**: Defines the structure of data for user accounts and any other necessary entities.
- **Controllers**: Contains business logic for handling requests and responses.
- **Routes**: Manages the API endpoints for user registration and authentication.
- **Authentication**: Implements secure password hashing using **bcrypt** and token generation using **jsonwebtoken** to provide secure access.
- **Validation**: Utilizes **express-validator** to ensure that user input is correctly formatted and validated before being processed.

A middleware function is also created to restrict access to authenticated users, enhancing the security of the application.

### Frontend Development

The frontend of **HealTether** is developed using **React** with **Redux Toolkit** for managing application state across various components. The user interface is designed with **Chakra UI**, ensuring that it is both user-friendly and responsive across different devices. The application includes a dark mode feature for improved accessibility.

## Getting Started

### Environment Variables

Both the frontend and backend contain `.env` files. Ensure to set up the required environment variables for each.

### Running the Application

To run the application locally, follow these steps:

1. **Backend**:
   - Navigate to the backend folder in your terminal.
   - Run the server using:

     ```bash
     node server.js
     ```

   - The backend will run on [http://localhost:5000](http://localhost:5000).

2. **Frontend**:
   - Navigate to the frontend folder in your terminal.
   - Start the development server using:

     ```bash
     npm run dev
     ```

   - The frontend will run on [http://localhost:5173](http://localhost:5173).


---
