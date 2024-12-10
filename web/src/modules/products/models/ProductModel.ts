interface User {
    id: number;
    email: string;
    password: string;
    token: string;
    role: string;
    blocked: boolean;
    status: boolean;
    verified: boolean;
    lastAccess: string;
    createdAt: string;
    updatedAt: string | null;
}

interface Address {
    id: number;
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
    addressType: string;
    createdAt: string;
    updatedAt: string | null;
}

interface Seller {
    id: number;
    sellerNumber: string;
    name: string;
    fistLastName: string;
    secondLastName: string;
    bussinessName: string;
    description: string;
    wallet: string;
    createdAt: string;
    updatedAt: string | null;
    user: User;
    address: Address;
}

interface ProductImage {
    id: number;
    image: string;
    position: number;
}

export interface IProduct {
    id: number;
    name: string;
    description: string;
    mainImage: string;
    price: number;
    stock: number;
    rating: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    seller: Seller;
    productImages: ProductImage[];
    rates: any[];
}

