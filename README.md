🎬 MD Reviews and Ratings
License: MIT Node.js MongoDB PRs Welcome Static Frontend

MD Reviews and Ratings is a platform built for true film enthusiasts. Whether you're a seasoned cinephile or just beginning your cinematic journey, this app offers a simple yet feature-rich experience to discover, rate, and discuss films and series.

<p align="center"> <img src="https://user-images.githubusercontent.com/your-username/your-gif.gif" alt="MD Reviews Demo" width="70%"> </p>
📑 Table of Contents
Features
Live Demo
Tech Stack
Getting Started
Prerequisites
Setup Instructions
API Reference
Contributing
FAQ
License
✨ Features
🎥 Search for Movies and Series
⭐ Rate Films from 1 to 5 Stars
🔐 JWT Authentication for User Accounts
🛡️ Admin-Only Movie Management
🖼️ Cloud-Based Poster/Image Storage
🗨️ Review and Discussion for Films & Series
🚀 Live Demo
https://mdreviewsandratings.up.railway.app/

🛠️ Tech Stack
Frontend:

HTML, CSS, JavaScript 🎨
Static deployment via Railway ☁️
Backend:

Node.js, Express.js 🧠
Hosted on Railway ☁️
Database:

MongoDB Atlas (Free 500MB cluster) 📄
Image Hosting:

Cloudinary (Free plan) 🖼️
🏁 Getting Started
Prerequisites
Node.js (v16+ recommended)
npm (v8+)
MongoDB Atlas
Cloudinary account (free tier is enough)
Setup Instructions
1. Clone the Repository
bash
git clone https://github.com/marciliobbarboza/MD.git
cd MD
2. Backend Setup
Install dependencies:
bash
cd backend
npm install
Configure Environment Variables:
Create a .env file in the backend/ directory with:
INI
MONGO_URI=<your-mongodb-connection-string>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
SECRET_KEY=<your-secret-key>
PORT=5000
Run the Backend Server:
bash
npm start
Your backend will run at http://localhost:5000.
3. Frontend Setup
Configure API URL in your frontend code if developing locally:
js
const apiUrl = 'http://localhost:5000';
Launch the frontend by opening index.html directly in your browser.
4. Database Setup
Create a free cluster at MongoDB Atlas and connect using your connection string in .env.
Register users via /api/auth/register.
Admins can add movies via /api/movies POST requests.
📚 API Reference
See API.md for the full API documentation.

Core Endpoints:

Search Movies/Series: GET /api/movies/search?title=Batman
Rate Movie: POST /api/movies/:id/review (JWT required)
Register: POST /api/auth/register
Login: POST /api/auth/login
Admin Add Movie: POST /api/movies (Admin JWT required)
Example requests/responses and error codes are detailed in API.md.

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create your feature branch: git checkout -b feature/YourFeature
Commit your changes: git commit -m "Add your message"
Push to the branch: git push origin feature/YourFeature
Open a pull request.
See CONTRIBUTING.md for more details.

📷 Screenshots
<p align="center"> <img src="https://user-images.githubusercontent.com/your-username/screenshot1.png" width="400"> <img src="https://user-images.githubusercontent.com/your-username/screenshot2.png" width="400"> </p>
