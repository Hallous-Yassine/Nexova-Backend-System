import express from "express";
import http from "http"; // To create the server for both HTTP and WebSocket
import "dotenv/config";
import { healthRouter, userRouter, adminRouter, deviceRouter, sensorRouter, taskRouter, } from "./routes";
import color from "cli-color";
import { displaySignature } from "./cmd/signature";
import { appDataSource } from "./config";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import options from "./swagger/swagger";
import cors from "cors";
import { initializeSocket } from "./websockets/socket"; // WebSocket pour alertes

const app = express()
const server = http.createServer(app);

const specs = swaggerJsdoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

const port: number = Number(process.env.PORT) || 3000
app.use(express.json())
app.use(cors())

// Routes
app.use("/health", healthRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/device", deviceRouter);
app.use("/sensor", sensorRouter);
app.use("/task", taskRouter)

server.listen(port, () => {
  console.log(color.red(displaySignature));
  console.log(`Server is running on port ${port}`);

  appDataSource.initialize().then(() => {
    console.log("Database connection established");
    initializeSocket(server); // WebSocket 
  });
});
