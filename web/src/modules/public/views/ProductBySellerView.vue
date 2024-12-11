<template>
  <div class="">
    <b-container fluid class="mt-4 mb-4">
      <custom-overlay :isLoading="isLoading" />
      <b-row>
        <b-col cols="12" md="4">
          <b-card no-body class="w-100 shadow">
            <img
              src="../../../assets/bienvenida.svg"
              class="custom-img"
              role="button"
            />
            <div class="p-2 text-center">
              <h3>
                Tienda <b>{{ productsSeller[0].seller.bussinessName }}</b>
                <b-icon icon="check2-circle" variant="success"></b-icon>
              </h3>
              <span>{{ productsSeller[0].seller.description }}</span>
            </div>
          </b-card>
          <div class="my-2">
            <b-card class="text-center select">
              <b-icon icon="clock" variant="warning" scale="2" class="my-2"></b-icon>
              <b-form-checkbox
                button-variant="orange-primary"
                name="check-button"
                v-model="recentlyProduct"
                @change="changeSelectTopRated"
                switch
                size="lg"
              >
                <h5>
                  <b> Más recientes </b>
                </h5>
              </b-form-checkbox>
            </b-card>
            <b-card class="my-2 text-center select">
              <b-icon icon="star" variant="warning" scale="2" class="my-2"></b-icon>
              <b-form-checkbox
                button-variant="warning"
                name="check-button"
                v-model="topRated"
                @change="changeRecently"
                switch
                size="lg"
              >
                <h5>
                  <b> Mejores calificados </b>
                </h5>
              </b-form-checkbox>
            </b-card>
          </div>
        </b-col>
        <b-col cols="12" md="8">
          <section v-if="productsSeller.length === 0">
        <div class="mb-2 text-center ">
          <img src="@/assets/NoProducts.svg" class="w-70 sold-out-image" >
          <br>
          <h5>No hay productos, lo lamentamos se han acabado los productos</h5>
        </div>
      </section>
      <section v-if="productsSeller.length != 0" >
        <div class="mb-2">
          <h3>Te va a encantar</h3>
        </div>
        <b-row class="mt-2">
          <b-col
            cols="12"
            sm="6"
            md="4"
            v-for="product in productsSeller"
            :key="product.id"
            class="mt-2 mb-2"
          >
            <b-card no-body class="custom-card w-100 shadow">
              <b-card-img
                :src="product.mainImage"
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
      <!-- Pagination -->
      <section v-if="productsSeller.length != 0">
            <b-row class="bg-light m-0 py-3 py-sm-2 py-lg-1">
              <b-col
                cols="12"
                md="3"
                class="d-flex justify-content-center justify-content-md-start"
              >
                <b class="fw-bold"
                  >Mostrando
                  {{
                    pagination.totalRows === 0
                      ? 0
                      : (pagination.page - 1) * pagination.size + 1
                  }}
                  a
                  {{
                    pagination.page * pagination.size > pagination.totalRows
                      ? pagination.totalRows
                      : pagination.page * pagination.size
                  }}
                  de {{ pagination.totalRows }} registros</b
                >
              </b-col>

              <b-col
                cols="6"
                md="6"
                class="d-flex align-items-end align-items-md-center justify-content-center"
              >
                <b-pagination
                  align="center"
                  size="sm"
                  class="my-0"
                  v-model="pagination.page"
                  :total-rows="pagination.totalRows"
                  :per-page="pagination.size"
                  aria-controls="table-transition-example"
                  @change="handlePageChange"
                  pills
                ></b-pagination>
              </b-col>
              <b-col cols="6" md="3">
                <div class="d-md-flex">
                  <b>Registros por página</b>
                  <b-form-select
                    size="sm"
                    v-model="pagination.size"
                    @change="handleResetPage"
                    :options="optionsFieldToPage"
                  ></b-form-select>
                </div>
              </b-col>
            </b-row>
          </section>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import ProductBySellerViewModel from "../viewmodels/ProductBySellerViewModel";
export default {
  name: "seller-products",
  components:{
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
  },
  mixins: [ProductBySellerViewModel],
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
  object-fit: cover; /* Hace que la imagen se adapte sin distorsionarse */
  height: 200px; /* Define una altura fija para mantener la consistencia */
  width: 100%; /* Ocupa todo el ancho del contenedor */
}
.select {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.sold-out-image{
  height:220px;
}
</style>
