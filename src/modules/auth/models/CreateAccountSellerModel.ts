import Vue from "vue";

export interface Seller {
  email: string;
  password: string; // Corregido de 'passwod' a 'password'
  name: string;
  first_last_name: string;
  second_name: string;
  description: string;
  wallet: string;
  address: {
    city: string;
    colony: string;
    external_number: string;
    internal_number: string;
    locality: string;
    reference_near: string; // referencia del lugar
    state: string;
    street: string;
    zip_code: string; // código postal
  };
}