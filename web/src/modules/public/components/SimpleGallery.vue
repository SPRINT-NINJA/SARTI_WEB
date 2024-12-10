<template>
  <div :id="galleryID" class="gallery-container">
    <div
      class="main-image mb-4"
      :class="{ 'full-width': !imagesData || imagesData.length === 0 }"
    >
      <a
        :href="main"
        :data-pswp-width="'1000'"
        :data-pswp-height="'500'"
        target="_blank"
        rel="noreferrer"
        class="thumbnail"
      >
        <img
          :src="main"
          alt=""
        />
      </a>
    </div>
    <div class="thumbnails" v-if="imagesData && imagesData.length > 0">
      <a
        v-for="(image, key) in imagesData"
        :key="key"
        :href="image.largeURL"
        :data-pswp-width="image.width"
        :data-pswp-height="image.height"
        target="_blank"
        rel="noreferrer"
        class="thumbnail"
      >
        <img :src="image.thumbnailURL" alt="" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent  } from "vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default defineComponent({
  name: "SimpleGallery",
  props: {
    galleryID: String,
    images: {
      type: Array as () => Array<{
        largeURL: string;
        thumbnailURL: string;
        width: number;
        height: number;
      }>,
      required: false,
      default: () => [],
    },
    mainImage: String,
  },
  watch: {
    mainImage() {
      this.main = this.mainImage;
      console.log("Entro", this.main)
    },
    images() {
      this.imagesData = this.images;
    },
  },
  data() {
    return {
      lightbox: null as any,
      main: null as any,
      imagesData: [] as any[]
    };
  },
  mounted() {
    if (!this.lightbox) {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: "#" + this.$props.galleryID,
        children: "a",
        pswpModule: () => import("photoswipe"),
      });

      this.lightbox.init();
    }
  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
});
</script>
<style scoped>
.gallery-container {
  display: flex;
  flex-direction: column; /* Mantener disposición en columna */
  align-items: center;
}

.thumbnails {
  display: flex;
  flex-wrap: wrap; /* Permite que las miniaturas se ajusten */
  gap: 10px;
  justify-content: center;
}

.thumbnail img {
  width: 100%; /* Escala automáticamente */
  max-width: 140px; /* Tamaño máximo de las miniaturas */
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: border-color 0.2s ease;
}

.thumbnail img:hover {
  border-color: #ffcc00;
}

.main-image img {
  width: 100%;
  max-width: 900px; /* Escala la imagen principal sin exceder tamaño */
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

@media (max-width: 768px) {
  /* Ajustes para dispositivos móviles */
  .thumbnail img {
    max-width: 80px; /* Escala miniaturas en móviles */
  }
  .main-image img {
    max-width: 100%;
  }
}
</style>
