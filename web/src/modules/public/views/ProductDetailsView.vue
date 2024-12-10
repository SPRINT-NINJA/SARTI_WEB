<template>
  <div>
    <custom-overlay :isLoading="isLoading" />
    <b-container fluid class="mt-4 mb-4 vh-100">
      <div class="shadow">
        <b-row no-gutters class="w-100 mt-2">
          <!-- Imagenes del producto -->
          <b-col cols="12" md="6">
            <section class="m-2 p-4">
              <simple-gallery
                :images="productSelected.productImages"
                galleryID="my-test-gallery"
                :mainImage="productSelected.mainImage"
              ></simple-gallery>
            </section>
          </b-col>
          <!-- Detalles del producto -->
          <b-col cols="12" md="6">
            <section class="m-2 p-4">
              <b-card class="shadow">
                <div class="d-flex justify-content-end">
                  <h5>
                    <b-badge
                      :variant="productSelected.status ? 'success' : 'danger'"
                      >{{
                        productSelected.status ? "Disponible" : "Agotado"
                      }}</b-badge
                    >
                  </h5>
                </div>
                <div>
                  <h1>{{ productSelected.name }}</h1>
                </div>
                <div>
                  <label for="rating-inline"
                    ><strong>{{ productSelected.rating }}</strong></label
                  >
                  <b-form-rating
                    v-model="productSelected.rating"
                    inline
                    stars="10"
                    readonly
                    no-border
                    no-focus
                    variant="warning"
                  ></b-form-rating>
                </div>
                <div>
                  <p class="details-price">${{ productSelected.price }}</p>
                </div>
                <div>
                  <b-row class="w-100">
                    <b-col cols="12" lg="5" class="d-flex align-items-center">
                      <span class="mr-3"> Cantidad: </span>
                      <div>
                        <b-input-group class="quantity-selector">
                          <b-input-group-prepend>
                            <b-button
                              variant="outline-info"
                              size="sm"
                              @click="decrement"
                              >-</b-button
                            >
                          </b-input-group-prepend>

                          <b-form-input
                            size="sm"
                            type="text"
                            class="text-center"
                            v-model="quantity"
                          ></b-form-input>

                          <b-input-group-append>
                            <b-button
                              variant="outline-secondary"
                              size="sm"
                              @click="increment"
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
                        >(+ {{ productSelected.stock }} disponibles)</span
                      >
                    </b-col>
                  </b-row>
                </div>
                <div class="mt-3 mb-5">
                  <h4>Lo que tienes que saber del producto:</h4>
                  <p class="mt-3">{{ productSelected.description }}</p>
                </div>
                <div class="mt-5">
                  <b-row>
                    <b-col cols="12" md="6">
                      <b-button block variant="orange-primary"
                        >Agregar al carrito</b-button
                      >
                    </b-col>
                  </b-row>
                </div>
              </b-card>
            </section>
          </b-col>
        </b-row>
        <b-row no-gutters class="w-100 mt-2">
          <b-col cols="12" md="12">
          <section v-if="resumeRating.rating === 0 && ratingList.length === 0 ">
            <div class="mb-2 text-center">
              <img src="@/assets/NoRate.svg" class="w-70 sold-out-image" />
              <br />
              <h5>
                Sé el primero en calificar este producto y agrégalo a tu carrito.
              </h5>
            </div>
          </section>
          </b-col>
          <b-col  v-if="resumeRating.rating != 0 && ratingList.length != 0 " cols="12" md="6">
            <section class="py-3 px-5">
              <h3>Opiniones del producto</h3>
              <rating-resume
                :rating="resumeRating"
              ></rating-resume>
            </section>
          </b-col>
          <b-col  v-if="resumeRating.rating != 0 && ratingList.length != 0 " cols="12" md="6">
            <section class="py-3 px-5 overflow-auto" style="max-height: 400px">
              <h3>Opiniones con fotos</h3>
              <opinion-comment
                :comments="ratingList"
              ></opinion-comment>
            </section>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script lang="ts">
import { defineAsyncComponent } from "vue";
import ProductDetailsViewModel from "../viewmodels/ProductDetailsViewModel";

export default {
  name: "ProductDetailsView",
  components: {
    RatingResume: defineAsyncComponent(
      () => import("../components/RatingResume.vue")
    ),
    SimpleGallery: defineAsyncComponent(
      () => import("../components/SimpleGallery.vue")
    ),
    OpinionComment: defineAsyncComponent(
      () => import("../components/OpinionComment.vue")
    ),
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
  },
  mixins: [ProductDetailsViewModel],
};
</script>

<style scoped>
.quantity-selector {
  max-width: 90px;
}

.sold-out-image{
  height: 100px;
}
</style>
