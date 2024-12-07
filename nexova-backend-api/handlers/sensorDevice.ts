import { RequestHandler } from "express";
import { REGISTERDEVICE , UPDATEDEVICE} from "../types/requests/sensorDevice";
import { DEVICEREGISTERED , DEVICEUPDATED , ALREADYUSED} from "../types/responses/sensorDevice";
import * as deviceService from "../services/sensorDevice";

const registerDevice: RequestHandler = async (req, res) => {
  const data = req.body
  
  const payload: REGISTERDEVICE = {
    device_name: data.device_name,
    device_type: data.device_type,
    location: data.location,
    status: data.status,
  }

  if (
    !payload.device_name ||
    !payload.device_type ||
    !payload.location ||
    !payload.status
  ) {
    res.status(400).send({
      status: "error",
      message: "All fields are required",
    })
    return
  }

  try {
    const deviceExists = await deviceService.findOneBy("device_name", payload.device_name)
    if (deviceExists) {
      res.status(400).send({
        status: "error",
        message: "Device already exists",
        field: "Device_name",
      } as ALREADYUSED)

      return
    }
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while creating the Device",
    })
    return
  }


  try {
    // Use the service to create a new IoT device
    const device = await deviceService.createIoTDevice(data);

    const response: DEVICEREGISTERED = {
      status: "success",
      message: "IoT device registered successfully",
      device: {
        device_id: device.device_id,
        device_name: device.device_name,
        device_type: device.device_type,
        location: device.location,
        status: device.status,
        createdAt: device.created_at.toISOString(),
        updatedAt: device.updated_at.toISOString(),
      },
    };

    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).send({
      status: "error",
      message: "An error occurred while registering the device",
    });
  }
};

const updateDevice: RequestHandler = async (req, res) => {
  const deviceId = parseInt(req.params.id); // Use directly as a string since params are strings by default

  if (!deviceId) {
    res.status(400).send({
      status: "error",
      message: "Device ID is required",
    });
    return;
  }

  const payload: UPDATEDEVICE = {
    device_name: req.body.device_name,
    device_type: req.body.device_type,
    location: req.body.location,
    status: req.body.status,
  };

  if (!payload.device_name && !payload.device_type && !payload.location && !payload.status) {
    res.status(400).send({
      status: "error",
      message: "At least one field must be provided to update",
    });
    return;
  }

  try {
    // Attempt to update the device
    const updatedDevice = await deviceService.updateDevice(deviceId, payload);

    // Handle case where device is not found
    if (!updatedDevice) {
      res.status(404).send({
        status: "error",
        message: "Device not found",
      });
      return;
    }

    // Successful response
    const response: DEVICEUPDATED = {
      status: "success",
      message: "Device updated successfully",
      device: {
        device_id: updatedDevice.device_id, // Should now match the expected string type
        device_name: updatedDevice.device_name,
        device_type: updatedDevice.device_type,
        location: updatedDevice.location,
        status: updatedDevice.status,
        createdAt: updatedDevice.created_at.toISOString(),
        updatedAt: updatedDevice.updated_at.toISOString(),
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    // Handle server errors
    res.status(500).send({
      status: "error",
      message: "An error occurred while updating the device",
    });
  }
};

const deleteDevice: RequestHandler = async (req, res) => {
  const deviceId = parseInt(req.params.id); // Extract device ID from URL params

  if (!deviceId) {
    res.status(400).send({
      status: "error",
      message: "Device ID is required",
    });
    return;
  }

  try {
    // Call the service function to perform the delete
    const isDeleted = await deviceService.deleteDevice(deviceId);

    if (!isDeleted) {
      res.status(404).send({
        status: "error",
        message: "Device not found",
      });
      return;
    }

    res.status(200).send({
      status: "success",
      message: "Device deleted successfully",
    });
    return;
  } catch (error: any) {
    res.status(500).send({
      status: "error",
      message: error.message || "An error occurred while deleting the Device",
    });
    return;
  }
};

const getAll: RequestHandler = async (req, res) => {
  const devices = await deviceService.getAll()
  if (!devices || devices.length === 0) {
    res.status(404).send({
      status: "error",
      message: "No Devices found",
    })

    return
  }

  res.status(200).json(devices)

  return
}

const getOne: RequestHandler = async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(400).send({
      status: "error",
      message: "Id is required",
    })
    return
  }
  const device = await deviceService.getById(parseInt(id))
  if (!device) {
    res.status(404).send({
      status: "error",
      message: "Device not found",
    })
    return
  }

  let response: any = device

  res.status(200).json(response)
  return
}


export { registerDevice , updateDevice , deleteDevice , getAll , getOne }
