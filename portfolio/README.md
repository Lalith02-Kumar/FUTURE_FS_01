# Lalith / Developer Portfolio

A premium, high-fidelity personal portfolio website inspired by the minimalist aesthetic of **montone.studio**. This project features a soft lavender color palette, dynamic cursor spotlight effects, and a robust full-stack implementation.

## ✨ Features

- **Editorial Design**: Clean, typography-focused layout with a modern aesthetic.
- **Interactive Spotlight**: A custom lerp-based spotlight follow effect that enhances user engagement.
- **Responsive Navigation**: Smooth transitions and a dedicated mobile menu.
- **Contact System**: Fully functional contact form with real-time validation and backend integration.
- **Micro-animations**: Subtle fade-up and hover effects for a premium feel.
- **Project Showcases**: Curated list of selected works with links and tech tags.
- **Social Integration**: Direct links to coding profiles (LeetCode, GitHub, LinkedIn, etc.).

## 🚀 Tech Stack

### Frontend
- **HTML5**: Semantic structure.
- **Vanilla CSS**: Custom design system, CSS variables, and modern layouts (Flexbox/Grid).
- **Vanilla JavaScript**: DOM manipulation, Intersection Observer API, and custom cursor logic.

### Backend
- **Node.js & Express.js**: RESTful API for handling contact form submissions.
- **MySQL**: Persistent storage for messages.
- **express-validator**: Robust server-side validation.
- **dotenv**: Environment variable management.

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/Lalith02-Kumar/-FUTURE_FS_01.git
cd -FUTURE_FS_01
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=lalith_portfolio
   PORT=5000
   ```
5. Initialize the database:
   ```bash
   mysql -u your_username -p < setup.sql
   ```
6. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Simply open `frontend/index.html` in your browser.
2. For the best development experience, use the **Live Server** extension in VS Code (running on port 5500).

## 📂 Project Structure

```text
├── backend/
│   ├── routes/          # API routes
│   ├── db.js            # MySQL connection pool
│   ├── server.js        # Express application entry point
│   ├── setup.sql        # Database initialization script
│   └── .env.example     # Template for environment variables
├── frontend/
│   ├── assets/          # Static files (resume, etc.)
│   ├── css/             # Stylesheets
│   ├── js/              # Client-side scripts
│   └── index.html       # Main entry point
└── .gitignore           # Ignored files for Git
```

## 🤝 Contact

- **Lalith Kumar Reddy**
- **Email**: [vlalithreddy02@gmail.com](mailto:vlalithreddy02@gmail.com)
- **LinkedIn**: [Lalith Kumar Reddy](https://www.linkedin.com/in/lalith-kumar-reddy-821621379/)
- **GitHub**: [@Lalith02-Kumar](https://github.com/Lalith02-Kumar)

---
*Built with passion by Lalith.*
