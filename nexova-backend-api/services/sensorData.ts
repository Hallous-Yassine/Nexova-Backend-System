import { FindOptionsWhere } from "typeorm";
import db from "../config/firebase"; // Firebase Realtime Database instance
import SensorData from "../models/sensorData";
import sensordevice from "../models/sensorDevice";

// Service pour récupérer toutes les données
export const getAllSensorData = async (): Promise<SensorData[]> => {
  return await SensorData.find();
};

// Service pour récupérer une seule donnée par ID
export const getSensorDataById = async (data_id: number): Promise<SensorData | null> => {
  return await SensorData.findOneBy({ data_id });
};

// Service pour chercher des données selon un critère
export const FindOneBy = async (field: string, value: any) => {
  if (!field || !value) {
    throw new Error("Please provide a field and value to search for")
  }
  return await SensorData.findOne({
    where: {
      [field]: value,
    },
  })
}

// Service pour récupérer les données historiques d'un appareil
export const getHistoricalData = async (device_id: number): Promise<SensorData[]> => {
  return await SensorData.find({
    where: { device: { device_id } },
    order: { timestamp: "DESC" },
  });
};

// Service pour ajouter des données
export const addSensorData = async (data: Partial<SensorData>): Promise<SensorData> => {
  // Vérification des champs obligatoires
  if (!data.device || !data.timestamp || !data.data_type || data.value === undefined) {
    throw new Error("Tous les champs obligatoires (device, timestamp, data_type, value) doivent être fournis.");
  }

  // Vérification si l'appareil existe
  const existingDevice = await sensordevice.findOne({
    where: { device_id: data.device?.device_id },
  });

  if (!existingDevice) {
    throw new Error("L'appareil associé à cet ID n'existe pas.");
  }

  // Création et sauvegarde des données
  const sensorData = SensorData.create(data as SensorData);
  return await sensorData.save();
};
