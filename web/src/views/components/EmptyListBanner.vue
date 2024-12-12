<template>
  <div>
    <b-card
      no-body
      class="d-flex flex-column align-items-center justify-content-center h-100 shadow-sm px-4"
    >
      <!-- Imagen decorativa -->
      <img
        :src="image"
        alt="Sin pedidos"
        class="mb-2"
        style="width: 280px; height: auto"
      />
      <!-- Mensaje -->
      <p class="text-center text-muted empty-list-title mb-0">
        <b>{{ title }}</b>
      </p>
      <p class="text-center text-muted">
        <b>{{ subtitle }}</b>
      </p>
    </b-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmptyListBanner",
  props: {
    imageProp: {
      type: String,
      required: true,
    },
    titleProp: {
      type: String,
      required: true,
    },
    subtitleProp: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      image: this.imageProp,
      title: this.titleProp,
      subtitle: this.subtitleProp,
    };
  },
});
</script>

<style>
/* Estilo del título de la sección */
.empty-list-title {
  font-size: 2rem;
  font-weight: bold;
}
</style>