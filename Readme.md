---

# ToDo API with User Dashboard and Login Functionalities

This project is an Express.js API endpoint that provides ToDo management capabilities along with user dashboard and login functionalities. It uses various popular libraries and technologies like bcrypt, JWT, MongoDB, and nodemailer to achieve a secure and efficient user experience.

## Prerequisites

Make sure you have Node.js and MongoDB installed on your system.

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nwafor6/TodoAPPBE-ExpressJS.git
   cd TodoAPPBE-ExpressJS
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGODB_URI=YOUR_MONGODB_URI
   JWT_SECRET=YOUR_JWT_SECRET
   EMAIL_SERVICE=YOUR_EMAIL_SERVICE
   EMAIL_USER=YOUR_EMAIL_USER
   EMAIL_PASS=YOUR_EMAIL_PASSWORD
   ```

   Replace `YOUR_MONGODB_URI` with your MongoDB connection URI, `YOUR_JWT_SECRET` with a secret key for JWT, and `YOUR_EMAIL_SERVICE`, `YOUR_EMAIL_USER`, and `YOUR_EMAIL_PASSWORD` with your email service credentials for nodemailer.

4. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

- **POST /sign**

  Register a new user.

  Request Body:

  ```json
  {
    "email": "user@example.com",
    "username":"Jogn",
    "password": "password"
  }
  ```

- **POST /login**

  User login.

  Request Body:

  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **PUT /update-profile/:id**

  Uodate profile.

  Request Body:

  ```json
  {
    "username":"Jogn",
    "password": "password",
    "new_password":"new_password"
  }
  ```
   ```
- **PUT /uploads/update-pic/:id**

  Uodate profile image.

 
- **GET /tasks**

  Get all todos for the authenticated user.

- **POST /add-todo**

  Create a new todo.

  Request Body:

  ```json
  {
    "title": "Task Title",
  }
  ```

- **PUT /tasks/:id**

  Update a todo by ID.

  Request Body:

  ```json
  {
    "title": "Updated Task Title",
  }
  ```

- **DELETE /tasks/:id**

  Delete a todo by ID.

## Libraries and Technologies Used

- [Express.js](https://expressjs.com/) - Web application framework for Node.js
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing library
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token implementation
- [mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
- [nodemailer](https://nodemailer.com/) - Email sending library
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable management
- [cors](https://www.npmjs.com/package/cors) - Cross-origin resource sharing middleware
- [multer](https://www.npmjs.com/package/multer) - Middleware for handling `multipart/form-data`

## Contributing

Feel free to open issues and pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README according to your project's specific features and functionalities. Let me know if you need further assistance!