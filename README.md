# 🧑‍💻 Mini LinkedIn-like Community Platform

This is a full-stack community platform inspired by LinkedIn, built as part of the CIAAN Cyber Tech Internship Challenge. The platform includes user authentication, public post feeds, and profile page.

## 🚀 Live Demo

🌐 [Click here to view the live site](https://mini-linkedin-client.vercel.app)

## 📁 GitHub Repositories

🔗 [View the GitHub Repository](https://github.com/Imran00852/Mini-Linkedin-client)
🔗 [View the GitHub Repository](https://github.com/Imran00852/Mini-Linkedin-server)

---

## 🛠 Tech Stack Used

### Frontend

- **Framework**: React.js
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit & RTK Query
- **HTTP Client**: Axios
- **Routing**: React Router DOM

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database ODM**: Mongoose
- **Authentication**: JWT + bcrypt
- **CORS & Cookie Handling**: cookie-parser, cors

### Database

- **MongoDB (Cloud via MongoDB Atlas)**

### Hosting

- **Frontend**: Vercel
- **Backend**: Render

---

## 🔐 Features

### ✅ User Authentication

- Register & login with email and password
- Profile with name, email, and bio
- JWT-based secure sessions (stored in HTTP-only cookies)

### 📰 Public Post Feed

- Create, view, and delete posts
- Feed displays author name and timestamp

### 👤 Profile Page

- View your own and other users’ profiles
- See all posts by a specific user

---

## 🧪 Demo Credentials

```
Email: sample@gmail.com
Password: sample123
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repositories

```bash
git clone https://github.com/imran00852/Mini-Linkedin-client.git
git clone https://github.com/imran00852/Mini-Linkedin-server.git

```

---

### 2. Setup Backend

```bash
npm install
```

#### 📦 Backend Dependencies

```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken cookie-parser
```

#### 🔐 Create `.env` file in /server

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

#### ▶️ Start Backend Server

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
npm install
```

#### 📦 Frontend Dependencies

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install axios react-router-dom
npm install @reduxjs/toolkit react-redux
```

#### ▶️ Start Frontend

```bash
npm run dev
```

---

## ✅ Optional Enhancements

- Responsive UI with MUI
- Toast notifications (React-hot-toast)
- Loading spinners (CircularProgress)
- Clean routing with React Router

---

> Thank you for the opportunity! Looking forward to your feedback 🙌
