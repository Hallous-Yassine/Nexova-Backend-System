interface CREATEADMIN {
    email: string
    password: string
    phone: string
    full_name: string
  }
  
  interface LOGINADMIN {
    email: string
    password: string
  }

  interface UPDATEADMIN {
    full_name?: string; 
    phone?: string;
    email?: string;
    password?: string;
  }
  
  
  export type { CREATEADMIN, LOGINADMIN, UPDATEADMIN }
  