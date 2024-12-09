interface IUser {
    email: string;
    role: string;
  }
  
  interface IDeliveryManUpdate {
    id: number;
    name: string;
    fistLastName: string;
    secondLastName: string;
    facePhoto: string;
    frontIdentificationPhoto: string;
    backIdentificationPhoto: string;
    user: IUser;
  }
  