import Alert from "../models/alerts";
import SensorDevice from "../models/sensorDevice";

export const saveAlert = async (alertData: { 
  device_id: number;
  value: number;
  threshold: number;
  message: string;
}): Promise<Alert> => {
  const { device_id, value, threshold, message } = alertData;

  // Vérifiez que l'appareil existe
  const device = await SensorDevice.findOne({ where: { device_id } });
  if (!device) {
    throw new Error(`Device with ID ${device_id} not found.`);
  }

  // Créez une nouvelle alerte
  const alert = new Alert();
  alert.device = device; // Relation avec SensorDevice
  alert.value = value;
  alert.threshold = threshold;
  alert.message = message;

  await alert.save();
  return alert;
};

export const getAllAlerts = async (): Promise<Alert[]> => {
  return await Alert.find({ relations: ["device"] }); // Inclut les détails de l'appareil
};

export const getAlertsByDevice = async (device_id: number): Promise<Alert[]> => {
  const device = await SensorDevice.findOne({ where: { device_id } });
  if (!device) {
    throw new Error(`Device with ID ${device_id} not found.`);
  }

  return await Alert.find({
    where: { device: device }, // Relation avec SensorDevice
    relations: ["device"],
  });
};

export const deleteAlert = async (alert_id: number): Promise<string> => {
  const alert = await Alert.findOne({ where: { alert_id } });
  if (!alert) {
    throw new Error(`Alert with ID ${alert_id} not found.`);
  }

  await alert.remove();
  return `Alert with ID ${alert_id} has been deleted successfully.`;
};
