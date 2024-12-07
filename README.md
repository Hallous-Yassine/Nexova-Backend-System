
### **NVP Backend System**

## **Overview**

This project provides a backend system designed to monitor and manage real-time sensor data. It continuously tracks data from connected IoT devices, evaluates sensor readings against predefined thresholds, and generates alerts when a threshold is breached. Utilizing WebSocket communication, the system broadcasts alerts instantly to all connected clients. All sensor data and alerts are securely stored in a PostgreSQL database, enabling efficient historical analysis and future reference. This scalable and maintainable backend system lays a strong foundation for IoT-based applications, ensuring real-time monitoring, alerting, and data management.

----------

## **Features**

-   **Real-Time Data Monitoring:** Continuously captures and monitors sensor data from Firebase Realtime Database.
-   **Threshold-Based Alerts:** Automatically generates alerts when sensor readings exceed defined threshold values.
-   **WebSocket Communication:** Utilizes WebSocket API to broadcast real-time alerts to connected clients for immediate notification.
-   **Database Integration:** Efficiently stores sensor data, alert history, and device information in PostgreSQL, using TypeORM for ORM.
-   **Scalable Architecture:** Developed with TypeScript and Node.js for performance, scalability, and maintainability.

----------

## **Technologies Used**

-   **Backend Framework:** Node.js, Express.js
-   **Database:** PostgreSQL (with TypeORM ORM)
-   **Real-Time Data Handling:** Firebase Realtime Database
-   **Programming Language:** TypeScript
-   **WebSocket Protocol:** WebSocket API
-   **Cloud Hosting:** AWS EC2
-   **Version Control & Collaboration:** Git, GitHub

----------

## **Getting Started**

### **Prerequisites**

Ensure the following are installed on your machine:

-   Node.js (v16 or higher)
-   PostgreSQL
-   Firebase CLI

### **Installation**

1.  **Clone the repository:**
    ```bash
	git clone https://github.com/Hallous-Yassine/Nexova-Backend-System
    cd backend-alert-system` 
    
2.  **Install dependencies:**
    
    ```bash
    npm install
    
3.  **Set up environment variables:**
    
    -   Create a `.env` file in the root directory.
    -   Add the following variables:
  
    ```bash
    DATABASE_URL=your_postgres_connection_string
    FIREBASE_API_KEY=your_firebase_api_key
    PORT=3000` 
    
4.  **Run database migrations:**

	   ```bash
    npm run typeorm migration:run
    ```
    
5.  **Start the server:**
    
	   ```bash
    `npm run start` 
    ```
    
### **Usage**

-   The server runs at `http://localhost:3000`.
-   WebSocket clients can connect to `/ws/alerts` to receive real-time alerts.

----------

## **Key Functionalities**

### **Real-Time Alert Generation**

-   Monitors incoming sensor data from Firebase.
-   Evaluates each reading against defined thresholds.
-   Generates and stores alerts when a threshold is exceeded.

### **WebSocket Notifications**

-   Instantly broadcasts alerts to connected WebSocket clients, ensuring immediate updates to users.

### **Database Management**

-   Stores and manages device information, threshold values, and alert history in PostgreSQL.
-   Uses TypeORM for database interactions, ensuring maintainable and scalable data management.

----------

## **Contributing**

Contributions are welcome! To contribute:

1.  Fork the repository.
2.  Create a feature branch:
    ```bash
    `git checkout -b feature-name` 
    ```
3.  Commit your changes and open a pull request.

----------

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.