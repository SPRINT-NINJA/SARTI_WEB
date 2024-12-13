<template>
  <div>
    <custom-overlay :isLoading="isLoading" />
    <div class="container-fluid card-container">
      <b-row class="mt-4">
        <!-- Pedido asignado -->
        <b-col cols="12" md="6" lg="6" class="mb-4">
          <h2 class="section-title">Pedido Asignado</h2>

          <!-- Pedido lleno -->
          <b-row class="justify-content-center mt-4" v-if="takenOrderDelivery">
            <b-col cols="12">
              <b-card>
                <b-row>
                  <b-col cols="6">
                    <h5 class="mb-2 order-title">
                      <span>Pedido:</span>
                      {{ takenOrderDelivery.orderNumber }}
                    </h5>
                  </b-col>
                  <b-col
                    cols="6"
                    class="d-flex justify-content-end align-items-start"
                  >
                    <!-- Botones de acción alineados a la derecha -->
                    <div
                      v-if="
                        takenOrderDelivery.orderDeliveryStep ===
                        'Pendiente de envío'
                      "
                    >
                      <b-button
                        variant="orange-primary"
                        @click="handleChangeStep(takenOrderDelivery)"
                        >Comenzar Envío</b-button
                      >
                    </div>
                    <div v-else>
                      <b-button
                        variant="orange-secundary"
                        @click="handleChangeStep(takenOrderDelivery)"
                        >Terminar Pedido</b-button
                      >
                    </div>
                  </b-col>
                  <b-col
                    cols="12"
                    class="d-flex align-items-center justify-content-center"
                  >
                    <img
                      class="logo"
                      src="@/assets/motoEntrega.svg"
                      alt="Icono repartidor"
                      fluid
                      rounded
                      width="300px"
                      height="auto"
                    />
                  </b-col>
                </b-row>
                <hr />
                <!-- Datos de la entrega -->
                <h5 class="mb-3">Datos del pedido</h5>
                <b-row>
                  <b-col
                    cols="4"
                    class="d-flex align-items-center justify-content-center"
                  >
                    <b-avatar
                      :src="takenOrderDelivery.deliveryMan?.facePhoto"
                      rounded
                      alt="Foto del repartidor"
                      size="4rem"
                    ></b-avatar>
                  </b-col>
                  <b-col cols="8" class="text-left">
                    <p class="mb-0">
                      <b>Repartidor:</b>
                      {{ takenOrderDelivery.deliveryMan?.name }}
                      {{ takenOrderDelivery.deliveryMan?.fistLastName }}
                    </p>
                  </b-col>
                </b-row>
                <hr />
                <b-row>
                  <b-col
                    cols="4"
                    class="d-flex align-items-center justify-content-center"
                  >
                    <b-avatar rounded size="4rem"></b-avatar>
                  </b-col>
                  <b-col cols="8" class="text-left">
                    <p class="mb-0">
                      <b>Cliente:</b>
                      {{ takenOrderDelivery.sartiOrder?.customer?.name }}
                      {{
                        takenOrderDelivery.sartiOrder?.customer?.fistLastName
                      }}
                    </p>
                    <p class="mb-0">
                      <b>Dirección:</b>
                      {{ takenOrderDelivery.address?.street }},
                      {{ takenOrderDelivery.address?.colony }},
                      {{ takenOrderDelivery.address?.city }},
                      {{ takenOrderDelivery.address?.zipCode }}
                    </p>
                    <p class="mb-0">
                      <b>Referencia:</b>
                      {{ takenOrderDelivery.address?.referenceNear }}
                    </p>
                    <p class="mb-0">
                      <b>Tipo:</b>
                      {{ takenOrderDelivery.address?.addressType }}
                    </p>
                  </b-col>
                </b-row>
                <hr />
                <!-- Productos del pedido -->
                <h5 class="mb-3">Productos del pedido</h5>
                <b-row>
                  <b-col
                    cols="12"
                    v-for="orderProduct in takenOrderDelivery.sartiOrder
                      ?.orderProducts"
                    :key="orderProduct.id"
                    class="mt-1"
                  >
                    <b-card no-body shadow w-100 class="py-2 px-2 mb-2">
                      <b-row class="align-items-center h-100">
                        <b-col cols="auto">
                          <div>
                            <b-avatar
                              :src="orderProduct.productInfo.mainImage"
                              size="100px"
                              rounded
                            ></b-avatar>
                          </div>
                        </b-col>
                        <b-col cols="12" md="8" class="pl-3 my-3">
                          <div>
                            <b>Producto:</b> {{ orderProduct.productInfo.name }}
                          </div>
                          <div>
                            <b>Descripción:</b>
                            {{ orderProduct.productInfo.description }}
                          </div>
                          <div>
                            <b>Precio:</b> ${{ orderProduct.productInfo.price }}
                          </div>
                          <div><b>Cantidad:</b> {{ orderProduct.amount }}</div>
                          <div><b>Total:</b> ${{ orderProduct.total }}</div>
                        </b-col>
                      </b-row>
                    </b-card>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>

          <!-- Pedido vacío -->
          <empty-list-banner
            v-else
            :imageProp="require('@/assets/motoSinPedidos.svg')"
            titleProp="Sin pedido en curso"
            subtitleProp="¡No esperes más y toma un pedido disponible!"
            class="h-100"
          />
        </b-col>
        <!-- Historial de pedidos -->
        <b-col cols="12" md="6" lg="6" class="mb-4">
          <h2 class="section-title">Historial de Pedidos</h2>

          <!-- Listado lleno -->
          <b-container v-if="orderDeliveriesHistory.length">
            <order-deliveries-list
              :orderDeliveriesProp="orderDeliveriesHistory"
              :initialToggleStateProp="false"
              :isCustomerHistoryProp="false"
              :isDeliveryManToTakeListProp="false"
            />
            <b-row class="justify-content-center mt-4">
              <b-col cols="12">
                <div
                  class="d-flex align-items-center justify-content-center my-2"
                >
                  <b-pagination
                    v-model="pagination.page"
                    :total-rows="totalRows"
                    :per-page="pagination.size"
                    size="sm"
                    pills
                    @change="handlePageChange"
                  ></b-pagination>
                </div>
              </b-col>
            </b-row>
          </b-container>

          <!-- Listado vacío -->
          <empty-list-banner
            v-else
            :imageProp="require('@/assets/empty_list.svg')"
            titleProp="Aún no has generado un historial"
            subtitleProp="¡Explora y toma tu primer pedido ahora!"
            class="h-100"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import OrderAssignedViewModel from "../viewmodels/OrderAssignedViewModel";
export default {
  name: "DeliveryOrderAssigned",
  components: {
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
    OrderDeliveriesList: () =>
      import("@/modules/delivery/views/components/OrderDeliveriesList.vue"),
    EmptyListBanner: () => import("@/views/components/EmptyListBanner.vue"),
  },
  mixins: [OrderAssignedViewModel],
};
</script>

<style>
/* Estilo del título de la sección */
.section-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 1rem;
  margin-top: 20px;
}

.order-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6f00;
}
</style>
