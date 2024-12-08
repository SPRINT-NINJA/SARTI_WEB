<template>
  <div class="custom-card-overlay" :style="{ backgroundImage: `url(${imgSrc})` }">
    <div class="gradient-overlay"></div>
    <div class="content-overlay h-100 w-100 d-flex align-items-center px-5 ml-5">
      <div>
        <p class="banner-content-txt">{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BannerOverlay",
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.custom-card-overlay {
  position: relative;
  background-size: cover;
  background-position: center;
  color: white;
  height: 200px; /* Tamaño de la imagen */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.05), transparent);
  z-index: 1; /* Capa encima de la imagen */
}

.content-overlay {
  position: relative;
  z-index: 2; /* Capa encima del degradado */
}
.banner-content-txt{
  color: black;
  font-size: 24px;
  font-weight: bold;
}
</style>
