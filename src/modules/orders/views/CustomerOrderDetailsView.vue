<template>
  <div>
    <navbar />
    <b-container  class="my-2">
    <b-row>
      <b-col cols="12" md="6">
        <h2 class="text-center">Peluche de Stitch</h2>
        <b-row >
          <b-col cols="12" md="12">
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp"
              alt="producto"
              class="img-main-product"
            />
          </b-col>
          <b-col cols="4" md="4">
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp"
              alt="producto"
              class="my-2 img-main-miniature"
            />
          </b-col>
          <b-col cols="4" md="4">
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp"
              alt="producto"
              class="my-2 img-main-miniature"
            />
          </b-col>
          <b-col cols="4" md="4">
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_685374-MLM31231435017_062019-O.webp"
              alt="producto"
              class="my-2 img-main-miniature"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" md="6">
        <h3 class="text-center">Detalles de la Compra</h3>
        <h5 class="text-center">15 de octubre del 2024</h5>
        <b-row class="my-5">
          <b-col cols="12" md="6">
            <p><b>Número de orden:</b> 155</p>
            <p><b>Tipo de entrega:</b> Envío</p>
            <p><b>Cantidad de Unidades:</b> 2</p>
            <p><b>ENTREGADO</b></p>
          </b-col>
          <b-col cols="12" md="6">
            <p><b>Producto:</b> Peluche de Stitch</p>
            <p><b>Precio:</b> $250</p>
            <p><b>Total:</b> $250</p>
          </b-col>
          <hr />
          <b-col cols="12" md="6">
            <h5>Detalles del pago</h5>
            <p>Visa Débito *****42423</p>
            <p><b>Pago aprobado</b></p>
          </b-col>
        </b-row>
        <b-row class="d-flex align-items-center justify-content-center">
          <b-col cols="auto">
            <b-button variant="orange-secundary" class="btn-centered"
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
import CustomerOrderDetailsViewModel from "../viewmodels/CustomerOrderDetailsViewModel";
export default {
  name: "CustomerOrderDetail",
  components: {
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
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
