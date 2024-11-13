<template>
  <div>
    <b-container class="mt-4 mb-4 vh-100 p-4">
      <div class="mb-4">
        <h2 class="title-view">Reseñas del producto</h2>
      </div>
      <section>
        <rate-card-component :rateList="rates" />
      </section>
    </b-container>
  </div>
</template>
<script lang="ts">
import RatesListViewModel from "../viewmodel/RatesListViewModel";

export default {
  name: "RatesListView",
  components: {
    RateCardComponent: () =>
      import("@/modules/rates/views/RateCardComponent.vue"),
  },
  mixins: [RatesListViewModel],
};
</script>
<style scoped>
.avatar-fixed-aspect {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
}
</style>
