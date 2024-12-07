import {
  createAdmin,
  getAllAdmins,
  getOneAdmin,
  login,
  getMyProfile,
  logout,
  updateAdmin,
  deleteAdmin,
} from "../handlers/admin";

import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser
} from "../handlers/user";

import auth from "../middlewares/auth";
import express from "express";
import verifyAdmin from "../middlewares/verifyAdmin";

const adminRouter = express.Router();

/**
 * @swagger
 * /admin/createAdmin:
 *   post:
 *     summary: Create a new admin
 *     tags:
 *       - Admins
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "Admin Name"
 *               phone:
 *                 type: string
 *                 example: "54324884"
 *               password:
 *                 type: string
 *                 example: "admin"
 *               email:
 *                 type: string
 *                 example: "admin@gmail.com"
 *     responses:
 *       201:
 *         description: Admin created successfully
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
 *                   example: "Admin created successfully"
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     full_name:
 *                       type: string
 *                       example: "Admin Name"
 *                     phone:
 *                       type: string
 *                       example: "54324884"
 *                     email:
 *                       type: string
 *                       example: "admin@gmail.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:17:29.584609"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:17:29.584609"
 *       400:
 *         description: Bad request
 */
adminRouter.post("/createAdmin", auth, verifyAdmin, createAdmin);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags:
 *       - Admins
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@gmail.com"
 *               password:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Login successful, returns admin details and token
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
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     full_name:
 *                       type: string
 *                       example: "Admin Name"
 *                     phone:
 *                       type: string
 *                       example: "54324884"
 *                     email:
 *                       type: string
 *                       example: "admin@gmail.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:17:29.584609"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:17:29.584609"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
adminRouter.post("/login", login);

/**
 * @swagger
 * /admin/logout:
 *   post:
 *     summary: Log out the current admin
 *     tags:
 *       - Admins
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
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
 *                   example: "Logged out successfully"
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */
adminRouter.post("/logout", auth, verifyAdmin , logout);

/**
 * @swagger
 * /admin/getAllAdmins:
 *   get:
 *     summary: Get all admins
 *     tags:
 *       - Admins
 *     responses:
 *       200:
 *         description: List of all admins
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 admins:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       full_name:
 *                         type: string
 *                         example: "Admin Name"
 *                       phone:
 *                         type: string
 *                         example: "54324884"
 *                       email:
 *                         type: string
 *                         example: "admin@gmail.com"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-24T19:17:29.584609"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-24T19:17:29.584609"
 */
adminRouter.get("/getAllAdmins", auth, verifyAdmin, getAllAdmins);

/**
 * @swagger
 * /admin/getAllUsers:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Admins -> Users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       full_name:
 *                         type: string
 *                         example: "User Name"
 *                       phone:
 *                         type: string
 *                         example: "12345678"
 *                       email:
 *                         type: string
 *                         example: "user@gmail.com"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-24T19:23:43.378746"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-24T19:23:43.378746"
 */
adminRouter.get("/getAllUsers", auth, verifyAdmin, getAllUsers);

/**
 * @swagger
 * /admin/getOneAdmin/{id}:
 *   get:
 *     summary: Get details of a specific admin
 *     tags:
 *       - Admins
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the admin to fetch
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Details of the specific admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     full_name:
 *                       type: string
 *                       example: "Admin Name"
 *                     phone:
 *                       type: string
 *                       example: "54324884"
 *                     email:
 *                       type: string
 *                       example: "admin@gmail.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:17:29.584609"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:17:29.584609"
 *       404:
 *         description: Admin not found
 *       400:
 *         description: Invalid ID format
 */
adminRouter.get("/getOneAdmin/:id", auth, verifyAdmin, getOneAdmin);

/**
 * @swagger
 * /admin/profile:
 *   get:
 *     summary: Get the profile of the logged-in admin
 *     tags:
 *       - Admins
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the profile of the logged-in admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     full_name:
 *                       type: string
 *                       example: "Admin Name"
 *                     phone:
 *                       type: string
 *                       example: "54324884"
 *                     email:
 *                       type: string
 *                       example: "admin@gmail.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:17:29.584609"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:17:29.584609"
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */
adminRouter.get("/profile", auth, verifyAdmin, getMyProfile);

/**
 * @swagger
 * /admin/createUser:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Admins -> Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "User Name"
 *               phone:
 *                 type: string
 *                 example: "12345678"
 *               email:
 *                 type: string
 *                 example: "user@gmail.com"
 *               password:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: User created successfully
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
 *                   example: "User created successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     full_name:
 *                       type: string
 *                       example: "User Name"
 *                     phone:
 *                       type: string
 *                       example: "12345678"
 *                     email:
 *                       type: string
 *                       example: "user@gmail.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:23:43.378746"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:23:43.378746"
 *       400:
 *         description: Bad request, missing or invalid fields
 *       401:
 *         description: Unauthorized, admin privileges required
 *       500:
 *         description: Internal server error
 */
adminRouter.post("/createUser", auth, verifyAdmin, createUser);

/**
 * @swagger
 * /admin/getOneUser/{id}:
 *   get:
 *     summary: Retrieve details of a specific user
 *     tags:
 *       - Admins -> Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     full_name:
 *                       type: string
 *                       example: "User Name"
 *                     phone:
 *                       type: string
 *                       example: "12345678"
 *                     email:
 *                       type: string
 *                       example: "user@gmail.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:23:43.378746"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:23:43.378746"
 *       400:
 *         description: Bad request, invalid user ID
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
adminRouter.get("/getOneUser/:id", auth, verifyAdmin, getOneUser);

/**
 * @swagger
 * /admin/updateUser/{id}:
 *   patch:
 *     summary: Update details of a specific user
 *     tags:
 *       - Admins -> Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "Updated User Name"
 *               phone:
 *                 type: string
 *                 example: "87654321"
 *               email:
 *                 type: string
 *                 example: "updateduser@gmail.com"
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                   example: "User updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     full_name:
 *                       type: string
 *                       example: "Updated User Name"
 *                     phone:
 *                       type: string
 *                       example: "87654321"
 *                     email:
 *                       type: string
 *                       example: "updateduser@gmail.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:23:43.378746"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-25T12:34:56.123456"
 *       400:
 *         description: Bad request, invalid data or user ID
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
adminRouter.patch("/updateUser/:id", auth, verifyAdmin, updateUser);

/**
 * @swagger
 * /admin/deleteUser/{id}:
 *   delete:
 *     summary: Delete a specific user
 *     tags:
 *       - Admins -> Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *                   example: "User deleted successfully"
 *       400:
 *         description: Bad request, invalid user ID
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
adminRouter.delete("/deleteUser/:id", auth, verifyAdmin, deleteUser);

/**
 * @swagger
 * /admin/updateAdmin/{id}:
 *   patch:
 *     summary: Update details of a specific admin
 *     tags:
 *       - Admins
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the admin to update
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "Updated Admin Name"
 *               phone:
 *                 type: string
 *                 example: "98765432"
 *               email:
 *                 type: string
 *                 example: "updatedadmin@gmail.com"
 *     responses:
 *       200:
 *         description: Admin updated successfully
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
 *                   example: "Admin updated successfully"
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     full_name:
 *                       type: string
 *                       example: "Updated Admin Name"
 *                     phone:
 *                       type: string
 *                       example: "98765432"
 *                     email:
 *                       type: string
 *                       example: "updatedadmin@gmail.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T19:17:29.584609"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-25T12:34:56.123456"
 *       400:
 *         description: Bad request, invalid data or admin ID
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
adminRouter.patch("/updateAdmin/:id", auth, verifyAdmin, updateAdmin);

/**
 * @swagger
 * /admin/deleteAdmin/{id}:
 *   delete:
 *     summary: Delete a specific admin
 *     tags:
 *       - Admins
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the admin to delete
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Admin deleted successfully
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
 *                   example: "Admin deleted successfully"
 *       400:
 *         description: Bad request, invalid admin ID
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
adminRouter.delete("/deleteAdmin/:id", auth, verifyAdmin, deleteAdmin);


export default adminRouter;
