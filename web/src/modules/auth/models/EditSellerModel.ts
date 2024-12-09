interface IAddress {
    country: string;
    state: string;
    city: string;
    locality: string;
    colony: string;
    street: string;
    zipCode: number;
    externalNumber: string;
    internalNumber: string;
    referenceNear: string;
    addressType: string; // Puedes reemplazarlo por un tipo literal si es un conjunto limitado, por ejemplo: `"DOMICILIO" | "NEGOCIO" | "OTRO"`
  }
  
  interface IUpdateSeller {
    id: number;
    name: string;
    firstLastName: string;
    fistLastName: string;
    secondLastName: string;
    bussinessName: string;
    description: string;
    wallet: string;
    address: IAddress;
  }
  