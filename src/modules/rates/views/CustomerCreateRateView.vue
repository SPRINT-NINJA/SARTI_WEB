<template>
  <div>
    <navbar />
    <b-container>
      <b-row class="my-5">
        <b-col
          class="d-flex align-items-centerjustify-content-center"
          cols="12"
          md="5"
        >
          <b-card class="product">
            <h3 class="text-center">{{ getProduct.name }}</h3>
            <img
              :src="getProduct.mainImage"
              alt="producto"
              class="my-2 img-main-product"
            />
            <h5 class="my-3 text-center">Detalles del producto</h5>
            <b-card-text>
              {{ getProduct.description }}
            </b-card-text>
          </b-card>
        </b-col>
        <b-col cols="12" md="7">
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
            <b-form-group id="input-group-1" class="my-2">
              <label>
                <b> Cuéntanos más acerca de tu producto </b>
              </label>
              <b-form-textarea
                id="textarea"
                placeholder="Comenta acerca del producto que compraste"
                rows="3"
                max-rows="6"
              >
              </b-form-textarea>
            </b-form-group>
          </b-form>
          <h5>Comparte fotos de tu producto</h5>
          <DropZone
            v-show="showConfirmImage === false"
            @images-uploaded="updateImagesUpload"
            v-on:showLoading="confirmImages"
          />
          <div v-show="showConfirmImage">
            <b-container fluid>
             
              <b-row>
                <b-col v-for="value in imagesUpload" :key="value" cols="auto">
                  <img
                    :src="value"
                    alt="producto"
                    class="mb-3 img-main-evidence"
                  />
                </b-col>
              </b-row>
            </b-container>
          </div>
          <div class="d-flex justify-content-end mt-auto">
            <b-button class="my-3" variant="red-palete" @click="SendReview"
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
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  transition: transform 0.3s ease;
  object-fit: cover;
}

.img-main-evidence {
  width: 120px; /* Ajusta el tamaño para que entren más imágenes en una fila */
  height: auto;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  object-fit: cover;
}

.product {
  box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
    rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
}
</style>
