<template>
  <div>
    <custom-overlay :isLoading="isLoading" />
    <b-container fluid class="mt-4 mb-4 vh-100">
      <b-row class="align-items-center mt-5">
        <b-col sm="12" md="9">
          <h1>Productos</h1>
        </b-col>
        <b-col sm="12" md="3" class="d-flex justify-content-end">
          <b-button
            variant="orange-primary"
            class="d-flex align-items-center justify-content-between"
            block
            >Crear producto &nbsp;<b-icon icon="plus" font-scale="2"></b-icon
          ></b-button>
        </b-col>
      </b-row>

      <!-- Seccion de listado -->
      <div class="mt-4">
        <section class="px-2">
          <div v-for="(product, index) in products" :key="index" class="mb-2">
            <b-card no-body shadow w-100 class="py-2 px-2">
              <div class="mb-4">
                <b-badge
                  v-if="product.status"
                  variant="success"
                  class="position-absolute text-center"
                  style="top: 0; left: 0"
                  >Activo</b-badge
                >
                <b-badge
                  v-else
                  variant="danger"
                  class="position-absolute text-center"
                  style="top: 0; left: 0"
                  >Inactivo</b-badge
                >
              </div>
              <b-row>
                <b-col>
                  <b-row class="align-items-center h-100">
                    <b-col cols="auto">
                      <b-avatar
                        :src="product.mainImage"
                        rounded
                        size="100px"
                        class="mr-3"
                      ></b-avatar>
                    </b-col>
                    <b-col>
                      <div>
                        <div><strong>Nombre:</strong> {{ product.name }}</div>
                        <div>
                          <strong>Precio:</strong>: ${{ product.price }}
                        </div>
                        <div><strong>Stock:</strong> {{ product.stock }}</div>
                      </div>
                    </b-col>
                    <b-col sm="12" md="auto" class="mt-3">
                      <div>
                        <b-button
                          variant="orange-primary"
                          size="sm"
                          class="mr-2"
                          v-b-tooltip.hover
                          title="Editar"
                        >
                          <b-icon icon="pencil"></b-icon>
                        </b-button>
                        <b-button
                          variant="orange-secundary"
                          size="sm"
                          class="mr-2"
                          @click="handleUpdateStock(product)"
                          v-b-tooltip.hover
                          title="Actualizar stock"
                        >
                          <b-icon icon="clipboard-plus"></b-icon>
                        </b-button>
                        <b-button
                          variant="brown-cacao"
                          size="sm"
                          class="mr-2"
                          v-b-tooltip.hover
                          @click="changeStatus(product)"
                          title="Cambiar estado"
                        >
                          <b-icon icon="arrow-down-up"></b-icon>
                        </b-button>
                        <b-button
                          variant="danger"
                          size="sm"
                          class="mr-2"
                          v-b-tooltip.hover
                          @click="deleteProduct(product)"
                          title="Eliminar"
                        >
                          <b-icon icon="trash"></b-icon>
                        </b-button>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-card>
          </div>
          <!-- Pagination -->
          <section>
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
        </section>
      </div>
    </b-container>
    <update-stock
      :updateStockProp="updateStockProp"
      @reloadProducts="getAllProducts"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import ProductListViewModel from "../viewmodel/ProductListViewModel";

export default defineComponent({
  name: "ProductListView",
  components: {
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
    UpdateStock: defineAsyncComponent(
      () => import("@/modules/products/view/components/UpdateStock.vue")
    ),
  },
  setup() {
    return {
      // Add your code here
    };
  },
  mixins: [ProductListViewModel],
});
</script>
