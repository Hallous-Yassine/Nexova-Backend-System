  interface SENSORDATA {
    success: boolean;
    data: {
      device_id: number;
      timestamp: string; // Timestamp of when the data was collected
      data_type: string; // The sensor type (e.g., MQ-135)
      value: number; // The sensor value
    }[];
  }

  export type {SENSORDATA};