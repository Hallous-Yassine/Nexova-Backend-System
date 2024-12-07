import WebSocket from "ws";
import http from "http";
import db from "../config/firebase"; // Firebase Realtime Database
import SensorDevice from "../models/sensorDevice"; // SensorDevice Entity

// Function to check if a device exists in the database
const verifyDeviceInDatabase = async (device_id: number) => {
  try {
    const device = await SensorDevice.findOne({ where: { device_id } });
    if (!device) {
      console.error(`[WebSocket] Device with ID ${device_id} not found.`);
      return null;
    }
    return device;
  } catch (error) {
    console.error("[WebSocket] Error verifying device in database:", error);
    return null;
  }
};

export const initializeSocket = (server: http.Server) => {
  const wss = new WebSocket.Server({ server, path: "/ws/sensor" });

  const ref = db.ref("sensor_readings");

  // Broadcast data to all connected WebSocket clients
  const broadcastData = (data: any) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };

  // Fetch and broadcast all historical data
  const fetchAllHistoricalData = async () => {
    try {
      const snapshot = await ref.once("value");
      const allData = snapshot.val();
      if (allData) {
        console.log("[WebSocket] Broadcasting all historical data.");
        broadcastData({ type: "historical", data: allData });
      } else {
        console.log("[WebSocket] No historical data available.");
      }
    } catch (error) {
      console.error("[WebSocket] Error fetching historical data from Firebase:", error);
    }
  };

  // Listen for new sensor readings in Firebase
  ref.on("child_added", async (snapshot) => {
    try {
      const data = snapshot.val();

      if (!data || data.device_id == null || data.value == null) {
        console.error("[WebSocket] Invalid data received from Firebase:", data);
        return; // Skip invalid data
      }

      // Check if the device exists in the database
      const device = await verifyDeviceInDatabase(data.device_id);
      if (!device) {
        return; // Skip processing for unknown devices
      }

      // Prepare the message with alert status if value exceeds the threshold
      const isAlert = data.value > device.threshold;
      const message = {
        device_id: data.device_id,
        value: data.value,
        status: isAlert ? "Alert" : "Normal",
        timestamp: data.timestamp, // Add the timestamp here
        ...(isAlert && {
          alertMessage: `ALERT! Value ${data.value} exceeds threshold ${device.threshold} for device ${device.device_name}`,
        }),
      };

      console.log("[WebSocket] Broadcasting message:", message);
      broadcastData(message);
    } catch (error) {
      console.error("[WebSocket] Error processing data from Firebase:", error);
    }
  });

  // Handle WebSocket client connections
  wss.on("connection", (ws) => {
    console.log("[WebSocket] New client connected to WebSocket server.");

    // Confirm the connection
    ws.send(
      JSON.stringify({
        status: "success",
        message: "Connected to WebSocket server. Listening for updates...",
      })
    );

    // Fetch and send all historical data on connection
    fetchAllHistoricalData();

    // Handle incoming messages from clients (if needed)
    ws.on("message", (message) => {
      console.log(`[WebSocket] Message received from client: ${message}`);
      ws.send(
        JSON.stringify({
          status: "success",
          message: "Message received by the server.",
        })
      );
    });

    // Handle client disconnection
    ws.on("close", () => {
      console.log("[WebSocket] Client disconnected from WebSocket server.");
    });

    // Handle WebSocket errors
    ws.on("error", (error) => {
      console.error("[WebSocket] Client connection error:", error);
    });
  });
};
