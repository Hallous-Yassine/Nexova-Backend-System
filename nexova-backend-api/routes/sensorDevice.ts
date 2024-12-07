import {
    registerDevice,
    updateDevice,
    deleteDevice,
    getAll,
    getOne,
} from "../handlers/sensorDevice"
import auth from "../middlewares/auth"
import express from "express"
import verifyAdmin from "../middlewares/verifyAdmin"

const deviceRouter = express.Router()

/**
 * @swagger
 * /registerDevice:
 *   post:
 *     summary: Register a new IoT device
 *     tags:
 *       - IoT Devices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_name:
 *                 type: string
 *                 example: "Temperature Sensor"
 *               device_type:
 *                 type: string
 *                 example: "sensor"
 *               location:
 *                 type: string
 *                 example: "Warehouse 3"
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - inactive
 *                   - faulty
 *                 example: "active"
 *     responses:
 *       201:
 *         description: IoT device registered successfully
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
 *                   example: "IoT device registered successfully"
 *                 device:
 *                   type: object
 *                   properties:
 *                     device_id:
 *                       type: number
 *                       example: 1
 *                     device_name:
 *                       type: string
 *                       example: "Temperature Sensor"
 *                     device_type:
 *                       type: string
 *                       example: "sensor"
 *                     location:
 *                       type: string
 *                       example: "Warehouse 3"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-22T14:36:43.936Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-22T14:36:43.936Z"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

deviceRouter.post("/register", auth, verifyAdmin , registerDevice);

/**
 * @swagger
 * /updateDevice/{id}:
 *   put:
 *     summary: Update an existing IoT device
 *     tags:
 *       - IoT Devices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the IoT device to update
 *         schema:
 *           type: string
 *           example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_name:
 *                 type: string
 *                 example: "Updated Temperature Sensor"
 *               device_type:
 *                 type: string
 *                 example: "sensor"
 *               location:
 *                 type: string
 *                 example: "Updated Warehouse 3"
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - inactive
 *                   - faulty
 *                 example: "inactive"
 *     responses:
 *       200:
 *         description: IoT device updated successfully
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
 *                   example: "Device updated successfully"
 *                 device:
 *                   type: object
 *                   properties:
 *                     device_id:
 *                       type: string
 *                       example: "1"
 *                     device_name:
 *                       type: string
 *                       example: "Updated Temperature Sensor"
 *                     device_type:
 *                       type: string
 *                       example: "sensor"
 *                     location:
 *                       type: string
 *                       example: "Updated Warehouse 3"
 *                     status:
 *                       type: string
 *                       example: "inactive"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-22T14:36:43.936Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-23T10:30:43.936Z"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Device not found
 */

deviceRouter.put("/update/:id", auth, verifyAdmin, updateDevice);

/**
 * @swagger
 * /deleteDevice/{id}:
 *   delete:
 *     summary: Delete an existing IoT device
 *     tags:
 *       - IoT Devices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the IoT device to delete
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: IoT device deleted successfully
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
 *                   example: "Device deleted successfully"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Device not found
 */
deviceRouter.delete("/delete/:id", auth, verifyAdmin, deleteDevice);

deviceRouter.get("/getAll", auth, verifyAdmin, getAll);

deviceRouter.get("/getOne/:id", auth, verifyAdmin, getOne);

export default deviceRouter
