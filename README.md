# Byte-Blog 🚀

Byte-Blog is a modern, dynamic blogging platform built with **Node.js**, **Express**, and **MongoDB**. It features a clean user interface, full CRUD functionality for blog posts, search capabilities, and a secure admin dashboard.

## ✨ Features

- **Dynamic Blogging**: View latest posts with pagination.
- **Search Functionality**: Quickly find posts using the search bar.
- **Admin Dashboard**: Secure area for managing blog content.
- **Full CRUD**: Create, Read, Update, and Delete blog posts.
- **Authentication**: Secure login system using JSON Web Tokens (JWT) and Bcrypt.
- **Responsive Design**: Mobile-friendly layout using EJS and CSS.
- **Contact Form**: Simple interface for user inquiries.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Templating Engine**: EJS (Embedded JavaScript)
- **Authentication**: JWT, Bcrypt, Cookie-Parser
- **Middleware**: Express-Session, Connect-Mongo, Method-Override
- **Environment**: Dotenv
- **Development**: Nodemon

## 📁 Project Structure

```text
Byte-Blog/
├── app.js             # Entry point of the application
├── public/            # Static files (CSS, JS, Images)
├── server/
│   ├── config/        # Database configuration
│   ├── models/        # Mongoose schemas (Post, User)
│   └── routes/        # Express routes (Main, Admin)
├── views/             # EJS templates
│   ├── layouts/       # Main and Admin layouts
│   └── partials/      # Reusable view components
└── .env               # Environment variables (Ignored by Git)
```

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nareshbyte0/Byte-Blog-Personal-Blogging-Site.git
   cd Byte-Blog-Personal-Blogging-Site
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   MONGODB_URI="your_mongodb_connection_string"
   JWT_SECRET="your_random_secret_string"
   ```

4. **Run the application**:
   - For development (with Nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

5. **Access the app**:
   Open your browser and navigate to `http://localhost:5000` (or the port specified in `app.js`).

## 🔐 Admin Access

To access the admin dashboard:
1. Go to `http://localhost:5000/admin`.
2. Register a new user (via the `/register` POST route if not already created) or use existing credentials.
3. Login to manage your posts!

## 📄 License

This project is licensed under the [ISC License](LICENSE).
