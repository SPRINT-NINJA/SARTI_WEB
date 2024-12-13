<template>
  <div>
    <b-row class="justify-content-center mt-4">
      <!-- Muestra los pedidos disponibles -->
      <b-col
        cols="12"
        v-for="(orderDelivery, index) in orderDeliveries"
        :key="index"
      >
        <b-card class="mb-2">
          <b-row>
            <!-- Información principal del pedido -->
            <b-col cols="12" class="px-3 pt-3">
              <h5 class="mb-2 order-title">
                <span>Pedido:</span>
                {{ orderDelivery.orderNumber }}
              </h5>
              <p>
                <b>Estado:</b>
                {{ orderDelivery.orderDeliveryStep }}
              </p>
              <p>
                <b>Cliente:</b>
                {{ orderDelivery.sartiOrder?.customer?.name }}
                {{ orderDelivery.sartiOrder?.customer?.fistLastName }}
              </p>
              <p>
                <b>Dirección:</b>
                {{ orderDelivery.address?.city }} -
                {{ orderDelivery.address?.street }},
                {{ orderDelivery.address?.colony }},
                {{ orderDelivery.address?.zipCode }}
              </p>
              <p><b>Total:</b> ${{ orderDelivery.sartiOrder?.total }}</p>
            </b-col>
            <b-col cols="12" class="d-flex justify-content-end my-2">
              <b-button variant="link" @click="toggleProducts(index)">
                {{
                  isShowProducts[index]
                    ? "Ocultar productos"
                    : "Mostrar productos"
                }}
              </b-button>
            </b-col>
          </b-row>
          <b-row v-if="isShowProducts[index]">
            <!-- Productos del pedido -->
            <b-col
              cols="12"
              v-for="orderProduct in orderDelivery.sartiOrder?.orderProducts"
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
                <b-row
                  v-if="isCustomerHistory"
                  class="d-flex justify-content-end"
                >
                  <b-col cols="12" sm="6" md="4">
                    <div>
                      <b-row>
                        <b-col cols="12" class="mt-2">
                          <b-button
                            variant="orange-primary"
                            block
                            @click="getProductPerDetails(orderProduct)"
                            >Volver a comprar</b-button
                          >
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
          <!-- Botón para tomar el pedido -->
          <div
            v-if="isDeliveryManToTakeList"
            class="d-flex justify-content-end mt-3"
          >
            <b-button variant="orange-primary" @click="takeOrder(orderDelivery)"
              >Tomar Pedido</b-button
            >
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import { encryptParamsId } from "@/kernel/utils/cryptojs";
import { defineComponent } from "vue";
import { OrderProduct } from "../../models/OrderDelivery";
import OrderDeliveryService from "../../services/OrderDeliveryService";
import PouchDB from "pouchdb";

const dbPetitions = new PouchDB("delivery-orders-petitions");
console.log("Petitions", dbPetitions);
export default defineComponent({
  name: "OrderDeliveriesList",
  props: {
    orderDeliveriesProp: {
      type: Array<any>,
      required: true,
    },
    initialToggleStateProp: {
      type: Boolean,
      required: true,
    },
    isCustomerHistoryProp: {
      type: Boolean,
      required: true,
    },
    isDeliveryManToTakeListProp: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      orderDeliveries: this.orderDeliveriesProp,
      initialToggleState: this.initialToggleStateProp,
      isCustomerHistory: this.isCustomerHistoryProp,
      isDeliveryManToTakeList: this.isDeliveryManToTakeListProp,
      isShowProducts: {} as Record<number, boolean>,
    };
  },
  watch: {
    online() {
      this.syncOfflineRequest();
    },
    // Observa los cambios en todas las props relacionadas
    orderDeliveriesProp: "initializeState",
    initialToggleStateProp: "initializeState",
    isCustomerHistoryProp(newVal) {
      this.isCustomerHistory = newVal;
    },
    isDeliveryManToTakeListProp(newVal) {
      this.isDeliveryManToTakeList = newVal;
    },
  },
  created() {
    // this.initializeState();
    window.addEventListener("online", this.syncOfflineRequest);
    this.syncOfflineRequest();
  },
  methods: {
    initializeState() {
      // Sincroniza las props con las variables locales
      this.orderDeliveries = this.orderDeliveriesProp;
      this.initialToggleState = this.initialToggleStateProp;

      // Inicializa isShowProducts para cada pedido
      this.isShowProducts = {}; // Limpia el estado anterior
      this.orderDeliveries.forEach((_, index) => {
        this.$set(this.isShowProducts, index, this.initialToggleState);
      });
    },
    takeOrder(orderToTake: any) {
      try {
        SweetAlertCustom.questionMessage(
          `¿Tomar el pedido ${orderToTake.orderNumber}?`
        ).then(async (result: any) => {
          if (result.isConfirmed) {
            if (navigator.onLine) {
              const resp = await OrderDeliveryService.takeOrderDelivery(
                orderToTake.id
              );
              const { error } = resp;
              if (!error) {
                SweetAlertCustom.successMessage();
                this.$emit("reload");
              }
            } else {
              console.log("offline");
              const payload = orderToTake.id;
              await dbPetitions.put({
                _id: new Date().toISOString(),
                payload,
                controllerFunction: "takeOrder",
              });
              alert(
                "No hay conexión a internet. La petición se guardara para ser ejecutada después"
              );
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    async syncOfflineRequest() {
      try {
        const allDocs = await dbPetitions.allDocs({ include_docs: true });

        if (allDocs.total_rows !== 0) {
          alert("Sincronizando peticiones");
        }
        for (const doc of allDocs.rows) {
          if (!doc.doc) {
            continue;
          }

          const { controllerFunction } = doc.doc as unknown as any;
          if (controllerFunction === "takeOrder") {
            const { payload } = doc.doc as unknown as any;
            const response = await OrderDeliveryService.takeOrderDelivery(
              payload
            );
            const { error } = response;
            if (!error) {
              SweetAlertCustom.successMessage("Peticiones sincronizadas");
              await dbPetitions.remove(doc.doc._id, doc.doc._rev);
            }
          }
        }
        await this.initializeState();
      } catch (error) {
        console.log("Error al sincronizar peticiones", error);
      }
    },
    async getProductPerDetails(item: OrderProduct) {
      try {
        if (!item.product || !item.product.id) {
          SweetAlertCustom.productDeletedOrInactive();
          return;
        }

        const {
          product: { id },
        } = item;

        const encryptParam = encryptParamsId(id!.toString());
        await this.$router.push({
          name: "product-details",
          params: { id: encryptParam },
        });
      } catch (error) {
        console.error(error);
      }
    },
    toggleProducts(index: number) {
      // Alterna el estado del índice específico
      this.$set(this.isShowProducts, index, !this.isShowProducts[index]);
    },
  },
  beforeDestroy() {
    // Elimina el evento al destruir el componente
    window.removeEventListener("online", this.syncOfflineRequest);
  },
});
</script>

<style>
/* Pedido título con énfasis */
.order-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6f00;
}
</style>
