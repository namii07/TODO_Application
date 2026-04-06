# To-Do List Backend API

This is a production-ready REST API for a To-Do List application. It uses Node.js, Express, MongoDB, and JWT for authentication.

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js            # MongoDB connection
├── models/
│   └── User.js          # User schema
├── controllers/
│   ├── authController.js # Registration, login, logout
│   └── userController.js # Fetching and updating user
├── routes/
│   ├── authRoutes.js     # /register, /login, /logout
│   ├── userRoutes.js     # /getuser, /updateuser
│   └── utilRoutes.js     # /status
├── middleware/
│   ├── authMiddleware.js # JWT verification
│   └── errorMiddleware.js# Custom error handler
├── utils/
│   └── generateToken.js  # Helper for creating JWTs
├── .env                  # Environment Variables
├── package.json          # Dependencies
└── server.js             # Entry Point
```

## 🚀 How to Run

1. **Install dependencies**
   Ensure you are in the `backend` folder and run:
   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   Open the `.env` file in the root of the backend folder and fill in your details:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_secure_secret_key>
   ```

3. **Start the server**
   ```bash
   node server.js
   ```
   Or, if you install nodemon (for development):
   ```bash
   npm run dev
   ```

## 🛣️ API Endpoints

### 🔓 Public Routes
- `POST /register` - Register a new user
  - Body: `{ "username": "JohnDoe", "email": "john@example.com", "password": "password123", "department": "IT", "year": 2, "age": 25 }`
- `POST /login` - Login user
  - Body: `{ "email": "john@example.com", "password": "password123" }` OR `{ "username": "JohnDoe", "password": "password123" }`

### ⚙️ Utility
- `GET /status` - Server health check ("Server is running")

### 🔒 Protected Routes (Require `Authorization: Bearer <token>` Header)
- `POST /logout` - Logout user
- `GET /getuser` - Get logged-in user profile details
- `PATCH /updateuser` - Update profile (department, year, age)
  - Body: `{ "department": "HR", "year": 3 }`

## 🛡️ Features
- **Clean Architecture:** Strict separation of layers (Controllers, Routes, Models, Middleware).
- **Authentication:** JWT and Bcrypt hashing implemented.
- **Error Handling:** Centralized custom error middleware.
- **Input Validation:** Required field validations handle missing or too short content properly.
- **Scalable Setup:** Easy to extend and add more models and controllers.
