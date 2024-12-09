<template>
  <div>
    <b-modal
      id="update-stock"
      ref="update-stock"
      title="Actualizar stock"
      centered
      hide-footer
      scrollable
      @hidden="closeModal"
      @close="closeModal"
      size="sm"
      :no-close-on-backdrop="true"
    >
      <b-row class="align-items-center">
        <!-- Botón de restar -->
        <b-col cols="4" class="text-right">
          <b-button
            variant="danger"
            size="sm"
            @click="decreaseStock"
            class="px-3"
          >
            <b-icon icon="dash" class="text-white"></b-icon>
          </b-button>
        </b-col>

        <!-- Campo de entrada para cantidad -->
        <b-col
          cols="4"
          class="d-flex justify-content-center align-items-center w-100"
        >
          <!-- Contenedor para centrar el input -->
          <b-form-input
            id="input-stock"
            v-model="v$.updateStockPayload.stock.$model"
            min="0"
            class="text-center h4 font-weight-bold w-100"
            style="
              width: 60px;
              border: none;
              outline: none;
              background-color: transparent;
              pointer-events: auto;
            "
            :state="
              v$.updateStockPayload.stock.$dirty
                ? !v$.updateStockPayload.stock.$error
                : null
            "
            @blur="v$.updateStockPayload.stock.$touch()"
            @input="validateStock"
          />
        </b-col>

        <!-- Botón de aumentar -->
        <b-col cols="4" class="text-left">
          <b-button
            variant="success"
            size="sm"
            @click="increaseStock"
            class="px-3"
          >
            <b-icon icon="plus" class="text-white"></b-icon>
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <b-form-invalid-feedback
            v-for="error in v$.updateStockPayload.stock.$errors"
            :key="error.$uid"
            class="d-block text-center"
          >
            {{ error.$message }}
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <div class="col-12 mt-4 px-0 text-right">
        <b-button variant="outline-danger" @click="closeModal" size="sm"
          >Cancelar</b-button
        >
        <b-button
          variant="outline-success"
          class="ml-2"
          @click="updateStock"
          size="sm"
          :disabled="v$.updateStockPayload.$invalid"
          >Guardar</b-button
        >
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UpdateStockViewModel from "../../viewmodel/UpdateStockViewModel";

export default defineComponent({
  name: "UpdateStock",
  mixins: [UpdateStockViewModel],
});
</script>
<style scoped>
b-form-input:focus {
  box-shadow: none; /* Quita el borde azul al enfocar */
}
</style>
