import {
  login,
  getMyProfile,
  logout,
} from "./../handlers/user"
import auth from "../middlewares/auth"
import express from "express"

const userRouter = express.Router()


/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 */
userRouter.get("/profile", auth, getMyProfile)


/**
 * @swagger
 * /user/auth:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "mralaabarka@gmail.com"
 *               password:
 *                 type: string
 *                 example: "hello world"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 4
 *                     full_name:
 *                       type: string
 *                       example: "Alaa Barka"
 *                     phone:
 *                       type: string
 *                       example: "54324884"
 *                     email:
 *                       type: string
 *                       example: "mralaabarka@gmail.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-18T01:36:43.936Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-18T01:36:43.936Z"
 *       400:
 *         description: Invalid credentials
 */
userRouter.post("/auth", login)

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout the user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT token for the user session
 *                 example: Bearer <JWT>
 *     responses:
 *       200:
 *         description: Successfully logged out the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 *       400:
 *         description: Token is required to log out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Token is required to log out"
 *       500:
 *         description: An error occurred during logout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred during logout"
 */
userRouter.post("/logout", auth, logout);


export default userRouter
