<template>
  <b-container class="container-progress">
    <div class="steps">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="['circle', { active: index < currentStep }]"
      >
        <span>{{ index + 1 }}</span>
      </div>
      <div class="progress-bar">
        <span class="indicator" :style="{ width: indicatorWidth }"></span>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import '../assets/progressBar.css';

export default Vue.extend({
  name: "ProgressBar",
  props: {
    steps: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
  },
  computed: {
    currentStep: {
      get(): number {
        return this.value;
      },
      set(newValue: number) {
        this.$emit("input", newValue);
      }
    },
    indicatorWidth(): string {
      const stepCount = (this.steps as unknown as Array<any>).length;
      return `${((this.currentStep - 1) / (stepCount - 1)) * 100}%`;
    }
  },
});
</script>


