<template>
  <div>
    <custom-overlay :isLoading="isLoading" />
    <div class="d-flex align-items-center justify-content-center">
      <b-card class="background-card-other my-3">
        <b-row class="mx-2">
          <b-icon
            class="my-2 mx-2"
            icon="box-seam"
            variant="red-palete"
            scale="1.8"
          ></b-icon>
          <h3 class="title">Pedido</h3>
        </b-row>

        {{ address }}

        <b-row>
          <b-col cols="12" md="8">
            <section>
              <h5>Dirección</h5>
              <b-row>
                <b-col cols="12" md="4">
                  <b-form-group label-for="input-1">
                    <label> Ciudad <span style="color: red">*</span> </label>
                    <b-form-input
                      id="input-1"
                      type="text"
                      v-model="v$.address.city.$model"
                      :state="
                        v$.address.city.$dirty ? !v$.address.city.$error : null
                      "
                      @blur="v$.address.city.$touch()"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.address.city.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group label-for="input-1">
                    <label> Colonia <span style="color: red">*</span> </label>
                    <b-form-input
                      type="text"
                      v-model="v$.address.colony.$model"
                      :state="
                        v$.address.colony.$dirty
                          ? !v$.address.colony.$error
                          : null
                      "
                      @blur="v$.address.colony.$touch()"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.address.colony.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group label-for="input-1">
                    <label> Calle <span style="color: red">*</span> </label>
                    <b-form-input
                      type="text"
                      v-model="v$.address.street.$model"
                      :state="
                        v$.address.street.$dirty
                          ? !v$.address.street.$error
                          : null
                      "
                      @blur="v$.address.street.$touch()"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.address.street.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group label-for="input-1">
                    <label> Estado <span style="color: red">*</span> </label>
                    <b-form-input
                      type="text"
                      v-model="v$.address.state.$model"
                      :state="
                        v$.address.state.$dirty
                          ? !v$.address.state.$error
                          : null
                      "
                      @blur="v$.address.state.$touch()"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.address.state.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group label-for="input-1">
                    <label> Ciudad <span style="color: red">*</span> </label>
                    <b-form-input
                      type="text"
                      v-model="v$.address.country.$model"
                      :state="
                        v$.address.country.$dirty
                          ? !v$.address.country.$error
                          : null
                      "
                      @blur="v$.address.country.$touch()"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.address.country.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group label-for="input-1">
                    <label> Localidad <span style="color: red">*</span> </label>
                    <b-form-input
                      type="text"
                      v-model="v$.address.locality.$model"
                      :state="
                        v$.address.locality.$dirty
                          ? !v$.address.locality.$error
                          : null
                      "
                      @blur="v$.address.locality.$touch()"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.address.locality.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="4">
                  <b-form-group label-for="input-1">
                    <label>
                      N.Exterior <span style="color: red">*</span>
                    </label>
                    <b-form-input
                      type="number"
                      v-model="v$.address.externalNumber.$model"
                      :state="
                        v$.address.externalNumber.$dirty
                          ? !v$.address.externalNumber.$error
                          : null
                      "
                      @blur="v$.address.externalNumber.$touch()"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.address.externalNumber.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group label-for="input-1">
                    <label> N.Interior </label>
                    <b-form-input
                      type="text"
                      v-model="v$.address.internalNumber.$model"
                      :state="
                        v$.address.internalNumber.$dirty
                          ? !v$.address.internalNumber.$error
                          : null
                      "
                      @blur="v$.address.internalNumber.$touch()"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.address.internalNumber.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group label-for="input-1">
                    <label>
                      Código postal <span style="color: red">*</span>
                    </label>
                    <b-form-input
                      type="text"
                      v-model="v$.address.zipCode.$model"
                      :state="
                        v$.address.zipCode.$dirty
                          ? !v$.address.zipCode.$error
                          : null
                      "
                      @blur="v$.address.zipCode.$touch()"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.address.zipCode.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group>
                    <label>
                      Tipo de Residencia <span style="color: red">*</span>
                    </label>
                    <b-form-select
                      :options="options"
                      v-model="v$.address.addressType.$model"
                      :state="
                        v$.address.addressType.$dirty
                          ? !v$.address.addressType.$error
                          : null
                      "
                      @blur="v$.address.addressType.$touch()"
                    ></b-form-select>
                    <b-form-invalid-feedback
                      v-for="error in v$.address.addressType.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="6">
                  <b-form-group label-for="input-1">
                    <label>
                      Referencia <span style="color: red">*</span>
                    </label>
                    <b-form-textarea
                      type="text"
                      v-model="v$.address.referenceNear.$model"
                      :state="
                        v$.address.referenceNear.$dirty
                          ? !v$.address.referenceNear.$error
                          : null
                      "
                    >
                    </b-form-textarea>
                    <b-form-invalid-feedback
                      v-for="error in v$.address.referenceNear.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
            </section>
          </b-col>
          <b-col cols="12" md="4">
            <b-card>
              <b-icon icon="box-seam" class="mx-2"></b-icon>
              <b>Forma de Entrega</b>
              <b-form-checkbox
                button-variant="orange-primary"
                name="check-button"
                v-model="isTakenInShop"
                @change="setIsTakenInShop"
                switch
              >
                Recolección
              </b-form-checkbox>
              <b-form-checkbox
                button-variant="orange-primary"
                name="check-button"
                v-model="isDelivered"
                @change="setIsDelivered"
                switch
              >
                Envío domicilio
              </b-form-checkbox>
            </b-card>
            <b-card class="my-2">
              <b-icon class="mx-2" icon="pin-map"></b-icon>
              <b>Dirección de Entrega</b>
              <br />
              <p>
                <b>{{
                  isTakenInShop ? "Retirar en Tienda" : "Dirección de Entrega"
                }}</b>
                <br />
                {{ formattedAddress }}
              </p>
            </b-card>
            <b-alert show variant="warning" class="mt-2">
              <b-icon class="mx-2" icon="exclamation-triangle"></b-icon>
              <b>Advertencia</b> <br />
              Si eliges la opción de recolección,
              <b class="title">
                recuerda que deberás venir personalmente a nuestra tienda para
                recoger tu producto.
              </b>
              Si prefieres que te lo enviemos a domicilio,
              <b class="title">
                te informamos que el costo de envío es de $30.00 pesos
              </b>
              . Por favor, asegúrate de seleccionar la opción que mejor se
              ajuste a tus necesidades antes de completar tu compra.
            </b-alert>
          </b-col>
          <b-col cols="12" md="8">
            <section>
              <h5>Productos</h5>
              <b-row
                class="d-flex align-items-center justify-content-center scrollable-container"
              >
                <b-card
                  v-for="product in cartBody.cartProducts"
                  :key="product.id"
                  class="card-preview-product my-2"
                  :class="{ 'disabled-card': !product.status }"
                >
                  <b-row>
                    <b-col cols="12" md="2">
                      <img
                        class="img-main-product"
                        :src="product.product.mainImage"
                      />
                    </b-col>
                    <b-col cols="12" md="9" class="my-2">
                      <b-row>
                        <b-col cols="12" md="10" class="my-1">
                          <b>{{ product.product.name }}</b>
                        </b-col>
                        <b-col
                          cols="12"
                          md="2"
                          class="d-flex justify-content-end align-items-center my-2"
                        >
                          <b-badge
                            :variant="product.status ? 'success' : 'danger'"
                          >
                            {{
                              product.status ? "Disponible" : "No disponible"
                            }}
                          </b-badge>
                        </b-col>
                      </b-row>
                      <b-row class="w-100">
                        <b-col
                          cols="12"
                          lg="5"
                          class="d-flex align-items-center"
                        >
                          <span>Cantidad: {{ product.amount }}</span>
                        </b-col>
                        <b-col
                          cols="12"
                          lg="7"
                          class="d-flex align-items-center"
                        >
                          <span
                            >Precio Unitario: ${{ product.product.price }}</span
                          >
                        </b-col>
                      </b-row>
                      <b-row
                        class="d-flex justify-content-end align-items-center"
                      >
                        <b-col cols="12" md="3" class="text-right">
                          <b-card-text class="text-price">
                            <b> Total: ${{ product.total }}</b>
                          </b-card-text>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-card>
              </b-row>

              <b-row class="summary-container">
                <hr />
                <b-row
                  class="d-flex justify-content-between align-items-center w-100 mt-2"
                >
                  <b-col cols="auto" class="text-left text-by-price">
                    <p>Productos</p>
                    <p>Costo de Envío</p>
                    <p>Total</p>
                  </b-col>
                  <b-col cols="auto" class="text-right text-by-price">
                    <p>${{ total }}</p>
                    <p>${{ totalFee }}</p>
                    <p>
                      <b>${{ totalFinal }}</b>
                    </p>
                  </b-col>
                </b-row>
              </b-row>
            </section>
          </b-col>
        </b-row>

        <!-- Contenedor del botón de PayPal -->
        <div class="mt-4" id="paypal-button-container"></div>

        <!-- Botones de acciones -->
        <div class="d-flex justify-content-end align-items-center w-100 mt-4">
          <b-button class="mx-2" variant="orange-primary" @click="goBack">
            Regresar al carrito
          </b-button>
          <b-button variant="orange-secundary" @click="procedToPayment">
            Proceder con la compra
          </b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import CustomerBuyOrderViewModel from "../viewmodels/CustomerBuyOrderViewModel";
export default {
  name: "CustomerOrderBuy",
  mixins: [CustomerBuyOrderViewModel],
  components: {
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
  },
};
</script>

<style scoped>
.background-card-other {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  width: 95%;
}
.title {
  color: var(--red-palete);
}
.scrollable-container {
  max-height: 500px;
  overflow-y: auto;
  width: 100%;
}
.summary-container {
  margin: 0 auto;
  width: 100%;
}
.d-flex {
  display: flex;
}
.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.text-by-price {
  font-size: smaller;
}
.background-card-other {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  width: 95%;
}
.background-card {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}
.title {
  color: var(--red-palete);
}
.card-preview-product {
  width: 95%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border: none;
}
.img-main-product {
  display: flex;
  align-items: baseline;
  justify-content: right;
  width: 90px;
  height: 90px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  transition: transform 0.3s ease;
  /* Agrega una transición suave para el efecto de zoom */
  object-fit: cover;
}
.border {
  border: solid;
}

.text-price {
  font-size: medium;
  font-style: italic;
}
hr {
  width: 100%;
  height: 0.3px;
  background-color: rgb(0, 0, 0);
}

.total {
  width: 100%;
  align-items: center;
  justify-content: center;
}

.scrollable-container {
  max-height: 500px;
  overflow-y: auto;
  width: 100%;
}
.disabled-card {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
