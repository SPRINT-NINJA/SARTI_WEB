<template>
  <!-- Agregar componente de cristian -->
  <div>
    <navbar />
    <div class="d-flex align-items-center justify-content-center">
      <b-card bg-variant="orange-soft" class="card-preview-order my-2">
        <b-container>
          <!-- Producto en espera de una opinión -->
          <b-row>
            <b-col cols="12" md="9">
              <b-row>
                <b-col cols="6" md="2">
                  <img
                    src="https://n9.cl/stich"
                    alt="producto"
                    class="img-main-product"
                  />
                </b-col>
                <b-col
                  cols="6"
                  md="10"
                  class="d-flex justify-content-right align-items-center"
                >
                  <h5>Un producto espera tu opinión</h5>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              cols="12"
              md="3"
              class="d-flex justify-content-end align-items-center"
            >
              <b-button variant="red-palete"> Crear reseña </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </div>
          <!-- pedido preview -->
    <div class="d-flex align-items-center justify-content-center my-2">
      <b-card class="card-preview-order">
        <b-card-text class="date-text">15 de octubre del 2024</b-card-text>
        <hr/>
        <b-container>
            <b-row>
                <b-col cols="12" md="9">
                    <b-row  cols="12" md="8" class="d-flex justify-content-right align-items-center">
                        <b-col cols="12" md="4">
                    <img
                    src="https://n9.cl/stich"
                    alt="producto"
                    class="img-main-product"
                  /> 
                        </b-col>
                        <b-col>
                            <b-card-text>Pendiente</b-card-text>
                            <b-card-text>
                                Paquete de Stich peluche edición especial
                            </b-card-text>
                            <b-card-text>1 unidad</b-card-text>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="12" md="3">
                    <b-button class="my-2" variant="orange-secundary"> Ver compra</b-button>
                    <b-button variant="orange-secundary"> Volver a comprar</b-button>
                </b-col>
            </b-row>
        </b-container>
        </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineAsyncComponent } from "vue";
import CustomerOrderListViewModel from "../viewmodels/CustomerOrderListViewModel";

export default {
  name: "CustomerOrderListView",
  components: {
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
  },
  mixins: [CustomerOrderListViewModel],
};
</script>

<style scoped>
.card-preview-order {
  width: 70%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  border: none;
}

.img-main-product {
  display: flex;
  align-items: baseline;
  justify-content: right;
  width: 90px;
  height: 90px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: transform 0.3s ease;
  /* Agrega una transición suave para el efecto de zoom */
  object-fit: cover;
}

.date-text{
    color: #969595;
    font-style: italic;
}

hr {
  width: 100%;
  height: 0.3px;
  background-color: rgb(0, 0, 0);
}
</style>
