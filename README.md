# She Can Foundation - Contact Form

A professional full-stack contact form application for She Can Foundation, built with a responsive frontend and robust backend API that integrates with Google Sheets for data storage.

---

## 🎯 Overview

This application enables users to submit contact information and inquiries through a beautifully designed form interface. All submissions are securely validated and stored in a Google Sheet database, making it easy for the organization to manage and respond to inquiries.

**Key Highlights:**
- ✅ Fully responsive design (desktop, tablet, mobile)
- ✅ Real-time form validation
- ✅ Backend API with security best practices
- ✅ Google Sheets integration for data storage
- ✅ Professional glass-morphism UI with brand colors

---

## 📁 Project Structure

```
she-can-foundation-full-stack/
├── frontend/                          # React-free vanilla frontend
│   ├── index.html                     # Main HTML structure
│   ├── style.css                      # Custom CSS with animations
│   ├── script.js                      # Form validation & submission
│   └── she-can-foundation-logo.avif   # Brand logo
│
├── backend/                           # Node.js Express server
│   ├── server.js                      # Main server file
│   ├── package.json                   # Dependencies & scripts
│   ├── .env                           # Environment variables (Google credentials)
│   └── services/
│       └── googleSheetsService.js     # Google Sheets API integration
│
├── she-can-foundation-logo.avif       # Brand assets
└── README.md                          # This file
```

---

## 🚀 Live Demo

**Frontend:** https://she-can-foundation.vercel.app  
**Backend API:** https://she-can-foundation-api.render.com  

---

## 📊 Data & Submissions

All form submissions are stored in a secure Google Sheet accessible to authorized team members:

**Google Sheet:** [View Submissions](https://docs.google.com/spreadsheets/d/1scUDD3ieODpArO6B0ZznNYBiQY8f-a5LGNaIQVzYq0E/edit)

---

## 🛠 Tech Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Bootstrap 5.3.0 (responsive grid)
- Custom animations & glass-morphism design
- Mobile-first responsive approach

**Backend:**
- Node.js v22+ with Express.js 4.22+
- Express Validator for input validation
- Google Sheets API integration
- CORS enabled for cross-origin requests
- Nodemon for development

**Database:**
- Google Sheets (via Google Sheets API)
- Service account authentication

**Deployment:**
- Frontend: Vercel
- Backend: Render

---

## 📝 Features

### Frontend
- Professional split-screen layout (50/50 branding + form)
- Real-time form validation (name, email, message)
- Glass-morphism card design with brand colors
- Smooth fade-in and slide-up animations
- Success/error toast notifications
- Fully responsive on all devices
- No scrolling on desktop, natural scrolling on mobile

### Backend
- RESTful API endpoint for form submissions
- Input validation using express-validator
- Automatic timestamp generation
- Error handling and logging
- Google Sheets data persistence
- CORS and security headers

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js v22 or higher
- Python 3.8+ (for frontend server)
- Google Cloud credentials (.env file)

### Frontend Setup
```bash
cd frontend
python -m http.server 5500
```
Access: http://localhost:5500

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Server runs on: http://localhost:3000

---

## 📤 Form Submission Flow

1. **User fills form** → Frontend validates input in real-time
2. **Submit clicked** → Data sent to backend API (`POST /api/contact`)
3. **Backend validates** → Express-validator checks all fields
4. **Data saved** → Google Sheets API stores submission
5. **Confirmation** → Success/error toast shown to user

---

## 🔐 Security

- Input validation on both frontend and backend
- Service account authentication for Google Sheets
- CORS enabled only for production domains
- Environment variables protect sensitive data
- No SQL injection vulnerabilities (Google Sheets API)

---

## 📞 Contact Form Fields

- **Full Name:** Required, 2+ characters, letters/spaces/hyphens only
- **Email:** Required, valid email format
- **Message:** Required, minimum 10 characters

---

## 🎨 Design Philosophy

The design reflects She Can Foundation's brand identity:
- **Primary Color:** Navy (#000A22)
- **Accent Color:** Orange (#FF592C)
- **Typography:** Poppins (headers) + Inter (body)
- **Feel:** Bold, elegant, empowering, and socially meaningful

---

## ✅ Project Status

- ✅ Frontend - Complete
- ✅ Backend API - Complete
- ✅ Form Validation - Complete
- ✅ Google Sheets Integration - Complete
- ✅ Responsive Design - Complete
- ⏳ Deployment - Ready for Vercel & Render

---

## 📧 Support

For questions or issues, contact the development team or open an issue in the repository.

---

**Made with ❤️ for She Can Foundation**
