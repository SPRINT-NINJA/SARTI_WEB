<template>
  <div class="my-2">
    <b-container>
      <b-row>
        <b-col cols="12" md="12"
         v-if="imageTakePhoto.length != 0"
            class="my-5 text-center"
        >
            <h4 class="text-center text-grey parpadeo-lento" v-if="loading">Cargando
              <b-icon icon="arrow-counterclockwise" animation="spin-reverse" ></b-icon>
            </h4>
            <b-progress
              variant="orange-primary"
              :value="valueProgress"
              v-if="loading"
              class="mb-3"
            ></b-progress>
        </b-col>
        <b-col cols="12" md="12">
          <b-card
            v-show="hide_dropzone === false"
            class="my-2"
          >
            <DropZone
              @images-uploaded="updateImagesUpload"
              v-on:showLoading="showLoading"
              :limitImages="3"
              :checkImages="updateImagesUpload.length"
            />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StepProgress from "@/components/StepProgress.vue";
import Camera from "@/components/Camera.vue";
import Captured from "@/components/Captured.vue";
import DropZone from "@/components/DropZone.vue";

export default defineComponent({
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
      type: Array,
      default: [],
    },
    limitImages:{
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      showUploadImage: false,
      takePhoto: false,
      imageTakePhoto: this.image as any, // Inicializar con el valor pasado por la propiedad image
      loading: false,
      valueProgress: this.progressValue,
      showimageTaked: false,
      hide_dropzone:false,
      temporaryImage: [] as { name: string; url: string }[],
      imagesUpload: [] as { name: string; url: string }[],
      timeCharging:false,
      disabledUpload:false
    };
  },
  watch: {
    // Asegura que cualquier cambio en la prop image se refleje en el valor local
    image(newValue) {
      this.imageTakePhoto = newValue;
      if(newValue === "" ) this.clear();
    },
  },
  methods: {
    clear() {
    this.showUploadImage = false;
    this.takePhoto = false;
    this.imageTakePhoto = this.image; // Inicializar con el valor pasado por la propiedad image
    this.loading = false;
    this.valueProgress = this.progressValue;
    this.showimageTaked = false;
    this.hide_dropzone = false;
    this.temporaryImage = [] as [];
    this.imagesUpload = [] as []; // Valores de las imágenes cargadas en el dropzone
    this.timeCharging = false;
    
  },
  updateImagesUpload(images: []) {
      this.imagesUpload = images;
      if (images.length > 0) {
        this.temporaryImage = images;
     }
    },
    showLoading() {
      if (this.imagesUpload.length > this.limitImages) {
        this.$swal.fire({
          icon: "error",
          title: `Has alcanzado el límite de imágenes permitido. Solo puedes subir un máximo de ${this.limitImages} imágenes.`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
      this.loading = !this.loading;
      this.loading = true;      

      const interval = 3000 / 100; 
      const timer = setInterval(() => {
        if (this.valueProgress < 100) {
          this.valueProgress += 1;
        } else {
          this.showimageTaked = true;
          clearInterval(timer);
          this.loading = false;
          this.timeCharging = true;
        }
        this.$emit("charge-image-upload", this.timeCharging);
        if(this.temporaryImage.length != 0 ){
          this.hide_dropzone = true
          this.imageTakePhoto = this.temporaryImage
          this.$emit("update:image", this.imageTakePhoto);
        }
      }, interval);
    }
  }
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

@keyframes parpadeoLento {
  0%, 100% {
    opacity: 1; /* Totalmente visible */
  }
  50% {
    opacity: 0; /* Invisible */
  }
}

.parpadeo-lento {
  animation: parpadeoLento 1s infinite; /* 2 segundos por ciclo, repite infinitamente */
}

</style>
