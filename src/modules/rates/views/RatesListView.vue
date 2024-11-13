<template>
  <div>
    <b-container fluid class="mt-4 mb-4 vh-100">
      <div class="p-4">
        <h1>Reseñas del producto</h1>
      </div>
      <section>
        <b-card>
          <b-row>
            <b-col sm="11" md="12">
              <b-row class="align-items-start">
                <b-col cols="auto">
                  <b-avatar
                    src="https://i.imgur.com/yTFUilP.jpg"
                    size="6rem"
                    class="mr-3"
                  ></b-avatar>
                </b-col>
                <b-col>
                  <div>
                    aylin Paredes
                    <b-form-rating
                      value="8.8"
                      stars="10"
                      readonly
                      no-border
                      inline
                      no-focus
                      variant="warning"
                      class="ml-3"
                    >
                    </b-form-rating>
                  </div>
                  <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. At voluptate consectetur veritatis vitae. Ea nihil saepe corrupti ipsum optio quae eveniet ab enim, neque at voluptas, culpa, sed doloremque voluptatibus.
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </section>
    </b-container>
  </div>
</template>
<script lang="ts">
import RatesListViewModel from "../viewmodel/RatesListViewModel";

export default {
  name: "RatesListView",
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
