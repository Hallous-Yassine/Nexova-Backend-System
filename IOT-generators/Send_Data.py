import firebase_admin
from firebase_admin import credentials, db
import time
import random  # For simulating sensor data
from datetime import datetime, timedelta

# Use the full path to your JSON file
service_account_path = r"C:\Users\YASSINE\Documents\GitHub\NexovaTeam\IOT-generators\tsyp-industrial-challenge-firebase-adminsdk-1zm0f-5ca0667b68.json"

# Initialize the credentials using the JSON file
cred = credentials.Certificate(service_account_path)

# Initialize the Firebase Admin SDK
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://tsyp-industrial-challenge-default-rtdb.europe-west1.firebasedatabase.app/"
})

print("Firebase initialized successfully!")

# Function to simulate sensor readings
def simulate_sensor_readings():
    """Simulate random gas sensor readings."""
    mq135 = random.randint(200, 800)  # Simulate CO2 sensor values
    mq2 = random.randint(100, 700)    # Simulate Methane sensor values
    mq5 = random.randint(300, 900)   # Simulate LPG sensor values
    return mq135, mq2, mq5

# Function to delete expired sensor readings
def delete_expired_data(expiry_duration_minutes=10):
    """Delete sensor readings older than the specified expiry duration."""
    ref = db.reference("/sensor_readings")
    snapshot = ref.get()

    if snapshot is None:
        print("No data found to clean.")
        return

    # Current time
    now = datetime.now()

    # Expiry time threshold
    expiry_threshold = now - timedelta(minutes=expiry_duration_minutes)

    for key, data in snapshot.items():
        try:
            # Parse the timestamp from the data
            data_timestamp = datetime.strptime(data["timestamp"], "%Y-%m-%d %H:%M:%S")

            # Check if the data is expired
            if data_timestamp < expiry_threshold:
                # Delete the expired data
                ref.child(key).delete()
                print(f"Deleted expired data: {key}")
        except KeyError:
            print(f"Missing timestamp in data: {data}")
        except Exception as e:
            print(f"Error processing data {key}: {e}")

# Continuous sensor simulation and database update
try:
    while True:
        # Generate random sensor readings
        mq135, mq2, mq5 = simulate_sensor_readings()
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")

        # Structure data for Firebase
        sensor_data = {
            "device_id": "1",
            "value": mq135,
            "data_type": "CO2",
            "timestamp": timestamp
        }

        # Push data to Firebase under a node for each reading
        ref = db.reference("/sensor_readings")
        ref.push(sensor_data)  # Push creates a unique key for each reading

        # Log to console
        print(f"Data written: {sensor_data}")

        # Clean up expired data every iteration
        delete_expired_data()

        # Wait 10 seconds before the next scan
        time.sleep(10)

except KeyboardInterrupt:
    print("Sensor simulation stopped.")
except Exception as e:
    print(f"An error occurred: {e}")
