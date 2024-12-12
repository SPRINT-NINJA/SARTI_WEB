<template>
  <div>
    <section>
      <div class="d-flex align-items-center mb-3">
        <div class="rating-score">{{ rating.rating }}</div>
        <div>
          <b-form-rating
            value="8.8"
            stars="10"
            readonly
            no-border
            no-focus
            variant="warning"
          >
          </b-form-rating>
          <span class="total-qualifications ml-3"
            >{{ rating.ratingCount }} calificaciones</span
          >
        </div>
      </div>
    </section>
    <section>
      <b-progress
        v-for="(rate, index) in rating.starsCount"
        :key="index"
        :value="rate.count"
        :max="rating.ratingCount"
        variant="warning"
        class="mb-3"
      ></b-progress>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RatingResume",
  props: {
    rating: {
      type: Object,
      required: true,
    },
  },
});
</script>
