🎬 MD Reviews and Ratings
MD Reviews and Ratings is a platform built for true film enthusiasts. Whether you're a seasoned cinephile or just beginning your cinematic journey, this app offers a simple yet feature-rich experience to discover, rate, and discuss films and series.
________________________________________
🚀 Key Features
•	🎥 Search for Movies and Series
•	⭐ Rate Films from 1 to 5 Stars
•	🔐 User Authentication with JWT Tokens
•	🛡️ Admin-Only Movie Management
•	📷 Cloud-Based Poster and Image Storage
🌐 Live Demo: https://mdreviewsandratings.up.railway.app/
(Note: replace this with your MD-branded URL once available)
________________________________________
🛠️ Tech Stack Overview
Frontend
•	HTML, CSS, JavaScript 🎨
•	Static deployment via Railway ☁️
Backend
•	Node.js, Express.js 🧠
•	Hosting on Railway ☁️
Database
•	MongoDB Atlas (Free 500MB cluster) 🗄️
Image Hosting
•	Cloudinary (Free plan) 📷
________________________________________
🧪 Setup Instructions
🔧 1. Clone the Repository
bash
CopiarEditar
git clone <your-repo-url>
cd <project-directory>
________________________________________
🔙 2. Backend Setup
a. Install Dependencies
bash
CopiarEditar
cd backend
npm install
b. Configure Environment Variables
Create a .env file in the backend/ directory with:
ini
CopiarEditar
MONGO_URI=<your-mongodb-connection-string>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
SECRET_KEY=<your-secret-key>
PORT=5000
c. Run the Backend Server
bash
CopiarEditar
npm start
Your backend will be running at http://localhost:5000.
________________________________________
🖥️ 3. Frontend Setup
a. API URL Configuration
Update all frontend API calls to point to your local backend for development:
js
CopiarEditar
const apiUrl = 'http://localhost:5000';
Replace this URL in all relevant fetch() or Axios calls.
b. Launch the Frontend
Just open index.html in your browser. The frontend is static.
________________________________________
🗃️ 4. Database Setup
a. Create MongoDB Cluster
•	Sign up at MongoDB Atlas
•	Create a free cluster and retrieve your connection string
•	Paste it into .env as MONGO_URI
b. Add Initial Data
•	Register users using the /api/auth/register route
•	Admins can add movies via /api/movies POST request
________________________________________
🧪 5. Application Testing
a. Authentication
•	Register users via /api/auth/register
•	Log in using /api/auth/login to receive a JWT
•	Use JWT to authorize other API actions
b. Movie Features
•	GET /api/movies to search or list all movies
•	POST /api/movies/:id/review to submit a rating (JWT required)
c. Admin Panel
•	POST /api/movies to add movies (Admin JWT required)
•	Full CRUD support for movie management
________________________________________
🔗 Core API Endpoints (MD Reviews and Ratings)
________________________________________
🎞️ 1. Search Movies or Series
Endpoint: GET /api/movies/search?title=Batman
Description: Open to all users. Filters by title and genre.
Response:
json
CopiarEditar
{
  "movies": [
    {
      "title": "The Batman",
      "genre": ["Action", "Drama"],
      "rating": 4,
      "year": 2022,
      "poster": "image_url.jpg"
    }
  ]
}
________________________________________
⭐ 2. Rate a Movie
Endpoint: POST /api/movies/:id/review
Authorization: User JWT required
Request Body:
json
CopiarEditar
{
  "rating": 1 to 5
}
Response:
json
CopiarEditar
{ "message": "Review added/updated successfully" }
________________________________________
🔐 3. Register a New User
Endpoint: POST /api/auth/register
Request Body:
json
CopiarEditar
{
  "name": "Peter Parker",
  "email": "spider@example.com",
  "password": "iamspiderman"
}
Response:
json
CopiarEditar
{ "message": "User registered successfully!" }
________________________________________
▶️ 4. Login a User
Endpoint: POST /api/auth/login
Request Body:
json
CopiarEditar
{
  "email": "spider@example.com",
  "password": "iamspiderman"
}
Response:
json
CopiarEditar
{
  "token": "your_jwt_token_here",
  "username": "Peter Parker"
}
________________________________________
🧙‍♂️ 5. Admin: Add a New Movie
Endpoint: POST /api/movies
Authorization: Admin JWT token
Request Body:
json
CopiarEditar
{
  "title": "New Movie",
  "genre": ["Action", "Adventure"],
  "rating": 4,
  "year": 2023,
  "type": "movie",
  "poster": "image_url"
}
Response:
json
CopiarEditar
{
  "message": "Movie added successfully!",
  "movie": { ... }
}
________________________________________
❌ Error Responses
Code	Description
400	Bad Request – Invalid/missing parameters
401	Unauthorized – JWT missing or invalid
404	Not Found – Resource not found
500	Internal Server Error – Unexpected issue
