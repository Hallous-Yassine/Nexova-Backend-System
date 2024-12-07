interface USERCREATED {
  status: string
  message: string
  user: {
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

interface USERLOGOUT {
  status: "success" | "error";
  message: string;
}

interface USERUPDATED {
  status: string;
  message: string;
  user: {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    updatedAt: Date;
  };
}

export type { USERCREATED, ALREADYUSED, USERLOGOUT , USERUPDATED }
