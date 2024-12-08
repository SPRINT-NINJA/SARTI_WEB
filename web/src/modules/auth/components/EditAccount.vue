<template>
  <div>
    <b-container>
      <section>
        <h5>Cuenta</h5>
            <b-form-group label="Correo" label-for="input-name">
              <b-form-input
                
                type="text"
                v-model="email"
                disabled 
              ></b-form-input>
            </b-form-group>
        <div class="d-flex justify-content-end align-items-center mx-2 my-2">
          <b-button variant="orange-primary" class="mx-2" @click="sendCode(newEmail)" >Verificar</b-button>
        </div>
      </section>
      <hr>
      <section>
        <h5>Cambio Contraseña</h5>
            <b-form-group label="Actual contraseña" label-for="input-name">
              <b-form-input 
              type="password" 
              v-model="v$.changePassword.oldPassword.$model" 
              :state="v$.changePassword.oldPassword.$dirty 
              ? !v$.changePassword.oldPassword.$error : null"
              @blur="v$.changePassword.oldPassword.$touch()"
               ></b-form-input>
              <b-form-invalid-feedback
                    v-for="error in v$.changePassword.oldPassword.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>

            </b-form-group>
            <b-form-group label="Nueva contraseña" label-for="input-name">
              <b-form-input v-model="v$.changePassword.newPassword.$model"  type="password"
              :state="v$.changePassword.newPassword.$dirty ? !v$.changePassword.newPassword.$error : null"
              @blur="v$.changePassword.newPassword.$touch()"
               ></b-form-input>
              <b-form-invalid-feedback
                    v-for="error in v$.changePassword.newPassword.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Confirmar contraseña" label-for="input-name">
              <b-form-input v-model="v$.confirmPassword.$model"  type="password"
              :state="v$.confirmPassword.$dirty ? !v$.confirmPassword.$error : null"
              @blur="v$.confirmPassword.$touch()"
               ></b-form-input>
              <b-form-invalid-feedback
                    v-for="error in v$.confirmPassword.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>

            </b-form-group>
          <div class="d-flex justify-content-end align-items-center mx-2 my-2">
            <b-button @click="changePasswordAccount" variant="red-palete">Cambiar</b-button>
        </div>
      </section>
    </b-container>
    <!-- VERIFICAR CUENTA -->
    <b-modal v-model="modalShow"  title="Verificar Cuenta" hide-footer>
      <b-alert class="nunito-font" show variant="warning">
        <b>ADVERTENCIA</b> Revisa tu correo te hemos enviado un código para verficar tu correo
      </b-alert>
      <div class="text-center d-flex flex-column align-items-center justify-content-center">
    <p>
      Revisa tu bandeja de entrada, te hemos enviado un código para verificar tu dirección de correo electrónico.
    </p>
    <div class="d-flex justify-content-center mb-3">
      <input
          v-for="(digit, index) in codeArray"
          :key="index"
          type="text"
          maxlength="1"
          class="form-control text-center mx-1"
          style="width: 3rem; font-size: 1.5rem;"
          v-model="codeArray[index]"
        />
    </div>
    <b-button @click="confirmAccount" variant="orange-primary" class="btn btn-block mb-3" >Confirmar Cuenta</b-button>
  </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import EditAccountViewModel from '../viewmodels/EditAccountViewModel';
export default {
  name: "EditAccount",
  mixins:[EditAccountViewModel],
};
</script>

<style scoped>
hr {
  background-color: var(--orange-primary);
  height: 0.3px;
}
</style>
