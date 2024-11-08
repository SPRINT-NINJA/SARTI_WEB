<template>
  <div class="my-4 mx-2">
    <b-container fluid class="mt-4 mb-4">
      <section>
        <div class="mb-2">
          <h3>Los mejores calificados</h3>
        </div>
        <b-row class="mt-2">
          <b-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="product in products"
            :key="product.id"
            class="mt-2 mb-2"
          >
            <b-card no-body class="custom-card w-100 shadow">
              <b-card-img
                :src="product.image"
                :alt="product.name"
                class="custom-img"
                role="button"
                @click="getProductPerDetails(product)"
              />
              <div class="p-2">
                <span>{{ product.name }}</span>
              </div>
              <div>
                <b-row>
                  <b-col cols="11" md="11">
                    <b-form-rating
                      v-model="product.rating"
                      stars="10"
                      readonly
                      no-border
                      no-focus
                      variant="warning"
                    ></b-form-rating>
                  </b-col>
                </b-row>
              </div>
              <div class="d-flex justify-content-end p-2">
                <strong class="text-bold">${{ product.price }}</strong>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </section>
      <section>
        <b-row class="my-2" >
          <b-col cols="12" md="8">
            <b-card overlay class="card-by-image"  footer-tag="footer">
           
                <template #footer>
                  <em>Footer Slot</em>
                </template>
            </b-card>
          </b-col>
          <b-col col="12" md="4">
            <b-card
              overlay
              text-variant="white"
              title="Image Overlay"
              sub-title="Subtitle"
              class="card-by-image-little"
            >
            </b-card>
          </b-col>
        </b-row>
      </section>
      <section>
        <b-row class="mt-2">
          <b-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="product in products"
            :key="product.id"
            class="mt-2 mb-2"
          >
            <b-card no-body class="custom-card w-100 shadow">
              <b-card-img
                :src="product.image"
                :alt="product.name"
                class="custom-img"
                role="button"
                @click="getProductPerDetails(product)"
              />
              <div class="p-2">
                <span>{{ product.name }}</span>
              </div>
              <div>
                <b-row>
                  <b-col cols="11" md="11">
                    <b-form-rating
                      v-model="product.rating"
                      stars="10"
                      readonly
                      no-border
                      no-focus
                      variant="warning"
                    ></b-form-rating>
                  </b-col>
                </b-row>
              </div>
              <div class="d-flex justify-content-end p-2">
                <strong class="text-bold">${{ product.price }}</strong>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </section>
    </b-container>
  </div>
</template>

<script>
import ProductTopRatedViewModel from "../viewmodels/ProductTopRatedViewModel";
export default {
  name: "ProductTopRated",
  mixins: [ProductTopRatedViewModel],
};
</script>

<style scoped>
.custom-card {
  overflow: hidden;
  transition: transform 0.3s ease; /* Añade una transición suave */
  border-radius: 15px;
}
.custom-card:hover {
  transform: scale(1.02);
}
.custom-img {
  object-fit: cover;
  height: 200px;
  width: 100%;
}
.card-by-image {
  height: 250px;
  max-height: 250px;
  width: 820px;
  max-width: 820px;
  overflow: hidden;
  transition: transform 0.3s ease;
  background-image: url("https://picsum.photos/1000/1000");
  background-size: cover;
  background-position: center;
}
.card-by-image-little {
  height: 250px;
  max-height: 250px;
  width: 380px;
  max-width: 380px;
  overflow: hidden;
  transition: transform 0.3s ease;
  background-image: url("https://picsum.photos/1000/1000");
  background-size: cover;
  background-position: center;
}
</style>
