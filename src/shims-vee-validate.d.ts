declare module 'vee-validate' {
    import Vue from 'vue';
  
    export const ValidationProvider: Vue;
    export const ValidationObserver: Vue;
    export const extend: (name: string, rule: any) => void;
    export const configure: (options: any) => void;
  }
  