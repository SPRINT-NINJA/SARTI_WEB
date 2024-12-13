<template>
  <div>
    <div class="d-flex align-items-center justify-content-center">
      <b-card class="background-card-other my-3">
        <b-row class="mx-2">
          <b-icon
            class="my-2 mx-2"
            icon="cart4"
            variant="red-palete"
            scale="1.8"
          ></b-icon>
          <h3 class="title">Carrito</h3>
        </b-row>
        <b-row>
          <b-col cols="12" md="12">
            <b-row
              class="d-flex align-items-center justify-content-center scrollable-container"
            >
              <!-- Producto vista -->
              <b-card
                v-for="value in productList"
                :key="value.id"
                class="card-preview-product my-2"
                :class="{ 'disabled-card': !value.status }"
              >
                <b-row>
                  <b-col cols="12" md="2">
                    <img
                      class="img-main-product"
                      :src="JSON.parse(value.productInfo).mainImage"
                    />
                  </b-col>
                  <b-col cols="12" md="9" class="my-2">
                    <b-row>
                      <b-col cols="12" md="10" class="my-1">
                        <b>
                          {{ JSON.parse(value.productInfo).name }}
                        </b>
                      </b-col>
                      <b-col
                        cols="12"
                        md="2"
                        class="d-flex justify-content-end align-items-center my-2"
                      >
                        <b-badge
                          :variant="value.status ? 'success' : 'danger'"
                          >{{
                            value.status ? "Disponible" : "AGOTADO"
                          }}</b-badge
                        >
                        
                      </b-col>
                    </b-row>
                    <b-row class="w-100">
                      <b-col cols="12" lg="5" class="d-flex align-items-center">
                        <span class="mr-3"> Cantidad: </span>
                        <div>
                          <b-input-group class="quantity-selector">
                            <b-input-group-prepend>
                              <b-button
                                :disabled="!value.status"
                                variant="outline-info"
                                size="sm"
                                @click="decrement(value)"
                                >-</b-button
                              >
                            </b-input-group-prepend>

                            <b-form-input
                              size="sm"
                              type="text"
                              class="text-center"
                              v-model="value.amount"
                              @change="checkAmount(value)"
                              disabled
                            ></b-form-input>
                            <b-input-group-append>
                              <b-button
                              :disabled="!value.status"
                                variant="outline-secondary"
                                size="sm"
                                @click="increment(value)"
                                >+</b-button
                              >
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                      </b-col>
                      <b-col
                        cols="12"
                        lg="7"
                        class="d-flex justify-content-start"
                      >
                        <span class="available-stock"
                          >(+ {{ JSON.parse(value.productInfo).stock }} disponibles)</span
                        >
                        <span
                          class="mx-4 available-stock"
                          @click="RemoveProductByCart(value)"
                          v-show="value.status"
                        >
                          <b>Eliminar</b>
                        </span>
                      </b-col>
                    </b-row>
                    <b-row
                      class="d-flex justify-content-end align-items-center"
                    >
                      <b-col cols="12" md="3" class="text-right">
                        <b-card-text class="text-price"
                          ><b> ${{ JSON.parse(value.productInfo).price }}</b></b-card-text
                        >
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-card>
            </b-row>

            <b-row
              v-if="productList.length > 0"
              class="d-flex flex-column align-items-start justify-content-start"
              style="width: 100%; margin: 0 auto"
            >
              <hr />
              <b-row
                class="d-flex justify-content-between align-items-center w-100 mt-2"
              >
                <b-col cols="auto" class="text-left text-by-price">
                  <p>Productos</p>

                  <p>Total</p>
                </b-col>
                <b-col cols="auto" class="text-right text-by-price">
                  <p>{{ productList.length }}</p>
                  <p>${{ total }}</p>
                </b-col>
              </b-row>
            </b-row>
          </b-col>
          <b-col cols="12" md="12">
            <section v-if="productList.length === 0">
              <div class="mb-2 text-center">
                <img src="@/assets/buyOrder.svg" class="w-70 sold-out-image" />
                <br />
                <h5>
                  Vaya, no has seleccionado productos. ¿Qué te parece si
                  exploramos nuestras deliciosas opciones y encuentras algo que
                  te encante?
                </h5>
                <a href="/sarti/home-page" class="btn btn-red-palete">
                  Ir de compras
                </a>
              </div>
            </section>
          </b-col>
        </b-row>
        <div
          v-if="productList.length > 0"
          class="d-flex align-items-end justify-content-end"
        >
          <b-button variant="orange-secundary" @click="cleanCart" class="mx-3"
            >Vaciar carrito</b-button
          >
          <b-button variant="orange-primary" @click="confirmCart">Realizar compra</b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import CartCustomerProductListViewModel from "../viewmodel/CartCustomerProductListViewModel";
export default {
  name: "CustomerOrderBuy",
  mixins: [CartCustomerProductListViewModel],
};
</script>

<style scoped>
.available-stock {
  cursor: pointer;
}

.underline {
  text-decoration: underline;
}

.available-stock:hover {
  text-decoration: underline;
}

.text-by-price {
  font-size: smaller;
}
.background-card-other {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  width: 95%;
}
.background-card {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}
.title {
  color: var(--red-palete);
}
.card-preview-product {
  width: 95%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border: none;
}
.img-main-product {
  display: flex;
  align-items: baseline;
  justify-content: right;
  width: 90px;
  height: 90px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
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
  width: 100%;
  height: 0.3px;
  background-color: rgb(0, 0, 0);
}

.sold-out-image {
  height: 300px;
}

.total {
  width: 100%;
  align-items: center;
  justify-content: center;
}

.scrollable-container {
  max-height: 500px;
  overflow-y: auto;
  width: 100%;
}
.disabled-card {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
