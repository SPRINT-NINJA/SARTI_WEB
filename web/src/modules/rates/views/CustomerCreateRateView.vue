<template>
  <div>
    <div class="d-flex align-items-end justify-content-end">
      <b-button
        class="btn-size"
        variant="orange-primary"
        size="sm"
        block
        @click="openForm()"
      >
        Crear reseña
      </b-button>
    </div>
    <b-container>
      <b-row v-if="toggle">
        <b-col cols="12" md="6" lg="6">
          <label for="rating-10">
            <b>Califica el producto</b>
          </label>
          <b-form-rating
            variant="warning"
            id="rating-10"
            stars="10"
            size="lg"
            no-border
            no-focus
            v-model="review.rate"
          ></b-form-rating>
          <b-form-group class="my-2">
            <label>
              <b> Cuéntanos más acerca de tu producto </b>
            </label>
            <b-form-textarea
              id="textarea"
              placeholder="Comenta acerca del producto que compraste"
              rows="8"
              max-rows="8"
              v-model="v$.comment.$model"
                :state="
                  v$.comment.$dirty
                    ? !v$.comment.$error
                    : null
                "
              >
              </b-form-textarea>
              <b-form-invalid-feedback
                v-for="error in v$.comment.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="6">
          <OptionsUploadImage
            :image="evidenceImage"
            @update:image="evidenceImage = $event"
            :progress-value="progressImages"
            v-show="timeChargingImages === false"
            @charge-image-upload="timeChargingImages = $event"
            :limitImages="1"
          />
          <b-card
            v-show="timeChargingImages"
            v-for="image in evidenceImage"
            :key="image.url"
            class="text-center my-3"
          >
            <h4>Imagen cargada correctamente</h4>
            <img :src="image.url" class="img-main-evidence" />
          </b-card>
        </b-col>
      </b-row>
      <div v-if="toggle" class="d-flex align-items-end justify-content-end">
        <b-button
          class="btn-size"
          variant="red-palete"
          size="sm"
          block
          @click="createRate"
          :disabled="v$.$invalid || !review.rate || !evidenceImage.length"
        >
          Registrar reseña
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import OptionsUploadImage from "@/components/OptionsUploadImage.vue";
import CustomerCreateRateViewModel from "../viewmodel/CustomerCreateRateViewModel";

export default {
  name: "CustomerCreateRate",
  components: {
    OptionsUploadImage,
  },
  mixins: [CustomerCreateRateViewModel],
};
</script>

<style scoped>
.img-main-evidence {
  width: 300px; /* Ajusta el tamaño para que entren más imágenes en una fila */
  height: 230px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  object-fit: cover;
}

.btn-size {
  width: 200px;
}
</style>
