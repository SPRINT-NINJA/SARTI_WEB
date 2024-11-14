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
            v-for="product in productPart1"
            :key="product.id"
            class="mt-2 mb-2"
          >
            <b-card no-body class="custom-card w-100 shadow">
              <b-card-img
                :src="product.image"
                :alt="product.name"
                class="custom-img"
                role="button"
                @click="()=>{}"
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
        <b-row class="my-2">
          <b-col cols="12" md="8">
            <b-card
              overlay
              class="card-by-image"
              footer-tag="footer"
              :style="{ backgroundImage: `url(${productPart2[0].image || imageUrl   })`, position: 'relative', height: '300px' }"
            >
              <template #footer>
                <h2>{{ productPart2[0].name }}</h2>
                    <div class="d-flex align-items-between justify-content-between">
                <b-form-rating
                      v-model="productPart2[0].rating"
                      stars="10"
                      readonly
                      no-border
                      no-focus
                      variant="warning"
                      class="w-50 mx-2"
                      style="background-color: transparent;"
                    ></b-form-rating>
                      <h3>${{ productPart2[0].price }}</h3>
                    </div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="4">
            <b-card
              overlay
              class="card-by-image-little"
              footer-tag="footer"
              :style="{ backgroundImage: `url(${productPart2[1].image || imageUrl   })`, position: 'relative', height: '300px' }"
            >
              <template #footer>
                <h3>{{ productPart2[1].name }}</h3>
                    <div class="d-flex align-items-between justify-content-between">
                <b-form-rating
                      v-model="productPart2[1].rating"
                      stars="10"
                      readonly
                      no-border
                      no-focus
                      variant="warning"
                      class="w-50"
                      style="background-color: transparent;"
                    ></b-form-rating>
                      <h4>${{ productPart2[1].price }}</h4>
                    </div>
              </template>
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
            v-for="product in productPart3"
            :key="product.id"
            class="mt-2 mb-2"
          >
            <b-card no-body class="custom-card w-100 shadow">
              <b-card-img
                :src="product.image"
                :alt="product.name"
                class="custom-img"
                role="button"
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
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  transition: transform 0.3s ease;
  background-size: cover;
  background-position: center;
}

.card-by-image:hover {
  transform: scale(1.02);
}

.card-by-image footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(59, 59, 59, 0.8); /* Cambia el color si es necesario */
  padding: 10px;
  color: white;
}

.card-by-image-little {
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  transition: transform 0.3s ease;
  background-image: url("https://picsum.photos/1000/1000");
  background-size: cover;
  background-position: center;
}
.card-by-image-little:hover {
  transform: scale(1.02);
}

.card-by-image-little footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(59, 59, 59, 0.8); /* Cambia el color si es necesario */
  padding: 10px;
  color: white;
}
</style>
