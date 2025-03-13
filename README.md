# 🎬 More or Less 

The **More or Less** website was thought for film enthusiasts, allowing users to search and rate films and series. The goal is to provide a simple yet comprehensive experience for both experienced moviegoers and those less familiar with the art of cinema. 

## 🚀 Features
- **Search for Movies and Series** 🎥
- **Rate Films (1-5 Stars)** ⭐
- **User Authentication with JWT** 🔐
- **Admin Management** 🛡️
- **Cloud Image Storage** 📷

---

## 🔗 Link
https://moreorless.up.railway.app/

## 🛠️ Technologies Used

### **Frontend**
-  HTML, CSS, JavaScript for UI 🃏
- Railway (Hosting) ☁️

### **Backend**
- Node.js, Express.js ⚛️
- Railway (Hosting) ☁️

### **Database**
- MongoDB Atlas (Free 500MB) 🗄️

### **Image Storage**
- Cloudinary (Free Plan) 📷

---

## 🚧 Setup Instructions

### 1. Clone the Repository
First, clone the project onto your local machine:

- git clone <repository-link>
- cd <repository-folder>

### 2. Backend Setup
**a - Install Dependencies**
- Navigate to the backend directory and install the required dependencies:

- cd backend
- npm install

**b - Set Up Environment Variables**

Create a `.env` file in the backend directory with the following content:

- MONGO_URI=<your-mongodb-connection-string>
- CLOUDINARY_API_KEY=<your-cloudinary-api-key>
- CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
- SECRET_KEY=<your-jwt-secret-key>
- PORT=5000

**c - Start the Backend Server**

Run the following command to start the backend:

- npm start

The backend will run at `http://localhost:5000`.

### 3. Frontend Setup
**a - Update API URLs**

Update all API calls in the frontend to point to the backend's local address (for development purposes):

- const apiUrl = 'http://localhost:5000';

Replace `apiUrl` wherever the backend URL is used (e.g., in fetch calls).

**b - Open the Frontend**

Since the frontend is static, simply open the `index.html` file in a web browser.

### 4. Database Setup
**a - MongoDB Cluster**

The project uses MongoDB Atlas as the database. Ensure you:

- Create an account on MongoDB Atlas.

- Set up a free cluster.

- Obtain the connection string and replace `<your-mongodb-connection-string>` in the `.env` file.

**b - Initial Data**
- Use the `/api/auth/`register route to create users via the frontend.

- Use the `/api/movies` endpoint to add new movie records (admin only).

### 5. Testing the Application
**a - Authentication**
- Test the `/api/auth/` register and `/api/auth/` login routes for registering and logging in users.

- Use the JWT token returned from login for authorized actions.

**b - Movie Features**
- Use `/api/movies` to fetch a list of movies.

- Use `/api/movies/:id/`review to add or update reviews for a movie.

**c Admin Features**
- Create, update, or delete movies using `/api/movies` (requires admin privileges).

---

## 📌 API Endpoints

### 🎞️ 1. Movie Search API
**Endpoint:** `/api/movies`  
**Method:** `GET`  
**Description:** Allows users logged in and not logged in, to search for movies by title and genre.  
**Example Request:**  
```http
GET /API/movies/search?title=The Batman
```
**Response:**
```json
{
  "movies": [
    {"title": "The Batman","genre": "Action" "Drama", "rating": 4, "year": 2022,
    "poster": "...jpg"}
  ]
}
```

---

### ⭐ 2. Movie Rating API
**Endpoint:** `/api/movies/{id}/review`  
**Method:** `POST`  
**Authorization:** Requires User JWT Token.
**Request Body:**
```json
{
  "rating": 1 to 5
}
```
**Response:**
```json
{ "status": "Rating successfully saved" }
```

---

### 🎞️ 3. Add or Update Movie Review API
**Endpoint:** `/api/movies/:id/review`  
**Method:** `POST`  
**Authorization:** Requires User JWT Token. 
**Request Body:**
```json
{
  "rating": 5
}
```
**Response: (Successful Review Update):**
```json
{ 
  "message": "Review added/updated successfully"
}
```

---

### 🔐 4. User Authentication API
**Endpoint:** `/api/auth/register`  
**Method:** `POST`  
**Request Body:**
```json
{
  "name": "Peter Parker",
  "email": "spider@example.com",
  "password": "iamspiderman"
}
```
**Response: (Successful registration):**
```json
{
  "message": "User registered successfully!"
}
```
**Response: (If email already exists):**
```json
{
  "error": "User already exists."
}
```

---

### ▶️ 5. Login User API
**Endpoint:** `/api/auth/login`  
**Method:** `POST`  
**Request Body:**
```json
{
  "email": "spider@example.com",
  "password": "iamspiderman"
}
```
**Response: (Successful login)**
```json

{ 
  "token": "your_jwt_token_here",
  "username": "Peter Parker"
}
```
**Response: (Invalid credentials)**
```json
{
  "error": "Invalid credentials"
}
```

---

### 🧙‍♂️ 6. Add New Movie (Admin Only) API
**Endpoint:** `/api/movies`  
**Method:** `POST`  
**Authorization:** Requires Admin JWT Token.. 
**Request Body:**
```json
{
   "title": "New Movie",
  "genre": ["Action", "Adventure"],
  "rating": 4,
  "year": 2023,
  "type": "movie",
  "poster": "image_url"
}
```
**Response: (Successful addition)**
```json

{ 
  "message": "Movie added successfully!",
  "movie": {
    "title": "New Movie",
    "genre": ["Action", "Adventure"],
    "rating": 4.5,
    "year": 2023,
    "type": "movie",
    "poster": "image_url"
  }
}
```

---

## ❌ Error Handling
- `400 Bad Request` – Invalid input (e.g., missing parameters)
- `401 Unauthorized` – Invalid or missing JWT token
- `404 Not Found` – Resource not found
- `500 Internal Server Error` – Unexpected server issue

---

## 🎨 Planned UI
**Home Page**

![Image](https://github.com/user-attachments/assets/dbf16768-5bd0-4622-b3ad-9a22a8c05db9)

**Filme Page**

![Image](https://github.com/user-attachments/assets/28a0b9ea-5beb-439f-9b7a-53d3b372088c)

**Movie Description (when logged in)**

![Image](https://github.com/user-attachments/assets/860bbbce-288c-455e-b11c-59b4c338bbc5)

**User Profile**

![Image](https://github.com/user-attachments/assets/fd379f82-3d19-4c1e-aeab-3be41095e9fe)

UI design referencesy:
- [Letterboxd](https://letterboxd.com)
- [Rotten Tomatoes](https://www.rottentomatoes.com)
- [IMDb](https://www.imdb.com/)

---

## 📜 ER Diagram
![Image](https://github.com/user-attachments/assets/b2932629-2138-4b09-a2f8-6e4d1180dc2e)

---





