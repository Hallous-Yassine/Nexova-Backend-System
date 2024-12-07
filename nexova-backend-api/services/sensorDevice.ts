import IoTDevice from "../models/sensorDevice";

const getAll = async () => {
  return await IoTDevice.find()
}

const getById = async (device_id: number) => {
  if (!device_id) {
    throw new Error("Id is required")
  }
  return await IoTDevice.findOne({
    where: {
      device_id,
    },
  })
}

const findOneBy = async (field: string, value: any) => {
  if (!field || !value) {
    throw new Error("Please provide a field and value to search for")
  }
  return await IoTDevice.findOne({
    where: {
      [field]: value,
    },
  })
}

const createIoTDevice = async (data: any) => {
  if (!data.device_name || !data.device_type || !data.status || !data.location) {
    throw new Error("All required fields must be provided");
  }
  return await IoTDevice.create(data).save();
};

const updateDevice = async (deviceId: number, updates: Partial<any>) => {
  // Check if the device exists
  const device = await IoTDevice.findOne({ where: { device_id: deviceId } });
  if (!device) {
    return null; // Return null if the device does not exist
  }

  // Apply updates to the device
  Object.assign(device, updates);

  device.updated_at = new Date();

  // Save the updated device
  return await device.save();
};

const deleteDevice = async (id: number) => {

  const device = await IoTDevice.findOne({
    where: { device_id : id },
  });

  if (!device) {
    throw new Error("Admin not found");
  }

  // Delete the Admin from the database
  await device.remove();

  return true; // Return true to indicate successful deletion
};

export { createIoTDevice, updateDevice, deleteDevice, findOneBy , getAll ,  getById};
