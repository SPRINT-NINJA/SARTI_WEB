<template>
  <div>
    <b-row class="mt-2">
      <b-col
        cols="12"
        v-for="(rate, index) in rateList"
        :key="index"
        class="mt-2 mb-2"
      >
        <b-card class="shadow">
          <b-row>
            <b-col sm="11" md="12">
              <b-row class="align-items-start">
                <b-col cols="auto">
                  <b-avatar
                    :src="rate.avatar"
                    size="5rem"
                    class="mr-3"
                  ></b-avatar>
                </b-col>
                <b-col>
                  <div>
                    <span class="mr-3 rate-list-username">{{
                      rate.username
                    }}</span>
                    <b-form-rating
                      v-model="rate.rate"
                      stars="10"
                      readonly
                      no-border
                      inline
                      no-focus
                      variant="warning"
                      class="m-0 p-0"
                    >
                    </b-form-rating>
                  </div>
                  <div>
                    <p>{{ rate.comment }}</p>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
export default {
  name: "RateCardComponent",
  props: {
    rateList: {
      type: Array as () => Array<any>,
      required: true,
    },
  },
};
</script>
<style scoped>

</style>