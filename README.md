# 🚀 Ecommerce Web App

This project is a scalable E-Commerce backend system built to manage product sales efficiently with a clean and maintainable architecture. It focuses on secure authentication, email verification, and user account management while providing a strong foundation for product, order, and payment modules.

The system is designed with scalability in mind, making it suitable for growing applications and real-world production use.

---


## ✨ Authentication Features

* 📝 **User Registration** – Create a new account securely
* 📧 **Email Verification (OTP)** – Verify account using email OTP
* 🔄 **Re-Verify / Resend OTP** – Request a new OTP if expired
* 🔐 **User Login** – Secure login using JWT authentication
* 🚪 **User Logout** – Token-based logout handling
* 🔑 **Forgot Password** – Password reset link or OTP via email
* 🔁 **Verify OTP for Password Reset** – Secure identity verification
* 🔒 **Change Password** – Update password after authentication

These features provide a complete and secure authentication workflow for modern backend applications.

# 💻 Tech Stack & Services 


### 🚀 Production Dependencies

* 🚂 **Express.js** – Fast and minimal backend framework
* 🍃 **Mongoose** – MongoDB object modeling for Node.js
* 🔐 **jsonwebtoken (JWT)** – Secure authentication & authorization
* 🔑 **bcryptjs** – Password hashing for security
* 📧 **nodemailer** – Email service for OTP, verification & password reset
* ⚙️ **dotenv** – Environment variable management

---

### 🧑‍💻 Development Dependencies

* 🔄 **nodemon** – Auto-restart server during development
* 🎨 **prettier** – Consistent and clean code formatting





This stack ensures a **secure, scalable, and production-ready backend architecture** with clean development workflow.



---

🏗 System Architecture Diagram
```
You can view the system design and workflow here:

🔗 Eraser.io Diagram:
https://app.eraser.io/workspace/qXYIv4Yl6ZikhrOJqDIH

```

## 🖥 Local Setup & Requirements

### 📌 Backend Requirements

* 🟢 **Node.js** (v18+ recommended)
* 🍃 **MongoDB** (Local or MongoDB Atlas)
* 📦 **npm** or **yarn**

---

## ⚙️ Environment Configuration (.env)

Create a `.env` file in the root directory:

```env
PORT=
MONGO_URI=
JWT_SECRET=
EMAIL=
PASSWORD=
```

---

## 🗄 Database Setup

### Option 1: Local MongoDB

Make sure MongoDB is running locally:

```bash
mongodb
```

Default local connection:

```
mongodb://127.0.0.1:27017/
```

### Option 2: MongoDB Atlas

Use your Atlas connection string inside:

```
MONGO_URI=your_atlas_connection_string
```

---

## ▶ Run Backend Locally

```bash
npm install
npm run dev
```

Server will start at:

```
http://localhost:8000
```

This setup ensures your backend runs securely with proper environment configuration and database connection.
readme priview crl+shi+v

