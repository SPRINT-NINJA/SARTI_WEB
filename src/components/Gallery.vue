<template>
  <div class="picture">
    <canvas></canvas>
  </div>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
export default defineComponent( {
  name: 'Gallery',
});
</script>

<style scoped>
.picture {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

canvas {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4 / 3; /* Mantiene una relación de aspecto */
  box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}

/* Ajustes para pantallas pequeñas */
@media (max-width: 600px) {
  canvas {
    max-width: 100%;
    aspect-ratio: 1; /* Cambia la relación de aspecto en pantallas pequeñas */
  }
}
</style>
