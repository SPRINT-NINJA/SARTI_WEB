// src/types/vuelidate.d.ts
import { Validation } from '@vuelidate/core';

declare module 'vue/types/options' {
  interface ComponentOptions<V> {
    validations?: Validation;
  }
}