<template>
  <div>
    <navbar />
    <b-container>
      <b-card class="background-card my-3">
        <b-row class="mx-2">
          <b-icon
            class="my-2 mx-2"
            icon="cart-fill"
            variant="red-palete"
            scale="1.8"
          ></b-icon>
          <h3 class="title">Tu carrito</h3>
        </b-row>

        <b-row
          class="d-flex align-items-center justify-content-center scrollable-container"
        >
          <!-- Producto vista -->
          <b-card
            v-for="value in cartCustomerProductList"
            :key="value.name"
            class="card-preview-product my-2"
            :class="{'disabled-card': value.status === 'No disponible'}"
          >
            <b-row>
              <b-col cols="12" md="2">
                <img class="img-main-product" :src="value.mainImage" />
              </b-col>
              <b-col cols="12" md="9" class="my-2">
                <b-row>
                  <b-col cols="12" md="10" class="my-1">
                    <b>
                      {{ value.name }}
                    </b>
                  </b-col>
                  <b-col
                    cols="12"
                    md="2"
                    class="d-flex justify-content-end align-items-center"
                  >
                    <b-badge
                      :variant="
                        value.status === 'Disponible' ? 'success' : 'danger'
                      "
                      >{{ value.status }}</b-badge
                    >
                  </b-col>
                  <b-col cols="12" md="5">
                    <b-form inline>
                      <label
                        class="mr-sm-2"
                        for="inline-form-custom-select-pref"
                        >Cantidad:</label
                      >
                      <b-form-select
                      id="inline-form-custom-select-pref" 
                      class="mb-2 mr-sm-2
                      mb-sm-0"
                       size="sm"
                       :disabled="value.status === 'No disponible'"
                        v-model="value.amount"
                        :options="quantityOptions(value.stock)"
                        @change="CountTotal"
                      ></b-form-select>
                    </b-form>
                  </b-col>
                  <b-col cols="12" md="3">
                    <b-button
                      variant="danger"
                      @click="RemoveProductByCart(value.name)"
                      size="sm"
                      class="py-1 px-5"
                      >Eliminar</b-button
                    >
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-end align-items-center">
                  <b-col cols="12" md="3" class="text-right">
                    <b-card-text class="text-price"
                      ><b> ${{ value.price }}</b></b-card-text
                    >
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </b-row>

        <b-row
          class="d-flex flex-column align-items-center justify-content-center"
          style="width: 70%; margin: 0 auto"
        >
          <hr style="width: 100%" />
          <b-row
            class="d-flex justify-content-between align-items-center w-100 mt-2"
          >
            <b-col cols="auto" class="text-left">
              <p>Total</p>
            </b-col>
            <b-col cols="auto" class="text-right">
              <b>${{ total }}</b>
            </b-col>
          </b-row>
        </b-row>

        <b-row class="d-flex justify-content-end align-items-center mx-2 my-2">
          <b-button variant="orange-secundary">Continuar compra</b-button>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue, { defineAsyncComponent } from "vue";
import CartCustomerProductListViewModel from "../viewmodel/CartCustomerProductListViewModel";
export default {
  name: "CartCustomerList",
  components: {
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
  },
  mixins: [CartCustomerProductListViewModel],
};
</script>

<style scoped>
.background-card {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}
.title {
  color: var(--red-palete);
}
.card-preview-product {
  width: 70%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  border: none;
}
.img-main-product {
  display: flex;
  align-items: baseline;
  justify-content: right;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: transform 0.3s ease;
  /* Agrega una transición suave para el efecto de zoom */
  object-fit: cover;
}
.border {
  border: solid;
}

.text-price {
  font-size: medium;
  font-style: italic;
}
hr {
  width: 70%;
  height: 0.3px;
  background-color: rgb(0, 0, 0);
}

.total {
  width: 70%;
  align-items: center;
  justify-content: center;
}

.scrollable-container {
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
}
.disabled-card {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
