<template>
  <div>
    <b-container  class="my-2">
    <b-row>
      <b-col cols="12" md="6">
        <h2 class="text-center">Peluche de Stitch</h2>
        <simple-gallery
                :images="deatilOrder.product.imagesProduct"
                galleryID="my-test-gallery"
                :mainImage="deatilOrder.product.mainImage"
              ></simple-gallery>
      </b-col>
      <b-col cols="12" md="6">
        <h3 class="text-center">Detalles de la Compra</h3>
        <h5 class="text-center">15 de octubre del 2024</h5>
        <b-card  >
        <b-row>
          <b-col cols="12" md="12">
            <b-badge :variant="assignColorBystatus('Entregado')">
              {{deatilOrder.status}}
            </b-badge>
            <b-badge class="mx-2" :variant="assignColorBystatus('Entregado')">
              {{deatilOrder.cardPay.statusPay}}
            </b-badge>
            <p>
              Tipo de entrega,
              <b>{{ deatilOrder.orderDeliveryType }}
                </b>, Número de order # {{ deatilOrder.orderNumber }}, 
              Método de pago <b>{{ deatilOrder.cardPay.typeCard }}</b>
            </p>
            
              <b-row
                class="d-flex justify-content-between align-items-center w-100 mt-2"
              > 
                <b-col cols="auto" class="text-left text-by-price">
                  <p>Cantidad</p>
                  <p>Costo de Envío</p>
                  <p>Total</p>
                </b-col>
                <b-col cols="auto" class="text-right text-by-price">
                  <p>{{ deatilOrder.product.amount }}</p>
                  <p>$30</p>
                  <p> 
                    <b>${{ deatilOrder.product.price }}</b>
                  </p>
                </b-col>  
              </b-row>
          </b-col>
        </b-row>
        </b-card>
        <b-row class="d-flex align-items-center justify-content-center my-2">
          <b-col cols="auto">
            <b-button variant="orange-primary" class="btn-centered"
              >Crear reseña</b-button
            >
          </b-col>
          <b-col cols="auto">
            <b-button variant="orange-secundary" class="btn-centered"
              >Volver a comprar</b-button
            >
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import CustomerOrderDetailsViewModel from "../viewmodels/CustomerOrderDetailsViewModel";
export default {
  name: "CustomerOrderDetail",
  components:{
    SimpleGallery: defineAsyncComponent(() =>
      import("../../public/components/SimpleGallery.vue")
    ),
  },
  mixins: [CustomerOrderDetailsViewModel],
};
</script>

<style scoped>
hr {
  width: 90%;
  height: 0.3px;
  background-color: rgb(194, 194, 194);
}

.img-main-product {
  width: 100%;
  max-width: 500px;
  height: 300px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  transition: transform 0.3s ease;
  object-fit: cover;
}

.img-main-miniature {
  width: 100%;
  height: 100px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  transition: transform 0.3s ease;
  object-fit: cover;
}

.btn-centered {
  width: 100%;
  max-width: 200px;
  margin: 5px;
}
</style>
