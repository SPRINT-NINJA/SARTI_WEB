<template>
    <div :id="galleryID" class="gallery-container">
      <div class="thumbnails">
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
  
  <script>
  import PhotoSwipeLightbox from "photoswipe/lightbox";
  import "photoswipe/style.css";
  
  export default {
    name: "GalleryCommnets",
    props: {
      galleryID: String,
      images: Array,
    },
    setup(props) {
      return {
        imagesData: props.images,
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
    methods: {},
  };
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
    max-width: 80px; /* Tamaño máximo de las miniaturas */
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 8px;
    transition: border-color 0.2s ease;
  }
  
  .thumbnail img:hover {
    border-color: #ffcc00;
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
  