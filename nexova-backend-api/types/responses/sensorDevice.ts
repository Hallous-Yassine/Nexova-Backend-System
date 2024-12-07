interface DEVICEREGISTERED {
    status: "success" | "error";
    message: string;
    device?: {
      device_id: string; // UUID
      device_name: string;
      device_type: string;
      location: string;
      status: string;
      createdAt: string; // ISO timestamp format
      updatedAt: string; // ISO timestamp format
    };
}   
interface DEVICEUPDATED {
  status: "success" | "error";
  message: string;
  device?: {
    device_id: number;
    device_name: string;
    device_type: string;
    location: string;
    status: "active" | "inactive" | "faulty";
    createdAt: string; // ISO timestamp format
    updatedAt: string; // ISO timestamp format
  };
}

interface ALREADYUSED {
  status: string
  message: string
  field: string
}

export type { DEVICEREGISTERED, DEVICEUPDATED, ALREADYUSED };