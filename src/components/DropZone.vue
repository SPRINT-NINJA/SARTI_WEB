<template>
  <div class="card">
    <div class="top">
      <p>Arrastra y suelta imágenes</p>
    </div>
    <div
      class="drag-area"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <span>
        Arrastra y suelta imágenes aquí o
        <span class="select" role="button" @click="selectFiles"
          >Seleccionar</span
        >
      </span>
      <div class="select">Suelta las imágenes aquí</div>
      <input
        name="file"
        type="file"
        class="file-input"
        ref="fileInput"
        multiple
        @change="onFileSelect"
      />
    </div>
    <div class="container">
      <div class="image" v-for="(image, index) in images" :key="index">
        <span class="delete" @click="deleteImage(index)">&times;</span>
        <img :src="image.url" />
      </div>
    </div>
    <button type="button">Subir</button>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      images: [] as { name: string; url: string }[],
      isDragging: false,
    };
  },
  methods: {
    selectFiles() {
      (this.$refs.fileInput as HTMLInputElement).click();
    },
    onFileSelect(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files) return;

      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split("/")[0] !== "image") continue;
        if (!this.images.some((e) => e.name === files[i].name)) {
          this.images.push({
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          });
        }
      }
      this.$emit("images-uploaded", this.images); // Emitir evento con las imágenes
    },
    onDrop(event: DragEvent) {
      event.preventDefault();
      this.isDragging = false;
      const files = event.dataTransfer!.files;
      if (!files) return;

      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split("/")[0] !== "image") continue;
        if (!this.images.some((e) => e.name === files[i].name)) {
          this.images.push({
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          });
        }
      }
      this.$emit("images-uploaded", this.images); // Emitir evento con las imágenes
    },
    deleteImage(index: number) {
      this.images.splice(index, 1);
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
  background: #6f5846;
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
