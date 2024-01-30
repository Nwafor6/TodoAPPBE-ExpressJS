const router = require("express").Router();
const {signUp,Login, SendMail, UpdateProfile, UpdateProfileImg}=require("../Controllers/AuthController")

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - username
 *         - email
 *         - password
*     UpdateUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         new_password:
 *           type: string
 *         img:
 *            type: string
 *
 * /signup:
 *   post:
 *     summary: Create a new user account.
 *     description: Creates a new user with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               userId: 123
 *               username: example_user
 *               email: user@example.com
 *               success: true
 *               message: Registration successuful.
 *               token: ehbeuwebiunjofejdgbwe
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal Server Error
 * /update-profile/{id}:
 *   put:
 *     summary: Update users profile
 *     description: To update a user's profile, user is required to login and have an access token. 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUser'
 *             example:
 *               userId: 123
 *               username: example_user
 *               email: user@example.com
 *               success: true
 *               message: Registration successuful.
 *               token: ehbeuwebiunjofejdgbwe
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal Server Error
 */
router.post("/signup", signUp)
module.exports= router;