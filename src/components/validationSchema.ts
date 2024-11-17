import * as yup from 'yup';



export const schema = yup.object().shape({
  email: yup.string().required('El correo es obligatorio').email('Debe ser un correo válido'),
  password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
});
