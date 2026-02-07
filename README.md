🛒 Grocery Tracker – Frontend (React)

This is the frontend part of the Grocery Tracker CRUD Application, built using React.
It allows users to add, view, update, and delete grocery items by communicating with a Spring Boot backend through REST APIs.

The application is Dockerized and deployed online.

🚀 Technologies Used

React

JavaScript (ES6)

HTML

CSS

Fetch API

Docker

✨ Features

Add grocery items with quantity

View all grocery items

Update grocery item details

Delete grocery items

Real-time interaction with backend APIs

Deployed frontend connected to live backend
<img width="883" height="491" alt="image" src="https://github.com/user-attachments/assets/86583b42-ea34-4c42-980f-0a0ffe74c116" />


🔗 Backend API
Local (Development)
http://localhost:8080/api/groceries

Production (Render)
https://<your-render-backend-url>/api/groceries


(Frontend is configured to use the deployed backend URL)

🌐 Live Demo

Frontend is deployed using Vercel:

👉 https://grocery-tracker-frontend-peach.vercel.app

▶️ How to Run the Frontend (Local)
1️⃣ Clone the repository
git clone https://github.com/3BCA23SUCA32/grocery_tracker_frontend.git
cd grocery_tracker_frontend

2️⃣ Install dependencies
npm install

3️⃣ Start the application
npm start

4️⃣ Open in browser
http://localhost:3000
<img width="1042" height="493" alt="image" src="https://github.com/user-attachments/assets/c4d736dc-beda-4b0f-8063-4f3ad9868181" />

🐳 Run Frontend Using Docker
1️⃣ Build Docker image
docker build -t grocery-tracker-frontend .

2️⃣ Run Docker container
docker run -p 3000:3000 grocery-tracker-frontend

3️⃣ Open in browser
http://localhost:3000

📂 Project Structure
src/
 ├── App.js
 ├── index.js
 ├── components/
 ├── services/
public/
Dockerfile
package.json
README.md

✅ Deployment Summary

Frontend: React + Docker → Vercel

Backend: Spring Boot + Docker → Render

Communication: REST APIs

👨‍💻 Developed By

Dhanvarsha B
Grocery Tracker – Full Stack Project

