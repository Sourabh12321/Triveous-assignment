# Triveous-assignment


This is an API for managing the backend operations of an e-commerce website, encompassing functions such as user authentication, product management, cart management, and order processing.
## Backend Deployed link :- https://triveous-assignment-dh5v.onrender.com

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Routes](#routes)
- [API Documentation](#api-documentation)

## Features

- User registration and login with JSON Web Token (JWT) authentication.
- Product management: Add, retrieve, and search for products by category.
- Cart management: Add, remove, and update product quantities in the shopping cart.
- Order processing: Place orders and access order history.

## Technologies Used

- **Node.js**: A JavaScript runtime for server-side development.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing data.
- **JWT**: JSON Web Tokens for authentication.
- **Swagger**: API documentation tool.
- **Other Dependencies**: Various Node.js libraries and modules.

## Getting Started

### Prerequisites

Before getting started, make sure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/Sourabh12321/Triveous-assignment.git
   ```
   
2. Navigate to the project directory:
   ```
   cd Triveous-assignment
   npm init -y
   ```
   
3. Install dependencies:
   ```
   npm install express mongoose bcrypt jsonwebtoken swagger-jsdoc swagger-ui-express
   ```

4. Application Start
   ```
   node index.js
   ```


## Usage
### Authentication
To access protected routes, you need to authenticate by obtaining a JWT token. You can achieve this by making a POST request to the /users/login route to log in and obtain the token.


## Routes
### User Routes
```
User Registration: POST /users/signup
User Login: POST /users/login
```
### Product Routes
```
Add a Product: POST /products/AddProduct
Get Product Categories: GET /products/product-types
Get Products: GET /products/products
Get Product by ID: GET /products/product-info/{id}
```
### Cart Routes
```
Add to Cart: POST /carts/add-to-cart/{productId}
Remove from Cart: DELETE /carts/remove-from-cart/{productId}
Get Cart Contents: GET /carts/cart
Increase Product Quantity in Cart: POST /carts/increase-quantity/{productId}
Decrease Product Quantity in Cart: POST /carts/decrease-quantity/{productId}
```

### Order Routes
```
Place an Order: POST /orders/place-order
Get Order Details: GET /orders/user-orders
Get Order by ID: GET /orders/order/{orderId}
```
## API Documentation
### User-swagger

![Screenshot 2023-09-01 214822](https://github.com/Sourabh12321/Triveous-assignment/assets/112754483/196d2536-ae0c-4fd6-843d-71f6ca14c64f)


### Products-swagger
![Screenshot 2023-09-01 214756](https://github.com/Sourabh12321/Triveous-assignment/assets/112754483/bd8736bc-6210-4ccd-84b4-6077155a0df2)



### Cart-swagger

![Screenshot 2023-09-01 214623](https://github.com/Sourabh12321/Triveous-assignment/assets/112754483/124df111-ed21-420e-bfc6-9d4a6a6c0252)


### order-swagger

![Screenshot 2023-09-01 214730](https://github.com/Sourabh12321/Triveous-assignment/assets/112754483/b7f06f59-8a1e-4edc-bd0b-6f313f620b36)

For detailed API documentation, visit the Swagger Documentation.
