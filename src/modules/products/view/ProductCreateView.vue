<template>
  <div class="">
    <b-container>
      <section>
        <b-row>
          <b-col cols="12" md="7">
            <OptionsUploadImage
              :image="product.images"
              @update:image="product.images = $event"
              v-show="timeCharging === false"
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
                  v-for="(item, index) in product.images"
                  :key="index"
                >
                  <img :src="item" class="photo" height="100" />
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
                      @click="decrement"
                      :disabled="count <= 0"
                    >
                      -
                    </b-button>
                  </b-col>
                  <b-col cols="12" md="4" class="text-center">
                    <h1>{{ count }}</h1>
                  </b-col>
                  <b-col cols="12" md="4" class="text-center">
                    <b-button variant="success" @click="increment">
                      +
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
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
                    v-model="product.name"
                    required
                  ></b-form-input>
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
                      type="number"
                      v-model="product.price"
                      required
                    ></b-form-input>
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
                    v-model="product.description"
                    required
                  ></b-form-textarea>
                </b-form-group>
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
import ProductCreateViewModel from "../viewmodel/ProductCreateViewModel";
export default {
  name: "CreateProduct",
  components: {
    OptionsUploadImage,
  },
  mixins: [ProductCreateViewModel],
};
</script>

<style scoped>
.photo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
}
</style>
