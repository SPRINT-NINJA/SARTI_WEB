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
      images: [] as Array<{ name: string; url: string; target: any }>, // Eliminamos 'base64'
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
        this.image.forEach((url: any) => {
          this.images.push({
            name: `photo-${Date.now()}.png`, // Nombre único basado en timestamp
            url: url, // Asignar directamente la URL
            target: [],
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
        // Crear un archivo a partir de la imagen capturada
        const blob = this.dataURLtoBlob(this.imageTakePhoto);
        const file = new File([blob], `photo-${Date.now()}.png`, {
          type: "image/png",
        });

        this.images.push({
          name: file.name,
          url: URL.createObjectURL(file),
          target: file, // Asignar el objeto File aquí
        });

        this.showimageTaked = true;

        // Emitir las imágenes actualizadas
        this.$emit(
          "images-uploaded",
          this.images.map((img) => img)
        );

        // Limpiar estados
        this.imageTakePhoto = "";
        this.takePhoto = false;
        this.showimageTaked = false;

        // Ocultar el modal
        this.$bvModal.hide("modal-1");
      }
    },
    dataURLtoBlob(dataURL: string) {
      const arr = dataURL.split(",");
      const mime = arr[0].match(/:(.*?);/)![1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
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
            icon: "error",
            title: "Solo se permiten archivos de imagen",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          continue;
        }

        if (!this.images.some((e) => e.name === file.name)) {
          this.images.push({
            name: file.name,
            url: URL.createObjectURL(file),
            target: file,
          });
          // Emitimos la lista actualizada de URLs
          this.$emit(
            "images-uploaded",
            this.images.map((img) => img)
          );
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
        if (file.type.split("/")[0] !== "image") {
          alert("Solo se permiten archivos de imagen.");
          continue;
        }

        if (!this.images.some((e) => e.name === file.name)) {
          this.images.push({
            name: file.name,
            url: URL.createObjectURL(file),
            target: file, // Asegúrate de que estás asignando el objeto completo aquí
          });

          // Emitimos la lista actualizada de URLs
          this.$emit(
            "images-uploaded",
            this.images.map((img) => img)
          );
        }
      }
    },
    deleteImage(index: number) {
      this.images.splice(index, 1);
      this.$emit(
        "images-uploaded",
        this.images.map((img) => img.url)
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
