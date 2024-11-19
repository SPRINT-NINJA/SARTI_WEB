<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="email">Correo:</label>
      <input
        id="email"
        name="email"
        v-model="form.email"
        v-validate="'required|email'"
        type="email"
      />
      <span v-if="errors.has('email')">{{ errors.first('email') }}</span>
    </div>
    <div>
      <label for="password">Contraseña:</label>
      <input
        id="password"
        name="password"
        v-model="form.password"
        v-validate="'required|min:6'"
        type="password"
      />
      <span v-if="errors.has('password')">{{ errors.first('password') }}</span>
    </div>
    <button type="submit">Registrar</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default Vue.extend({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submitForm() {
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          console.log('Formulario enviado', this.form);
        } else {
          console.log('Errores de validación');
        }
      });
    },
  },
});
</script>
