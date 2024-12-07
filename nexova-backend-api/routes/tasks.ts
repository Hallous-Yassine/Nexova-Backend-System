import express from "express"
import auth from "../middlewares/auth"

import { createTask, getMyTasks, completeTask } from "./../handlers/tasks"

const taskRouter = express.Router()

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */
taskRouter.get("/", auth, getMyTasks)

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Task 1"
 *               description:
 *                 type: string
 *                 example: "Description of task 1"
 *               status:
 *                 type: string
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: Task created
 */
taskRouter.post("/", auth, createTask)

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Complete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to complete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task completed
 */
taskRouter.put("/:id", auth, completeTask)

export default taskRouter