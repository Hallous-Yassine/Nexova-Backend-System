import express from "express";
import {
  GetAllSensorData,
  GetSensorDataById,
  FindSensorDataBy,
  GetHistoricalData,
  AddSensorData,
} from "../handlers/sensorData";

import auth from "../middlewares/auth";
import verifyAdmin from "../middlewares/verifyAdmin";

const sensorRouter = express.Router();

// Route pour récupérer toutes les données
sensorRouter.get("/", auth, verifyAdmin , GetAllSensorData);

// Route pour récupérer une seule donnée par ID
sensorRouter.get("/:id", auth, verifyAdmin , GetSensorDataById);

// exp : ../find?field=device_id&value=123
sensorRouter.get("/find", auth, verifyAdmin , FindSensorDataBy);

// Route pour récupérer les données historiques d'un appareil
sensorRouter.get("/history/:id", auth, verifyAdmin , GetHistoricalData);

// Route pour ajouter des données
sensorRouter.post("/", auth, verifyAdmin , AddSensorData);

export default sensorRouter;
