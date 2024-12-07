interface REGISTERDEVICE {
    device_name: string;
    device_type: string;
    location: string;
    status: "active" | "inactive" | "faulty"; 
}

interface UPDATEDEVICE {
    device_name?: string;
    device_type?: string;
    location?: string;
    status?: "active" | "inactive" | "faulty";
  }
  
  export type { REGISTERDEVICE, UPDATEDEVICE };