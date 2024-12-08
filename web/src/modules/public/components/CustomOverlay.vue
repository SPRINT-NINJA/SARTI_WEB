<template>
  <div>
    <b-overlay
      :show="isLoading"
      rounded="sm"
      class="custom-overlay"
      no-wrap
    >
      <template #overlay>
        <div class="overlay-content">
          <img src="@/assets/loading.gif" alt="Cargando..." />
        </div>
      </template>
      <slot></slot>
    </b-overlay>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CustomOverlay",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
