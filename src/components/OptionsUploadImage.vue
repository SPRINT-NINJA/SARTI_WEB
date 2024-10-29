<template>
  <div class="my-2">
    <b-container>
      <b-row>
        <b-col cols="12" md="6" class="text-right">
          <b-button
            variant="brown-cacao"
            @click="showCameraOption"
            :disabled="showUploadImage"
            ><b-icon icon="camera" aria-hidden="true"></b-icon
            >Fotografía</b-button
          >
        </b-col>
        <b-col cols="12" md="6" class="text-left">
          <b-button
            variant="brown-cacao"
            @click="showUploadOption"
            :disabled="showTakePicture"
          >
            <b-icon icon="box-arrow-in-up" aria-hidden="true"></b-icon>Subir
            Foto</b-button
          >
        </b-col>
        <b-col cols="12" md="12">
          <b-card
            v-if="showTakePicture === false && showUploadImage === false"
            class="my-5 text-center"
          >
            <h3 class="text-grey">
              <b-icon icon="arrow-up-circle"></b-icon>
              Escoje una opción
              <b-icon icon="arrow-up-circle"></b-icon>
            </h3>
          </b-card>
        </b-col>
        <b-col cols="12" md="12">
          <b-card v-show="showTakePicture" class="my-2 text-center">
            <Camera
              v-show="takePhoto === false && showimageTaked == false"
              v-on:takePicture="takePicture"
            />
            <Captured v-show="takePhoto && showimageTaked == false" />
            <b-button
              variant="red-palete"
              v-show="takePhoto && showimageTaked == false"
              @click="takePicture()"
              class="my-2"
            >
              <b>Volver a tomar </b>
            </b-button>
            <b-button
              variant="orange-secundary"
              v-show="takePhoto && showimageTaked == false"
              @click="showLoading"
              class="my-2 mx-2"
            >
              <b>Subir foto </b>
            </b-button>
            <b-progress :value="valueProgress" v-if="loading" class="mb-3"></b-progress>
            <img
              :src="imageTakePhoto"
              v-show="showimageTaked"
              class="photo"
              height="200"
            />
          </b-card>
        </b-col>
        <b-col cols="12" md="12">
          <b-card v-show="showUploadImage" class="my-2">
            <DropZone @images-uploaded="updateImagesUpload" />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import StepProgress from "@/components/StepProgress.vue";
import Camera from "@/components/Camera.vue";
import Captured from "@/components/Captured.vue";
import DropZone from "@/components/DropZone.vue";

export default Vue.extend({
  name: "OptionsUploadImage",
  components: {
    StepProgress,
    Camera,
    Captured,
    DropZone,
  },
  props: {
    progressValue: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showUploadImage: false,
      showTakePicture: false,
      takePhoto: false,
      imageTakePhoto: this.image, // Inicializar con el valor pasado por la propiedad image
      loading: false,
      valueProgress: this.progressValue,
      showimageTaked: false,
      imagesUpload: [] as { name: string; url: string }[],// valores de las imagenes cargadas en el dropzone
    };
  },
  watch: {
    // Asegura que cualquier cambio en la prop image se refleje en el valor local
    image(newValue) {
      this.imageTakePhoto = newValue;
    },
  },
  methods: {
    updateImagesUpload(images: { name: string; url: string }[]) {
      this.imagesUpload = images;
      if (images.length > 0) {
        this.imageTakePhoto = images[0].url;
        this.$emit("update:image", this.imageTakePhoto); // Emitir la URL de la primera imagen seleccionada
      }
    },
    takePicture() {
      const ratio = window.innerHeight > window.innerWidth ? 16 / 9 : 9 / 16;
      const picture = document.querySelector(
        "canvas"
      ) as HTMLCanvasElement | null;
      const video = document.querySelector("video") as HTMLVideoElement | null;

      if (picture && video) {
        const ctx = picture.getContext("2d");
        picture.width = window.innerWidth < 400 ? window.innerWidth : 400;
        picture.height = window.innerHeight / ratio;

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(video, 0, 0, picture.width, picture.height);
          console.log(
            ctx.drawImage(video, 0, 0, picture.width, picture.height)
          );
          // Convertir el contenido del canvas en una URL de base64
          const imageDataUrl = picture.toDataURL("image/png");
          this.imageTakePhoto = imageDataUrl;
          this.$emit("update:image", imageDataUrl);
        }
        this.takePhoto = !this.takePhoto;
      } else {
        console.warn("Canvas or video element not found.");
      }
    },
    showLoading() {
      this.loading = !this.loading;
      this.loading = true;

      const interval = 3000 / 100; // 3 segundos dividido entre 100 incrementos
      const timer = setInterval(() => {
        if (this.valueProgress < 100) {
          this.valueProgress += 1;
        } else {
          this.showimageTaked = true;
          clearInterval(timer);
          this.loading = false;
        }
      }, interval);
    },
    showCameraOption() {
      this.showTakePicture = !this.showTakePicture;
      if (this.showUploadImage) {
        this.showUploadImage = false;
      }
    },
    showUploadOption() {
      this.showUploadImage = !this.showUploadImage;
      if (this.showTakePicture) {
        this.showTakePicture = false;
      }
    },
  },
});
</script>

<style scoped>
.text-grey {
  color: #abadaf;
}

.photo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
