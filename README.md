<p align="center">
  <h1><strong>StudyNotion - EdTech Online Education Platform</strong></h1>
</p>

## **Features**

- **Student Dashboard**: Track progress, view courses, and manage personal details.
- **Instructor Dashboard**: Add, edit, and manage courses, track student progress.
- **Course Management**: Create, update, and publish courses easily.
- **Payment Integration**: Secure payment through Razorpay for course purchases.
- **Progress Tracking**: Students and instructors can track course progress.
- **Responsive Design**: Optimized for both mobile and desktop devices.

## **Technologies Used**

- **Frontend**: React.js, Tailwind CSS, Vite (for development)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens) for secure login
- **Payment Gateway**: Razorpay for processing payments
- **File Uploads**: Cloudinary for media hosting
- **State Management**: Redux
- **Email Services**: NodeMailer for email notifications

## **Setup Instructions**

### **Prerequisites**

Before setting up the project, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (for local development) or MongoDB Atlas (for cloud database)
- Razorpay account (for integrating the payment gateway)
- Cloudinary account (for media file hosting)

### **Clone the Repository**

Clone the project from GitHub:

```bash
git clone https://github.com/Prajjwal-Rawat/StudyNotion.git
cd StudyNotion


Backend Setup
Navigate to the backend directory:

cd backend
Install the backend dependencies:


npm install
Create a .env file in the backend directory and add the following environment variables:

DB_URI=your_database_uri
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Run the backend server:


npm start


Frontend Setup
Navigate to the frontend directory:


cd frontend
Install the frontend dependencies:


npm install
Run the frontend development server:


npm run dev
The frontend should now be running on http://localhost:3000.
```

## **Connecting Frontend and Backend**
Make sure your backend server is running when you are working on the frontend. The frontend will make API requests to the backend to fetch courses, handle user authentication, and process payments.

## **Folder Structure**
backend/: Contains the backend code (API routes, database models, controllers, etc.).
frontend/: Contains the frontend code (React components, Redux state, UI components, etc.).
.env: Environment configuration file (not tracked by Git).
.gitignore: Specifies which files and directories to ignore in version control.
