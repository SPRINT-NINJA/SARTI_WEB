<template>
  <div>
    <b-container fluid class="mt-4 mb-4 vh-100">
      <b-row class="align-items-center mt-5">
        <b-col sm="12" md="9">
          <h1>Ordenes</h1>
        </b-col>
        <b-col cols="12">
          <div class="mt-4 shadow">
            <section class="px-2">
              <b-table
                id="table-transition-example"
                responsive
                hover
                small
                borderless
                :fields="fields"
                :tbody-transition-props="transProps"
                :items="orders"
                :busy="isBusy"
                show-empty
              >
                <template #table-busy>
                  <div class="text-center text-secondary my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Cargando...</strong>
                  </div>
                </template>

                <template #empty>
                  <h4 class="pt-2 text-center">Sin registros</h4>
                  <empty-list-banner
                    :imageProp="require('@/assets/empty_list.svg')"
                    titleProp="Aún no  han hecho un pedido"
                    subtitleProp="¡Esperemos que pronto recibas una!"
                    class="h-100"
                  />
                </template>

                <template #cell(id)="row">
                  <b>{{
                    (pagination.page - 1) * pagination.size + 1 + row.index
                  }}</b>
                </template>
                <template #cell(deliveryMan)="row">
                  {{
                    row.item.deliveryMan
                      ? row.item.deliveryMan.deliveryManNumber
                      : "Sin asignar"
                  }}
                </template>
                <template #cell(address)="row">
                  <b>{{
                    row.item.address
                      ? row.item.address.street +
                        ", " +
                        row.item.address.city +
                        ", " +
                        row.item.address.state
                      : "Dirección no especificada"
                  }}</b>
                </template>

                <template #cell(status)="row">
                  <b-badge
                    variant="warning"
                    v-if="
                      row.item.orderDeliveryStep ===
                      StepOrderStatus.PENDIENTE_DE_REPARTIDOR
                    "
                    >PR</b-badge
                  >
                  <b-badge
                    variant="brown-cacao"
                    v-else-if="
                      row.item.orderDeliveryStep ===
                      StepOrderStatus.PENDIENTE_DE_ENVIO
                    "
                    >PE</b-badge
                  >
                  <b-badge
                    variant="orange-primary"
                    v-else-if="
                      row.item.orderDeliveryStep ===
                      StepOrderStatus.PENDIENTE_DE_RECOLECCION
                    "
                    >P-REC</b-badge
                  >
                  <b-badge
                    variant="primary"
                    v-else-if="
                      row.item.orderDeliveryStep === StepOrderStatus.ENVIADO
                    "
                    >Enviado</b-badge
                  >
                  <b-badge
                    variant="success"
                    v-else-if="
                      row.item.orderDeliveryStep === StepOrderStatus.ENTREGADO
                    "
                    >Entregado</b-badge
                  >
                </template>

                <template #cell(actions)="row">
                  <b-button
                    size="sm"
                    variant="brown-cacao"
                    class="mr-1"
                    v-b-tooltip.hover.top.noninteractive
                    @click="getOrderPerDetails(row.item)"
                    title="Detalles"
                  >
                    <b-icon icon="eye"></b-icon>
                  </b-button>
                  <b-button
                    size="sm"
                    variant="orange-primary"
                    class="mr-1"
                    v-b-tooltip.hover.top.noninteractive
                    :disabled="
                      row.item.orderDeliveryStep ===
                      StepOrderStatus.PENDIENTE_DE_REPARTIDOR
                    "
                    @click="handleChangeStep(row.item)"
                    title="Cambiar estado"
                  >
                    <b-icon icon="arrow-down-up"></b-icon>
                  </b-button>
                </template>
              </b-table>
            </section>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SellerOrderListViewModel from "../viewmodels/SellerOrderListViewModel";
export default defineComponent({
  name: "SellerOrderList",
  components: {
    EmptyListBanner: () => import("@/views/components/EmptyListBanner.vue"),
  },
  mixins: [SellerOrderListViewModel],
});
</script>
