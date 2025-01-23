
# Student Housing App

A web application for student housing management built with **React** for the front-end and **Spring Boot** for the back-end.

## Technologies Used
- **Frontend**: React  
- **Backend**: Spring Boot  
- **Deployment**:  
  - Spring Boot: [Railway](https://railway.app)  
  - React: [Vercel](https://vercel.com)  

---

## Prerequisites
- [Node.js](https://nodejs.org/) (for React)
- [Java](https://www.oracle.com/java/technologies/javase-downloads.html) (for Spring Boot)
- [Maven](https://maven.apache.org/) (for Spring Boot)
- [Git](https://git-scm.com/) (for version control)

---

## Installation Steps

### For Frontend (React)
1. Clone the repository:
   ```bash
   git clone https://github.com/anurag-joshi11/nextroom-app.git
   cd student-housing-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. Visit [http://localhost:5173](http://localhost:5173) to view the app.

### For Backend (Spring Boot)
1. Clone the repository and navigate to the backend directory:
   ```bash
   git clone https://github.com/your-username/student-housing-app.git
   cd student-housing-app/backend
   ```

2. Build the Spring Boot application:
   ```bash
   ./mvnw clean install
   ```

3. Run the Spring Boot app locally:
   ```bash
   ./mvnw spring-boot:run
   ```

4. Visit [http://localhost:8080](http://localhost:8080) to check the backend.

---

## Deployment

### Frontend (Vercel)
1. Push the frontend code to GitHub.
2. Create a [Vercel](https://vercel.com) account and link it to your GitHub.
3. Import the project on Vercel.  
4. Vercel automatically detects React and sets up the deployment.  
5. Once deployed, Vercel provides a public URL for the frontend.

### Backend (Railway)
1. Push the backend code to GitHub.  
2. Create a [Railway](https://railway.app) account and link it to your GitHub.  
3. Create a new project on Railway, selecting the backend repository.  
4. Configure environment variables, if needed (e.g., database URLs).  
5. Railway automatically deploys the Spring Boot app.

---

## Features
- **Registration**: Students and Landlords can register and create profiles.  
- **Room Listings**: Landlords can list available rooms and apartments.
- **Inquiry**: Students can inquire about proprties.

---

## Notes
- Ensure the backend is deployed and running before connecting the frontend.  
- Configure API endpoints appropriately for production environments.
