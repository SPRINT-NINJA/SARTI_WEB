<template>
  
  <div class="">
    <b-container fluid class="mt-4 mb-4 vh-100">
        <b-row no-gutters class="w-100 mt-2">
            <b-col cols="12" md="6">
            <section class="m-2 p-4">
              <simple-gallery
                :images="product.images"
                galleryID="my-test-gallery"
                :mainImage="product.mainImage"
              ></simple-gallery>
            </section>
          </b-col>
          <b-col cols="12" md="6">
            <section class="m-2 p-4">
              <b-card class="shadow">
                <div class="d-flex justify-content-end">
                  <h5>
                    <b-badge variant="success">Disponible</b-badge>
                  </h5>
                </div>
                <div>
                  <h1>{{ product.name }}</h1>
                </div>
                <div>
                  <label for="rating-inline"
                    ><strong>{{ product.rating }}</strong></label
                  >
                  <b-form-rating
                    v-model="product.rating"
                    inline
                    stars="10"
                    readonly
                    no-border
                    no-focus
                    variant="warning"
                  ></b-form-rating>
                </div>
                <div>
                  <p class="details-price">${{ product.price }}</p>
                </div>
                <div>
                  <b-row class="w-100">
                   
                    <b-col
                      cols="12"
                      lg="7"
                      class="d-flex justify-content-start"
                    >
                      <span class="available-stock"
                        >({{ product.stock }} disponibles)</span
                      >
                    </b-col>
                  </b-row>
                </div>
                <div class="mt-3 mb-5">
                  <h4>Lo que tienes que saber del producto:</h4>
                  <p class="mt-3">{{ product.description }}</p>
                </div>
                <div class="mt-5">
                  <b-row>
                    <b-col cols="12" md="6">
                      <b-button block variant="red-palete" @click="getUpdateProduct(product.id)"
                        >Editar</b-button
                      >
                    </b-col>
                    <b-col cols="12" md="6">
                      <b-button block variant="orange-primary" @click="listRateProduct(product.id)"
                        >Ver reseñas</b-button
                      >
                    </b-col>
                  </b-row>
                </div>
              </b-card>
            </section>
          </b-col>
        </b-row>
    </b-container>
  </div>

</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
import ProductDetailViewModel from '../viewmodel/ProductDetailViewModel';
export default {
    name:"DetailProduct",
    components:{
        SimpleGallery: defineAsyncComponent(() =>
        import("../../public/components/SimpleGallery.vue")
    )
    },
    mixins:[ProductDetailViewModel]

}
</script>

<style>

</style>