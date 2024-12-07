import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Load the service account key from the environment variable
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountPath) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set");
}

if (!process.env.FIREBASE_DB_URL) {
  throw new Error("FIREBASE_DB_URL environment variable is not set");
}

// Parse the service account key if it's a JSON string or a file path
let serviceAccount;
try {
  if (fs.existsSync(serviceAccountPath)) {
    // If the path exists as a file, read and parse the JSON
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
  } else {
    // Otherwise, assume it's a JSON string directly
    serviceAccount = JSON.parse(serviceAccountPath);
  }
} catch (error) {
  throw new Error("Failed to load Firebase service account credentials: ");
}

// Initialize the Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL,
  });
}

const db = admin.database(); // Use Realtime Database instead of Firestore
export default db;
