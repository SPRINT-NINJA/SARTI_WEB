<template>
  <div class="card">
    <div class="top">
      <p>Arrastra y suelta imágenes o toma fotografías</p>
    </div>
    <div
      class="drag-area"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <span class="text-center">
        <b-icon icon="image" scale="2"></b-icon> <br />
        Arrastra y suelta imágenes aquí o
        <span class="select" role="button" @click="selectFiles"
          >Seleccionar</span
        >
        o
        <span class="select" role="button" v-b-modal.modal-1
          >Tomar fotografía
          <b-icon icon="camera"></b-icon>
        </span>
      </span>
      <input
        name="file"
        type="file"
        class="file-input"
        ref="fileInput"
        multiple
        accept="image/*"
        @change="onFileSelect"
      />
    </div>
    <div class="container">
      <div class="image my-2" v-for="(image, index) in images" :key="index">
        <span class="delete" @click="deleteImage(index)">&times;</span>
        <img :src="image.url" />
      </div>
    </div>
    <button type="button" @click="$emit('showLoading')">Subir imagen</button>

    <!-- CAMARA -->
    <b-modal id="modal-1" title="Tomar Foto" hide-footer>
      <b-alert class="nunito-font" show variant="warning">
        <b>ADVERTENCIA</b> Por favor habilita el permiso sobre el uso de la
        camara y así permitir tomar las fotografías
      </b-alert>
      <Camera
        v-show="takePhoto === false && showimageTaked == false"
        v-on:takePicture="takePicture"
      />
      <div class="text-center">
        <Captured v-show="takePhoto && showimageTaked == false" />
        <b-row>
          <b-col>
            <b-button
              variant="red-palete"
              v-show="takePhoto && showimageTaked == false"
              @click="takePicture()"
              class="my-2"
            >
              <b>Volver a tomar </b>
            </b-button>
          </b-col>
          <b-col>
            <b-button
              variant="orange-secundary"
              v-show="takePhoto && showimageTaked == false"
              class="my-2 mx-2"
              @click="pushImagesByCamera"
            >
              <b>Agregar foto </b>
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Camera from "@/components/Camera.vue";
import Captured from "@/components/Captured.vue";

export default defineComponent({
  name: "DropZone",
  props: {
    image: {
      type: Array,
      default: [],
    },
  },
  components: {
    Camera,
    Captured,
  },
  data() {
    return {
      images: [] as Array<{ name: string; url: string; base64: string }>, // Asegúrate de usar 'Array<...>'
      isDragging: false,
      takePhoto: false,
      showimageTaked: false,
      imageTakePhoto: "",
      imagesPreview: this.image,
    };
  },
  mounted() {
    this.updateImagesUpload();
  },
  methods: {
    updateImagesUpload() {
      if (this.image && Array.isArray(this.image)) {
        // Iterar sobre cada URL en el array this.image
        this.image.forEach((url: string) => {
          this.images.push({
            name: `photo-${Date.now()}.png`, // Nombre único basado en timestamp
            url: url, // Asignar directamente la URL
            base64: "", // Si no hay Base64, puede quedar vacío
          });
        });

        // Emitir evento con las imágenes actualizadas
        this.$emit(
          "images-uploaded",
          this.images.map((img) => img.url) // Emitir solo las URLs
        );

        // Limpiar estados
        this.imageTakePhoto = "";
        this.takePhoto = false;
        this.showimageTaked = false;

        // Ocultar el modal
        this.$bvModal.hide("modal-1");
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
          // Convertir el contenido del canvas en una URL de base64
          const imageDataUrl = picture.toDataURL("image/png");
          this.imageTakePhoto = imageDataUrl;
        }
        this.takePhoto = !this.takePhoto;
      } else {
        console.warn("Canvas or video element not found.");
      }
    },
    pushImagesByCamera() {
      if (this.imageTakePhoto) {
        const imageName = `photo-${Date.now()}.png`;
        this.images.push({
          name: imageName,
          url: this.imageTakePhoto,
          base64: this.imageTakePhoto,
        });
        this.showimageTaked = true;

        // Emitir las imágenes actualizadas
        this.$emit(
          "images-uploaded",
          this.images.map((img) => img.base64)
        );

        // Limpiar estados
        this.imageTakePhoto = "";
        this.takePhoto = false;
        this.showimageTaked = false;

        // Ocultar el modal
        this.$bvModal.hide("modal-1");
      }
    },

    selectFiles() {
      (this.$refs.fileInput as HTMLInputElement).click();
    },
    onFileSelect(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files) return;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.split("/")[0] !== "image") {
          this.$swal.fire({
            icon: "error", // Cambia el icono a "error" o el que prefieras
            title: "Solo se permiten archivos de imagen",
            toast: true,
            position: "top-end", // Puedes cambiar la posición a "top-start", "bottom-start", "bottom-end", etc.
            showConfirmButton: false,
            timer: 3000, // La duración de la alerta en milisegundos
            timerProgressBar: true,
          });
          continue;
        }

        if (!this.images.some((e) => e.name === file.name)) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target?.result as string;
            this.images.push({
              name: file.name,
              url: URL.createObjectURL(file), // Para previsualización
              base64, // Imagen en formato Base64
            });
            this.$emit(
              "images-uploaded",
              this.images.map((img) => img.base64)
            ); // Emitir evento con imágenes en Base64
          };
          reader.readAsDataURL(file); // Convertir a Base64
        }
      }
    },
    onDrop(event: DragEvent) {
      event.preventDefault();
      this.isDragging = false;
      const files = event.dataTransfer!.files;
      if (!files) return;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Verificar si el archivo es una imagen
        if (file.type.split("/")[0] !== "image") {
          alert("Solo se permiten archivos de imagen.");
          continue;
        }

        // Evitar agregar imágenes duplicadas
        if (!this.images.some((e) => e.name === file.name)) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target?.result as string;
            this.images.push({
              name: file.name,
              url: URL.createObjectURL(file), // Para previsualización
              base64, // Imagen en formato Base64
            });
            this.$emit(
              "images-uploaded",
              this.images.map((img) => img.base64)
            ); // Emitir evento con imágenes en Base64
          };
          reader.readAsDataURL(file); // Convertir a Base64
        }
      }
    },
    deleteImage(index: number) {
      this.images.splice(index, 1);
      this.$emit(
        "images-uploaded",
        this.images.map((img) => img.base64)
      );
    },
    onDragOver(event: DragEvent) {
      event.preventDefault();
      this.isDragging = true;
      event.dataTransfer!.dropEffect = "copy";
    },
    onDragLeave(event: DragEvent) {
      event.preventDefault();
      this.isDragging = false;
    },
  },
});
</script>

<style scoped>
.tam-take-picture {
  width: 90%;
  height: 300px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  transition: transform 0.3s ease;
}

.card {
  width: 100%;
  padding: 10px;
  box-shadow: 0 0 5px #ffdfdf;
  border-radius: 5px;
  overflow: hidden;
}
.card .top {
  text-align: center;
}
.card p {
  font-weight: bold;
  color: #6f5846;
}
.card button {
  outline: 0;
  border: 0;
  color: #fff;
  border-radius: 4px;
  font-weight: 400;
  padding: 8px 13px;
  width: 100%;
  background: var(--brown-cacao);
}
.card .drag-area {
  height: 150px;
  border-radius: 5px;
  border: 2px dashed #6f5846;
  background: #f3f4f9;
  color: #6f5846;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  margin-top: 10px;
}
.card .select {
  color: #5256ad;
  margin-left: 5px;
  cursor: pointer;
  transition: 0.4s;
}
.card .select:hover {
  opacity: 0.6;
}
.card .container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  max-height: 200px;
  position: relative;
  margin-bottom: 8px;
}
.card .container .image {
  width: 75px;
  margin-right: 5px;
  height: 75px;
  position: relative;
  margin-bottom: 8px;
}
.card .container .image img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.card .container .image span {
  position: absolute;
  top: -2px;
  right: 9px;
  font-size: 20px;
  cursor: pointer;
}
.file-input {
  display: none;
}
.delete {
  z-index: 999;
  color: #fe000f;
}
</style>
