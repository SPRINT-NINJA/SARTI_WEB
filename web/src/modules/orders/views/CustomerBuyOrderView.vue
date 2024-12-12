<template>
  <div>
    <div class="d-flex align-items-center justify-content-center">
      <b-card class="background-card-other my-3">
        <b-row class="mx-2">
          <b-icon
            class="my-2 mx-2"
            icon="box-seam"
            variant="red-palete"
            scale="1.8"
          ></b-icon>
          <h3 class="title">Pedido</h3>
        </b-row>
        <b-row>
          <b-col cols="12" md="8">
            <b-row
              class="d-flex align-items-center justify-content-center scrollable-container"
            >
              <!-- Vista del producto (sin modificar cantidades) -->
              <b-card
                v-for="product in cartBody.cartProducts"
                :key="product.id"
                class="card-preview-product my-2"
                :class="{ 'disabled-card': !product.status }"
              >
                <b-row>
                  <b-col cols="12" md="2">
                    <img
                      class="img-main-product"
                      :src="product.product.mainImage"
                    />
                  </b-col>
                  <b-col cols="12" md="9" class="my-2">
                    <b-row>
                      <b-col cols="12" md="10" class="my-1">
                        <b>
                          {{ product.product.name }}
                        </b>
                      </b-col>
                      <b-col
                        cols="12"
                        md="2"
                        class="d-flex justify-content-end align-items-center my-2"
                      >
                        <b-badge
                          :variant="product.status ? 'success' : 'danger'"
                          >{{
                            product.status ? "Disponible" : "No disponible"
                          }}</b-badge
                        >
                      </b-col>
                    </b-row>
                    <b-row class="w-100">
                      <b-col cols="12" lg="5" class="d-flex align-items-center">
                        <span>Cantidad: {{ product.amount }}</span>
                      </b-col>
                      <b-col cols="12" lg="7" class="d-flex align-items-center">
                        <span
                          >Precio Unitario: ${{ product.product.price }}</span
                        >
                      </b-col>
                    </b-row>
                    <b-row
                      class="d-flex justify-content-end align-items-center"
                    >
                      <b-col cols="12" md="3" class="text-right">
                        <b-card-text class="text-price"
                          ><b> Total: ${{ product.total }}</b></b-card-text
                        >
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-card>
            </b-row>

            <b-row
              class="d-flex flex-column align-items-start justify-content-start"
              style="width: 100%; margin: 0 auto"
            >
              <hr />
              <b-row
                class="d-flex justify-content-between align-items-center w-100 mt-2"
              >
                <b-col cols="auto" class="text-left text-by-price">
                  <p>Productos</p>
                  <p>Costo de Envío</p>
                  <p>Total</p>
                </b-col>
                <b-col cols="auto" class="text-right text-by-price">
                  <p>${{ cartBody.total }}</p>
                  <p>${{ totalFee }}</p>
                  <p>
                    <b>${{ total }}</b>
                  </p>
                </b-col>
              </b-row>
            </b-row>
          </b-col>
          <b-col cols="12" md="4">
            <b-card>
              <b-icon icon="box-seam" class="mx-2"></b-icon>
              <b>Forma de Entrega</b>
              <b-form-checkbox
                button-variant="orange-primary"
                name="check-button"
                v-model="isTakeinTheshop"
                @change="setIsTakenInShop"
                switch
              >
                Recolección
              </b-form-checkbox>
              <b-form-checkbox
                button-variant="orange-primary"
                name="check-button"
                v-model="isDelivered"
                @change="setIsDelivered"
                switch
              >
                Envío domicilio
              </b-form-checkbox>
            </b-card>
            <b-card class="my-2">
              <b-icon class="mx-2" icon="pin-map"></b-icon>
              <b>Dirección de Entrega</b>
              <br />
              <p v-show="!isTakeinTheshop">
                <b>Enviar a Domicilio</b> <br />
                {{ getFormattedAddress(cartBody.seller?.address) }}
              </p>
              <p v-show="isTakeinTheshop">
                <b>Retirar en Tienda</b> <br />
                {{ getFormattedAddress(cartBody.seller?.address) }}
              </p>
            </b-card>
            <b-alert show variant="warning" class="my-2">
              <b-icon class="mx-2" icon="exclamation-triangle"></b-icon>
              <b>Advertencia</b> <br />
              Si eliges la opción de recolección,
              <b class="title">
                recuerda que deberás venir personalmente a nuestra tienda para
                recoger tu producto.
              </b>
              Si prefieres que te lo enviemos a domicilio,
              <b class="title">
                te informamos que el costo de envío es de $30.00 pesos
              </b>
              . Por favor, asegúrate de seleccionar la opción que mejor se
              ajuste a tus necesidades antes de completar tu compra.
            </b-alert>
          </b-col>
        </b-row>
        <div class="d-flex align-items-end justify-content-end">
          <b-button variant="orange-secundary" class="mx-3"
            >Cancelar Pedido</b-button
          >
          <b-button variant="orange-primary" @click="confirmOrder"
            >Confirmar Pedido</b-button
          >
        </div>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import CustomerBuyOrderViewModel from "../viewmodels/CustomerBuyOrderViewModel";
export default {
  name: "CustomerOrderBuy",
  mixins: [CustomerBuyOrderViewModel],
};
</script>

<style scoped>
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
