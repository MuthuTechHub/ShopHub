# ShopHub – Full Stack Mini E-Commerce Web Application

## Project Overview

ShopHub is a full-stack web-based e-commerce web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js).  

The system provides a secure and scalable online shopping platform where:

- Customers can browse products, manage cart, and place orders  
- Administrators can manage products, categories, and monitor sales  

The application follows a modular architecture and RESTful API structure for maintainability and scalability.

---

## Features

### Customer Features
- User registration and login
- JWT-based authentication
- Browse products with category filtering
- View detailed product information
- Add to cart and wishlist
- Dynamic cart quantity update
- Order placement and order history
- Profile management

### Admin Features
- Secure admin dashboard
- Add, update, and delete products
- Manage categories
- Update stock availability
- Monitor orders and update order status
- View analytics (users, products, orders, revenue)

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- React.js
- Axios / Fetch API

### Backend
- Node.js
- Express.js
- JWT Authentication
- Middleware validation

### Database
- MongoDB
- Mongoose ODM

---

## Project Structure

```
client/      → React frontend
server/      → Node.js + Express backend
```

---

## Environment Configuration

Inside the `server` folder, create a `.env` file and add the following variables:

```
DATABASE=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
BRAINTREE_MERCHANT_ID=your_merchant_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key
```

### Important Notes

- Use your own MongoDB connection string  
- Use your own JWT secret key  
- Use your own Braintree API credentials  
- Never upload `.env` file to GitHub  
- Never expose API keys publicly  

Make sure `.env` is added in your `.gitignore` file.

---

## Installation

Open terminal inside project root directory.

Install frontend dependencies:

```
cd client
npm install
```

Install backend dependencies:

```
cd server
npm install
```

---

## Running the Application

Start backend server:

```
cd server
npm run start:dev
```

Start frontend:

```
cd client
npm start
```

Open browser and visit:

```
http://localhost:3000/
```

---

## Deployment (Optional)

### Backend Deployment
You can deploy backend using:
- Render
- Railway
- Cyclic
- Any Node.js hosting platform

Before deployment:
- Replace DATABASE with MongoDB Atlas connection string
- Add all environment variables in hosting platform settings
- Do not upload `.env` file

### Frontend Deployment
You can deploy frontend using:
- Vercel
- Netlify

Update backend API base URL before deployment.

---

## Security Features

- JWT-based authentication
- Password encryption using bcrypt
- Role-based access control
- Protected API routes
- Input validation (client and server side)

---

## Developed By

Muthukumar M  
MCA Student  
Full Stack Developer (MERN)
