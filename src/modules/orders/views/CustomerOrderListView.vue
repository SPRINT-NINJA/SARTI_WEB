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
                <b-col cols="12" md="3">
                  <img
                    src="https://n9.cl/stich"
                    alt="producto"
                    class="img-main-product"
                  />
                </b-col>
                <b-col
                  cols="12"
                  md="9"
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
    <div class="d-flex align-items-center justify-content-center my-2 " v-for="order in ordersList" :key="order.order.dateForArrive">
      <b-card class="card-preview-order">
        <b-card-text class="date-text"> {{ parseDateByRead(order.order.dateForArrive) }} </b-card-text>
        <hr/>
        <b-container>
            <b-row>
                <b-col cols="12" md="9">
                    <b-row  cols="12" md="8" >
                        <b-col cols="12" md="3">
                    <img
                    :src="order.order.product.mainImage"
                    alt="producto"
                    class="img-main-product"
                  /> 
                        </b-col>
                        <b-col cols="12" md="9" class="d-stretch justify-content-right align-items-center">
                            <p>
                              <b-badge :variant="assignColorBystatus(order.order.status)">{{ order.order.status }}</b-badge> <br>
                              {{ order.order.product.name }}<br>
                              {{ order.order.product.name }}</p>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="12" md="3">
                    <b-button class="my-2 mx-2" size="sm" variant="orange-secundary"> Ver compra</b-button>
                    <b-button variant="orange-secundary" size="sm"> Volver a comprar</b-button>
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
  width: 80px;
  height: 80px;
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
