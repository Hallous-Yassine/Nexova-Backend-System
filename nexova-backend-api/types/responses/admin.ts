interface ADMINCREATED {
    status: string
    message: string
    admin: {
      id: number
      full_name: string
      phone: string
      email: string
      createdAt: Date
      updatedAt: Date
    }
  }
  
  interface ALREADYUSED {
    status: string
    message: string
    field: string
  }
  
  interface ADMINLOGOUT {
    status: "success" | "error";
    message: string;
  }

  interface ADMINUPDATED {
    status: string;
    message: string;
    admin: {
      id: number;
      full_name: string;
      phone: string;
      email: string;
      updatedAt: Date;
    };
  }
  
  export type { ADMINCREATED, ALREADYUSED, ADMINLOGOUT, ADMINUPDATED }
  