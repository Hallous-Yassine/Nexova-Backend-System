interface CREATEUSER {
  email: string
  password: string
  phone: string
  full_name: string
}

interface LOGINUSER {
  email: string
  password: string
}

interface UPDATEUSER {
  full_name?: string; 
  phone?: string;
  email?: string;
  password?: string;
}

export type { CREATEUSER, LOGINUSER, UPDATEUSER }
