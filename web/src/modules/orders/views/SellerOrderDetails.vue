<template>
  <div>
    <b-container fluid class="mt-4 mb-4 vh-100">
      <b-row class="align-items-center mt-5">
        <b-col sm="12" md="9">
          <h1>Detalles del pedido</h1>
        </b-col>
        <b-col cols="12">
          <b-row>
            <b-col cols="8">
              <b-card no-body shadow class="py-3 px-3 h-100">
                <b-row>
                  <b-col cols="12">
                    <p class="title-order">
                      <strong> No. de pedido:</strong>
                      {{ order.orderNumber ? order.orderNumber : "12345" }}
                    </p>
                  </b-col>
                  <b-col cols="6">
                    <p>
                      <strong> Tipo de venta:</strong>
                      {{
                        order.orderDeliveryType ? order.orderDeliveryType : ""
                      }}
                    </p>
                    <p>
                      <strong>Costo de envio: </strong>
                      {{ order.fee ? `$${order.fee}` : "NA" }}
                    </p>
                    <p>
                      <strong> Total:</strong>
                      {{ order.sartiOrder ? `$${order.sartiOrder.total}` : "" }}
                    </p>
                  </b-col>
                  <b-col cols="6">
                    <p>
                      <strong>Estado: </strong>
                      {{
                        order.orderDeliveryStep
                          ? order.orderDeliveryStep
                          : "No especificado"
                      }}
                    </p>
                    <p>
                      <strong> Dirección de reparto:</strong>
                      {{
                        order.address
                          ? `${order.address.country}, ${order.address.state}, ${order.address.city}, ${order.address.colony}`
                          : "No especificado"
                      }}
                    </p>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>

            <b-col cols="4">
              <b-card no-body shadow class="py-2 px-2 h-100">
                <div>
                  <p>
                    <strong>No. de repartidor: </strong>
                    {{
                      order.deliveryMan
                        ? order.deliveryMan.deliveryManNumber
                        : "No especificado"
                    }}
                  </p>
                </div>
                <div>
                  <p>
                    <strong> Nombre: </strong>
                    {{
                      order.deliveryMan
                        ? order.deliveryMan.name
                        : "No especificado"
                    }}
                  </p>
                </div>
                <div class="w-100">
                  <b-avatar
                    rounded
                    class="w-100"
                    style="height: auto"
                    ::src="
                      order.deliveryMan?.facePhoto
                        ? order.deliveryMan.facePhoto
                        : 'https://via.placeholder.com/150'
                    "
                  ></b-avatar>
                </div>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col cols="12">
              <h3>Productos</h3>
              <div v-if="order?.sartiOrder?.orderProducts">
                <div
                  v-for="(product, index) in order.sartiOrder.orderProducts"
                  :key="index"
                  class="mb-2"
                >
                  <b-card no-body shadow w-100 class="py-2 px-2">
                    <b-row>
                      <b-col>
                        <b-row class="align-items-center h-100">
                          <b-col cols="auto">
                            <b-avatar
                              :src="product.product.mainImage"
                              rounded
                              size="100px"
                              class="mr-3"
                            ></b-avatar>
                          </b-col>
                          <b-col>
                            <div>
                              <div>
                                <strong>Nombre:</strong>
                                {{ product.product.name }}
                              </div>
                              <div>
                                <strong>Precio:</strong>: ${{
                                  product.product.price
                                }}
                              </div>
                              <div>
                                <strong>Cantidad:</strong>
                                {{ product.amount }}
                              </div>
                              <div>
                                <strong>Total:</strong>
                                ${{ product.total }}
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-card>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SellerOrderDetailsViewModel from "../viewmodels/SellerOrderDetailsViewModel";

export default defineComponent({
  name: "SellerOrderDetails",
  mixins: [SellerOrderDetailsViewModel],
});
</script>
<style scoped>
.title-order {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffa446
}
</style>