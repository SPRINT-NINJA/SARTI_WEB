export interface Address {
    city: string;
    colony: string;
    externalNumber: string;
    internalNumber: string;
    locality: string;
    referenceNear: string;
    state: string;
    street: string;
    zipCode: string;
    addressType: string;
}

export interface Store {
    name: string;
    description: string;
}

export interface ProfileSeller {
    name: string;
    firstLastName: string;
    secondName: string;
    email: string;
    address: Address;
    store: Store;
}
