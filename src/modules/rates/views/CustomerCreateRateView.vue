<template>
  <div class="">
    <navbar />
    <b-container>
      <b-row class="my-5">
        <b-col
          class="d-flex align-items-centerjustify-content-center"
          cols="12"
          md="5"
        >
          <b-card>
            <img
              src="https://n9.cl/stich"
              alt="producto"
              class="my-2 img-main-product"
            />
            <h5 class="my-3 text-center">Detalles del producto</h5>
            <b-card-text>
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto. Lorem Ipsum ha sido el texto de relleno
              estándar de las industrias desde el año 1500, cuando un impresor
              (N. del T. persona que se dedica a la imprenta) desconocido usó
              una galería de textos y los mezcló de tal manera que logró hacer
              un libro de textos especimen.
            </b-card-text>
          </b-card>
        </b-col>
        <b-col cols="12" md="7">
          <h3>Peluche de Stitch</h3>
          <b-form class="my-3">
            <label for="rating-10">
              <b>Califica el producto</b>
            </label>
            <b-form-rating
              variant="warning"
              id="rating-10"
              stars="10"
              size="lg"
              no-border
              no-focus
            ></b-form-rating>
            <b-form-group
              id="input-group-1"
              label="Cuéntanos más acerca de tu producto"
              label-for="input-1"
              class="my-2"
            >
              <b-form-textarea
                id="textarea"
                placeholder="Ingresa brevemente alguna descripción de tu emprendimiento..."
                rows="3"
                max-rows="6"
              >
              </b-form-textarea>
            </b-form-group>
          </b-form>
          <DropZone
            @images-uploaded="updateImagesUpload"
            v-on:showLoading="showLoading"
          />
          <div class="d-flex justify-content-end mt-auto">
            <b-button class="my-3" variant="orange-secundary"
              >Enviar reseña</b-button
            >
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import CustomerCreateRateViewModel from "../viewmodel/CustomerCreateRateViewModel";
import DropZone from "@/components/DropZone.vue";

export default {
  name: "CustomerCreateRateViewModel",
  components: {
    Navbar: () => import("@/modules/public/components/Navbar.vue"),
    DropZone,
  },
  mixins: [CustomerCreateRateViewModel],
};
</script>

<style scoped>
.img-main-product {
  display: flex;
  align-items: baseline;
  justify-content: right;
  width: 100%;
  height: 300px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: transform 0.3s ease;
  object-fit: cover;
}
</style>
