<template>
  <div>
    <b-container>
      <section>
        <h5>Cuenta</h5>
            <b-form-group label="Correo" label-for="input-name">
              <b-form-input
                id="input-name"
                type="text"
                v-model="newEmail"
              ></b-form-input>
            </b-form-group>
        <div class="d-flex justify-content-end align-items-center mx-2 my-2">
          <b-button variant="orange-primary" class="mx-2">Verificar</b-button>
          <b-button variant="red-palete">Cambiar</b-button>
        </div>
      </section>
      <hr>
      <section>
        <h5>Cambio Contraseña</h5>
            <b-form-group label="Actual contraseña" label-for="input-name">
              <b-form-input v-model="actualPassword" id="input-name" type="password"></b-form-input>
            </b-form-group>
            <b-form-group label="Nueva contraseña" label-for="input-name">
              <b-form-input v-model="newPassword" id="input-name" type="password"></b-form-input>
            </b-form-group>
            <b-form-group label="Confirmar contraseña" label-for="input-name">
              <b-form-input v-model="confirmParssword" id="input-name" type="password"></b-form-input>
            </b-form-group>
          <div class="d-flex justify-content-end align-items-center mx-2 my-2">
            <b-button variant="red-palete">Cambiar</b-button>
        </div>
      </section>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "EditAccount",
  props:{
    email:{
      type:String,
      required: true
    }
  },
  data(){
    return{
      newEmail: this.email,
      actualPassword:"",
      newPassword:"",
      confirmParssword:""
    }
  }
};
</script>

<style scoped>
hr {
  background-color: var(--orange-primary);
  height: 0.3px;
}

</style>
