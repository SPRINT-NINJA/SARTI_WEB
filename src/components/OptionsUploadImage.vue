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
          <Camera v-show="takePhoto === false" v-on:takePicture="takePicture" />
          <Gallery v-show="takePhoto" />
          <b-button
            variant="red-palete"
            v-show="takePhoto"
            @click="takePicture"
            class="my-2"
          >
            <b>Volver a tomar </b>
          </b-button>
          <b-button
            variant="orange-secundary"
            v-show="takePhoto"
            @click="() => {}"
            class="my-2 mx-2"
          >
            <b>Subir foto </b>
          </b-button>
          <!-- La imagen a descargar o cargar  -->
          <img src="" />
        </b-card>
        </b-col>
        <b-col cols="12" md="12">
        <b-card v-show="showUploadImage" class="my-2">
          <DropZone />
        </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue, { defineAsyncComponent } from "vue";
import StepProgress from "@/components/StepProgress.vue";
import Camera from "@/components/Camera.vue";
import Gallery from "@/components/Gallery.vue";
import DropZone from "@/components/DropZone.vue";

export default Vue.extend({
  name: "OptionsUploadImage",
  components: {
    StepProgress,
    Camera,
    Gallery,
    DropZone,
  },
  data() {
    return {
      showUploadImage: false,
      showTakePicture: false,
      takePhoto: false,
    };
  },
  methods: {
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
        }
        this.takePhoto = !this.takePhoto;
      } else {
        console.warn("Canvas or video element not found.");
      }
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
</style>
