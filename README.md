# This is a Full-Stack-Project 
 Author - Muneeb

# eBay App

The eBay App is a full-stack application designed to provide users with access to a vast collection of Products like smart phones , kitch-accessories ect.leveraging the Dummy Json API for fetching Products details. It features user authentication, Products exploration, and personal Add to Cart Features, offering a comprehensive and personalized shoping experience.

Home page:
![image](https://github.com/user-attachments/assets/f5c04e9b-6f50-4cb9-b4fd-3c74951d6722)


## important Links

[eBay live Link](https://ebay-client.onrender.com/) 

[API Documentation](https://ebay-ye10.onrender.com/api-docs/)

[Github ](https://github.com/muneeb41/Ebay)

[Video explaination for frontend ](https://youtu.be/p4c_GuT_GwY?si=tE2Pjf53E2N5nmdP)

[Video explaination for backend ](https://youtu.be/THHnhYiElBU?si=YBgQPAYr3s-DJm5y)

## Features

- **User Authentication:** Utilizes JWT for secure login and registration, ensuring user data protection.
- **Products Exploration:** Allows users to discover vast collection of Products, with detailed views available for each product.
- **Add to Cart:** Enables users to Add to cart their favorite product, creating a personalized list of favorites accessible at any time.
- **Detailed Product Information:** Provides in-depth details about Products , including start rating, categoreies, and more.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB instance (local or remote)

## Installation

1.  **Clone the Repository:** Start by cloning the Ebay repository to your local machine.

    ```sh
    git clone git@github.com:muneeb41/Ebay.git
    ```
2.  **Navigate to folder:** Move into the server directory of the project and client

    ```sh
    cd server
    ```
    ```sh
    cd client
    ```
3.  **Install Dependencies:** Install the necessary dependencies using npm for both directories client and server.

    ```sh
    npm install
    ```
4.  **Configure Environment Variables:** Create a `.env` file based on the provided `.env.example` file. Provide your MongoDB URI in the `.env` file.

for Frontend:

    
    VITE_SERVER_URL="https://ebay-ye10.onrender.com"
    
for Backend:
```
PORT=8000
JWT_KEY="iamcoder41"
ORIGIN="https://ebay-client.onrender.com"
MONGODB_URL="mongodb+srv://maxm26246:iamcoder41@cluster0.apgyudc.mongodb.net/Ebay?retryWrites=true&w=majority&appName=Cluster0"
```

5.  **Start the App:**

  for Frontend:

     npm run dev

  for Backend:
     
      npm run start

## Frontend Folder Structure

The following is the folder structure for the **eBay** frontend project:

<pre>
```plaintext
client/
├── node_modules/
├── public/
│   ├── index.html
│   └── assets/
│       ├── images/
│       └── icons/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── loading/
│   │   │   │   └── index.jsx
│   │   │   ├── navbar/
│   │   │   │   └── index.jsx
│   │   │   └── star-rating/
│   │   │       └── index.jsx
│   ├── pages/
│   │   ├── cart/
│   │   │   └── index.jsx
│   │   ├── electronics/
│   │   │   └── index.jsx
│   │   ├── explore/
│   │   │   └── index.jsx
│   │   ├── fashion/
│   │   │   └── index.jsx
│   │   ├── home/
│   │   │   └── index.jsx
│   │   ├── household/
│   │   │   └── index.jsx
│   │   ├── login/
│   │   │   └── index.jsx
│   │   ├── product-details/
│   │   │   └── index.jsx
│   │   └── signup/
│   │       └── index.jsx
│   ├── redux/
│   │   ├── cart/
│   │   │   └── cartSlice.js
│   │   ├── store.js
│   ├── utils/
│   │   ├── apiStore.js
│   │   └── constants.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js

</pre>
## Backend Folder Structure

This is the folder structure for the **eBay** backend.

<pre>
server/
├── config/
│   └── config.js
├── controllers/
│   ├── authController.js
│   └── cartController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── cartModel.js
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   └── cartRoutes.js
├── swagger/
│   ├── authSwagger.js
│   └── cartSwagger.js
├── node_modules/
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── swagger-output.json
└── README.md
</pre>

## Technologies Used in Frontend:

### Core Dependencies

- **React**: A JavaScript library for building fast and interactive user interfaces.
- **Redux thunk**: Redux Thunk is a middleware that allows you to write action creators returning functions instead of plain objects, enabling asynchronous logic like API calls in Redux.
- **React DOM**: Manages rendering React components to the DOM.
- **React Router DOM**: Enables declarative routing and navigation within the app.
- **React Redux**: Manages the global state of the application using the Redux pattern.
- **@reduxjs/toolkit**: Simplifies state management, offering pre-configured Redux logic.
- **Axios**: A promise-based HTTP client used to make API requests.
- **React Toastify**: Library for displaying non-blocking toast notifications in the UI.
- **Swiper**: A modern slider library used to create touch-friendly carousels.
- **React Icons**: Provides popular icons to use across UI components.
- **Tailwind CSS**: A utility-first CSS framework for fast and efficient styling.

## Backend Technologies Used

### Core Dependencies

- **Express**: A fast and minimalist web framework for building APIs and web applications.
- **Mongoose**: An object data modeling (ODM) library for MongoDB and Node.js, used for managing data models and schemas.
- **MongoDB**: A NoSQL database, storing user and bookmark data for the application.
- **JWT (jsonwebtoken)**: Used for creating and verifying JSON Web Tokens for secure user authentication.
- **bcrypt**: A library for hashing and comparing passwords, ensuring secure password storage.
- **cors**: Middleware to allow cross-origin requests between frontend and backend servers.
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`, used for managing secrets and environment configuration.


## 
<h4 align="center">Made by Muneeb</h4>
<h4 align="center">Thank You</h4>
