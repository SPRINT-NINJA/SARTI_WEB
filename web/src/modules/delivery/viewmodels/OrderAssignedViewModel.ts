import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import SweetAlertCustom from "@/kernel/SweetAlertCustom";
import OrderDeliveryService from "../services/OrderDeliveryService";
import { GetOrderDeliveriesDto } from "../models/GetOrderDeliveriesDto";
import PouchDB from "pouchdb";

const db = new PouchDB("delivery-orders");
const dbPetitions = new PouchDB("delivery-orders-petitions");
console.log("incialización de pouch", db, "Petitions", dbPetitions);
interface DeliveryDb {
  _id: string;
  orderDeliveriesHistory: Array<any>;
  totalRows: number;
}

export default defineComponent({
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      orderDeliveriesHistory: [] as any,
      takenOrderDelivery: null as any,
      isLoading: false,
      isShowProducts: {} as any,
      pagination: {
        page: 1,
        size: 10,
        sort: "id",
        direction: "DESC",
        searchValue: "",
      },
      totalRows: 0,
    };
  },

  methods: {
    async fetchOrderDeliveriesHistory() {
      try {
        const response = await OrderDeliveryService.getOrderDeliveriesHistory(
          this.pagination as GetOrderDeliveriesDto
        );
        console.log(response);

        this.orderDeliveriesHistory = response.data.content as Array<any>;

        this.orderDeliveriesHistory = this.orderDeliveriesHistory.map(
          (el: any) => ({
            ...el,
            sartiOrder: {
              ...el.sartiOrder,
              orderProducts: el.sartiOrder.orderProducts.map(
                (orderProduct: any) => ({
                  ...orderProduct,
                  productInfo: JSON.parse(orderProduct.productInfo),
                })
              ),
            },
          })
        );

        this.totalRows = response.data.totalElements;

        const existingDb = await db.get("delivery-orders").catch(() => null);
        console.log("existing", existingDb);
        if (existingDb) {
          await db.put({
            _id: "delivery-orders",
            _rev: existingDb._rev,
            orderDeliveriesHistory: response.data.content,
            totalRows: response.data.totalElements,
          });
        } else {
          await db.put({
            _id: "delivery-orders",
            orderDeliveriesHistory: response.data.content,
            totalRows: response.data.totalElements,
          });
        }
      } catch (error) {
        console.error(error);

        if (!navigator.onLine) {
          console.log("No hay conexión a internet.");
          const offlineData = await db
            .get<DeliveryDb>("delivery-orders")
            .catch(() => null);
          if (offlineData) {
            this.orderDeliveriesHistory = offlineData.orderDeliveriesHistory;
            this.totalRows = offlineData.totalRows;
            alert("Mostrando datos offline.");
          }
        } else {
          SweetAlertCustom.errorMessage(
            "Error",
            "Ocurrió un error al obtener los pedidos"
          );
        }
      }
    },

    async fetchTakenOrderDelivery() {
      try {
        const response = await OrderDeliveryService.getTakenOrderDeliveries();
        console.log(response);

        if (!response.data[0]) {
          this.takenOrderDelivery = null;
          return;
        }

        this.takenOrderDelivery = response.data[0];
        this.takenOrderDelivery.sartiOrder = {
          ...this.takenOrderDelivery.sartiOrder,
          orderProducts: this.takenOrderDelivery.sartiOrder.orderProducts.map(
            (orderProduct: any) => ({
              ...orderProduct,
              productInfo: JSON.parse(orderProduct.productInfo),
            })
          ),
        };
      } catch (error) {
        console.error(error);
        SweetAlertCustom.errorMessage(
          "Error",
          "Ocurrió un error al obtener el pedido asignado"
        );
      }
    },

    async initView() {
      this.isLoading = true;
      await this.fetchOrderDeliveriesHistory();
      await this.fetchTakenOrderDelivery();
      this.isLoading = false;
    },

    async handleChangeStep(order: any) {
      try {
        let newStatus = "";
        if (order.orderDeliveryStep === "Pendiente de envío")
          newStatus = "ENVIADO";
        if (order.orderDeliveryStep === "Enviado") newStatus = "ENTREGADO";
        SweetAlertCustom.questionMessage(
          `Cambiar el estado a ${newStatus}`
        ).then(async (result: any) => {
          if (result.isConfirmed) {
            if (navigator.onLine) {
              console.log("online");
              const resp = await OrderDeliveryService.changeOrderDeliveryStep({
                orderId: order.id,
                step: newStatus,
              });
              const { error } = resp;
              if (!error) {
                SweetAlertCustom.successMessage();
                await this.initView();
              }
            } else {
              console.log("offline");
              const payload = {
                orderId: order.id,
                step: newStatus,
              };
              await dbPetitions.put({
                _id: new Date().toISOString(),
                payload,
                controllerFunction: "changeOrderDeliveryStep",
              });
              alert(
                "No hay conexión a internet. La petición se guardara para ser ejecutada después"
              );
            }
          }
        });
      } catch (error) {
        console.log(error);
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
          if (controllerFunction === "changeOrderDeliveryStep") {
            const { payload } = doc.doc as unknown as any;
            const response = await OrderDeliveryService.changeOrderDeliveryStep(
              payload
            );
            const { error } = response;
            if (!error) {
              SweetAlertCustom.successMessage("Peticiones sincronizadas");
              await dbPetitions.remove(doc.doc._id, doc.doc._rev);
            }
          }
        }
        await this.initView();
      } catch (error) {
        console.log("Error al sincronizar peticiones", error);
      }
    },

    async handlePageChange(page: number) {
      this.pagination.page = page;
      await this.fetchOrderDeliveriesHistory();
    },

    async handleResetPage() {
      this.pagination.page = 1;
      await this.fetchOrderDeliveriesHistory();
    },
  },
  mounted() {
    // this.initView();
    window.addEventListener("online", this.syncOfflineRequest);
    this.syncOfflineRequest();
  },
  beforeDestroy() {
    // Elimina el evento al destruir el componente
    window.removeEventListener("online", this.syncOfflineRequest);
  },
  watch: {
    online() {
      this.syncOfflineRequest();
    },
  },
});
