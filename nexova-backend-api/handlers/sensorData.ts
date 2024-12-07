import { Request, Response } from "express";
import {
  getAllSensorData,
  getSensorDataById,
  FindOneBy,
  getHistoricalData,
  addSensorData,
} from "../services/sensorData";

/**
 * Récupère toutes les données des capteurs.
 */
export const GetAllSensorData = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getAllSensorData();
    res.status(200).send({
      status: "success",
      message: "Toutes les données récupérées avec succès.",
      data: data,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de toutes les données:", error);
    res.status(500).send({
      status: "error",
      message: "Impossible de récupérer les données des capteurs.",
    });
  }
};

/**
 * Récupère une donnée spécifique par ID.
 */
export const GetSensorDataById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      res.status(400).send({
        status: "error",
        message: "Id est requis.",
      });
      return;
    }

    const data = await getSensorDataById(id);
    if (!data) {
      res.status(404).send({
        status: "error",
        message: "Donnée introuvable avec cet ID.",
      });
      return;
    }

    res.status(200).send({
      status: "success",
      message: "Donnée récupérée avec succès.",
      data: data,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données par ID:", error);
    res.status(500).send({
      status: "error",
      message: "Impossible de récupérer la donnée des capteurs par ID.",
    });
  }
};

/**
 * Cherche des données selon des critères spécifiques.
 */
export const FindSensorDataBy = async (req: Request, res: Response): Promise<void> => {
  try {
    const { field, value } = req.query;

    // Validation des critères
    if (!field || !value) {
      res.status(400).send({
        status: "error",
        message: "Les critères de recherche doivent inclure 'field' et 'value'.",
      });
      return;
    }

    // Recherche des données
    const data = await FindOneBy(field as string, value);

    if (!data) {
      res.status(404).send({
        status: "error",
        message: `Aucune donnée trouvée pour le champ '${field}' avec la valeur '${value}'.`,
      });
      return;
    }

    res.status(200).send({
      status: "success",
      message: "Données trouvées avec succès.",
      data,
    });
  } catch (error: any) {
    console.error("Erreur lors de la recherche des données:", error.message || error);
    res.status(500).send({
      status: "error",
      message: "Impossible de rechercher des données selon les critères spécifiés.",
    });
  }
};

/**
 * Récupère les données historiques pour un appareil spécifique.
 */
export const GetHistoricalData = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.device_id);

    if (!id) {
      res.status(400).send({
        status: "error",
        message: "Id de l'appareil est requis.",
      });
      return;
    }

    const data = await getHistoricalData(id);
    if (!data.length) {
      res.status(404).send({
        status: "error",
        message: "Aucune donnée historique trouvée pour cet appareil.",
      });
      return;
    }

    res.status(200).send({
      status: "success",
      message: "Données historiques récupérées avec succès.",
      data: data,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données historiques:", error);
    res.status(500).send({
      status: "error",
      message: "Impossible de récupérer les données historiques pour l'appareil spécifié.",
    });
  }
};

/**
 * Ajoute de nouvelles données des capteurs.
 */
export const AddSensorData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { device, timestamp, data_type, value } = req.body;

    // Vérification des champs obligatoires
    if (!device?.device_id || !timestamp || !data_type || value === undefined) {
      res.status(400).send({
        status: "error",
        message: "Les champs obligatoires sont manquants. Veuillez inclure 'device.device_id', 'timestamp', 'data_type', et 'value'.",
      });
      return;
    }

    // Vérification de la validité du timestamp
    if (isNaN(Date.parse(timestamp))) {
      res.status(400).send({
        status: "error",
        message: "Le champ 'timestamp' doit être une date valide.",
      });
      return;
    }

    const addedData = await addSensorData({ device, timestamp, data_type, value });
    res.status(201).send({
      status: "success",
      message: "Données ajoutées avec succès.",
      data: addedData,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de nouvelles données:", error);
    res.status(500).send({
      status: "error",
      message: "Impossible d'ajouter les données du capteur.",
    });
  }
};
