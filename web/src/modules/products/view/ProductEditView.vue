<template>
  <div class="">
    <custom-overlay :isLoading="isLoading" />
    <b-container>
      <section>
        <b-row>
          <b-col cols="12" md="7">
            <OptionsUploadImage
              :image="productImages"
              @update:image="productImages = $event"
              v-show="!timeCharging"
              :progress-value="progress1"
              @charge-image-upload="timeCharging = $event"
              :limitImages="4"
            />
            <b-card v-show="timeCharging" class="my-3 text-center">
              <h4>Imagen cargada correctamente</h4>
              <b-row>
                <b-col
                  cols="12"
                  md="3"
                  v-for="(item, index) in productImages"
                  :key="index"
                >
                  <img
                    :src="item.url"
                    class="photo"
                    height="100"
                    :alt="item.name"
                  />
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col cols="12" md="5">
            <b-card class="my-3">
              <b-card-title class="text-center">Stock</b-card-title>
              <b-card-body class="text-center">
                <b-row>
                  <b-col cols="12" md="4" class="text-center">
                    <b-button
                      variant="danger"
                      @click="decreaseStock"
                      :disabled="product.stock <= 1"
                    >
                      -
                    </b-button>
                  </b-col>
                  <b-col
                    cols="4"
                    class="d-flex justify-content-center align-items-center w-100"
                  >
                    <!-- Contenedor para centrar el input -->
                    <b-form-input
                      id="input-stock"
                      v-model="v$.product.stock.$model"
                      min="1"
                      class="text-center h4 font-weight-bold w-100"
                      style="
                        width: 60px;
                        border: none;
                        outline: none;
                        background-color: transparent;
                        pointer-events: auto;
                      "
                      :state="
                        v$.product.stock.$dirty
                          ? !v$.product.stock.$error
                          : null
                      "
                      @blur="v$.product.stock.$touch()"
                      @input="validateStock"
                    />
                  </b-col>
                  <b-col cols="12" md="4" class="text-center">
                    <b-button variant="success" @click="increaseStock">
                      +
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
            <section>
              <b-row>
                <!-- Asegúrate de usar 'image' correctamente dentro de 'v-for' -->
                <b-col
                  v-for="(url, index) in product.productImages"
                  :key="index"
                >
                  <img :src="url.image" alt="Product image" class="photo" />
                </b-col>
              </b-row>
            </section>
          </b-col>
        </b-row>
      </section>
      <section>
        <b-card>
          <b-form>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group
                  id="input-group-1"
                  label="Nombre:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    v-model="v$.product.name.$model"
                    required
                    :state="
                      v$.product.name.$dirty ? !v$.product.name.$error : null
                    "
                    @blur="v$.product.name.$touch()"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in v$.product.name.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group
                  id="input-group-2"
                  label="Precio:"
                  label-for="input-2"
                >
                  <b-input-group prepend="$" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-form-input
                      id="input-2"
                      v-model="v$.product.price.$model"
                      required
                      :state="
                        v$.product.price.$dirty
                          ? !v$.product.price.$error
                          : null
                      "
                      @blur="v$.product.price.$touch()"
                      @keydown="enterOnlyDecimalNumbers"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in v$.product.price.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="12">
                <b-form-group
                  id="input-group-2"
                  label="Descripción:"
                  label-for="input-2"
                >
                  <b-form-textarea
                    id="input-2"
                    type="number"
                    v-model="v$.product.description.$model"
                    required
                    :state="
                      v$.product.description.$dirty
                        ? !v$.product.description.$error
                        : null
                    "
                    @blur="v$.product.description.$touch()"
                  ></b-form-textarea>
                  <b-form-invalid-feedback
                    v-for="error in v$.product.description.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="12" lg="12">
                <div class="d-flex justify-content-end mt-auto">
                  <b-button
                    variant="red-palete"
                    @click="updateProduct"
                    :disabled="v$.$invalid || productImages.length === 0 || !timeCharging"
                  >
                    Actualizar producto
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </section>
    </b-container>
  </div>
</template>

<script lang="ts">
import OptionsUploadImage from "@/components/OptionsUploadImage.vue";
import ProductUpdateViewModel from "../viewmodel/ProductUpdateViewModel";

export default {
  name: "UpdateProduct",
  components: {
    OptionsUploadImage,
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
  },
  mixins: [ProductUpdateViewModel],
};
</script>

<style scoped>
.photo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  max-width: 100px;
  margin: 0 auto;
}


</style>
