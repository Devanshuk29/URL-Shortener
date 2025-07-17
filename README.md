


# 🔗 URL Shortener App

A modern and fully-featured **URL Shortener web application** built with **React (frontend)** and **Node.js, MongoDB (backend)**. It lets users shorten long URLs, track clicks, generate QR codes, and view analytics — all wrapped in a beautiful, responsive dark/light-themed interface.




## 📸 Project Overview

This project is a **custom URL Shortener** that allows users to:
- Enter long URLs and get a shortened version instantly.
- Track number of visits.
- Generate and download QR codes for links.
- View analytics and usage charts.
- Share links via WhatsApp, Twitter, and LinkedIn.
- Experience a modern, responsive, and theme-toggle enabled interface.
## ✨ Features

### 🔗 Core Functionalities
- URL shortening
- Click tracking (accessCount)
- Redirection via short URL

### 📊 Analytics & History
- Total click counter
- Clicks grouped by date (bar chart)
- URL history table with original URL, short URL, click count, and date

### 💡 UI/UX Highlights
- Dark/light mode toggle (persistent)
- Responsive layout (mobile-first)
- Toast-style "copied to clipboard!" message
- Modal-based QR code generation & download
- Social media share buttons: WhatsApp, Twitter, LinkedIn
- Link preview: title + image (with fallback)

### 🔐 Mock Auth (Extendable)
- Login/Register modal (currently mock alerts)

---

## 🧱 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React, Tailwind CSS, Recharts |
| **Backend** | Node.js, Express |
| **Database** | MongoDB, Mongoose |
| **Icons & UI** | Lucide React |
| **QR Code** | qrcode.react |

## Installation & Setup

### Prerequisites
- Node.js & npm installed
- MongoDB installed and running (or use Atlas)
- Git installed (optional)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```
### 2. Setup backend
```bash
cd url-shortener
npm install
npm run dev
```

### 3. Start frontend
```bash
cd url-shortener-frontend
npm install
npm run dev
```

## 🚀 Future Improvements

- 🔐 Real authentication using JWT

- 📬 Email verification

- 🌍 Custom domains for shortened URLs

- 🧪 Unit and integration testing

- 📱 Mobile app (React Native or Flutter)
## 🙌 Acknowledgements
- Lucide Icons

- Recharts

- Tailwind CSS

- QR Code React

