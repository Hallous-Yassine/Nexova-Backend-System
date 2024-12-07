const WebSocket = require("ws");

// Replace with the correct server address and port
const socket = new WebSocket("ws://localhost:3002/ws/sensor");

socket.on("open", () => {
  console.log("✅ Connected to WebSocket server");
});

socket.on("message", (data) => {
  // Parse the incoming data and display it in a readable format
  try {
    const parsedData = JSON.parse(data.toString());
    console.log("📩 Message from server:", JSON.stringify(parsedData, null, 2));
  } catch (error) {
    console.error("❌ Error parsing server message:", error.message);
  }
});

socket.on("error", (error) => {
  console.error("❌ WebSocket Error:", error.message);
});

socket.on("close", () => {
  console.log("❌ WebSocket Connection closed");
});
