📡 MD Reviews and Ratings – API Endpoints Table
#	Feature	Endpoint	Method	Auth Required	Description
1️⃣	Search Movies/Series	/api/movies/search?title=Batman	GET	❌ No	Searches movies or series by title (and optionally genre).
2️⃣	Rate a Movie	/api/movies/:id/review	POST	✅ Yes (User JWT)	Submits or updates a rating (1 to 5) for a specific movie.
3️⃣	Register a User	/api/auth/register	POST	❌ No	Creates a new user account.
4️⃣	Login a User	/api/auth/login	POST	❌ No	Logs in a user and returns a JWT token.
5️⃣	Admin: Add a Movie	/api/movies	POST	✅ Yes (Admin JWT)	Adds a new movie to the database.
6️⃣	Get All Movies	/api/movies	GET	❌ No	Lists all movies or series available in the database.

🔄 Example Payloads & Responses
📝 Register a User
Request:

json
Copy
Edit
{
  "name": "Peter Parker",
  "email": "spider@example.com",
  "password": "iamspiderman"
}
Response:

json
Copy
Edit
{ "message": "User registered successfully!" }
🔐 Login a User
Request:

json
Copy
Edit
{
  "email": "spider@example.com",
  "password": "iamspiderman"
}
Response:

json
Copy
Edit
{
  "token": "your_jwt_token_here",
  "username": "Peter Parker"
}
⭐ Rate a Movie
Endpoint: POST /api/movies/:id/review
Request:

json
Copy
Edit
{
  "rating": 4
}
Response:

json
Copy
Edit
{ "message": "Review added/updated successfully" }
🎞️ Admin: Add a Movie
Endpoint: POST /api/movies
Request:

json
Copy
Edit
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
Copy
Edit
{
  "message": "Movie added successfully!",
  "movie": { ... }
}
❌ Common Error Responses
Code	Description
400	Bad Request – Invalid or missing parameters
401	Unauthorized – JWT token missing or invalid
404	Not Found – Resource does not exist
500	Internal Server Error – Unexpected server issue
