
import { defineComponent, reactive } from 'vue';
import { schema } from '../../../components/validationSchema';
import { useValidation } from '@vee-validate/core';

export default defineComponent({
  setup() {
    // Datos del formulario
    const form = reactive({
      email: '',
      password: '',
    });

    // Validación
    const { errors, validate } = useValidation(schema);

    const submitForm = async () => {
      const isValid = await validate(form);
      if (isValid) {
        console.log('Formulario enviado', form);
      } else {
        console.log('Errores de validación', errors);
      }
    };

    return {
      form,
      errors,
      submitForm,
    };
  },
});