# 🎬 More or Less 

The **More or Less** website was thought for film enthusiasts, allowing users to search and rate films and series. The goal is to provide a simple yet comprehensive experience for both experienced moviegoers and those less familiar with the art of cinema. 

As a user, you rate and view ratings from other platform members and receive personalized recommendations based on their reviews of various films.

## 🚀 Features
- **Search for Movies and Series** 🎥
- **Rate Films (1-5 Stars)** ⭐
- **Get Personalized Recommendations** 🎯
- **User Authentication with JWT** 🔐

---

## 🛠️ Technologies Used

### **Frontend**
-  Python + Flask 🐍
- TailwindCSS 🎨
- Vercel (Hosting) ☁️

### **Backend**
- React.js + Vite ⚛️
- Railway (Hosting) 🚆

### **Database**
- MongoDB Atlas (Free 500MB) 🗄️

### **Image Storage**
- Cloudinary (Free Plan) 📷

### **AI for Recommendations**
- Python + Flask 🤖
  

---

## 📌 API Endpoints

### 🎞️ 1. Movie Search API
**Endpoint:** `/API/movies/search`  
**Method:** `GET`  
**Description:** Allows users logged in and not logged in, to search for movies by title and genre.  
**Example Request:**  
```http
GET /API/movies/search?title=TheGodFather
```
**Response:**
```json
{
  "movies": [
    { "title": "The Godfather", "rating": 5 }
  ]
}
```

---

### ⭐ 2. Movie Rating API
**Endpoint:** `/API/movies/{id}/rating`  
**Method:** `POST`  
**Authorization:** Requires authentication  
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

### 🎯 3. Movie Recommendations API
**Endpoint:** `/API/movies/recommendations`  
**Method:** `GET`  
**Authorization:** Requires authentication  
**Response:**
```json
{
  "recommendations": [ "Inception", "Interstellar" ]
}
```

---

### 🔐 4. User Authentication API
**Endpoint:** `/API/users/login`  
**Method:** `POST`  
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "token": "your_jwt_token_here"
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





