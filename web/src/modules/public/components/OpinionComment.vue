<template>
  <div>
    <div v-if="allImages">
      <gallery-comments
        :images="allImages"
        galleryID="my-test-gallery"
      ></gallery-comments>
    </div>
    <div v-for="(comment, index) in comments" :key="index">
      <div class="h5 d-flex align-items-center">
        <b-icon icon="person"></b-icon>
        <span class="ml-2">{{ comment.username }}</span>
      </div>
      <div>
        <b-row>
          <b-col cols="6" md="6">
            <b-form-rating
              v-model="comment.rating"
              stars="10"
              readonly
              no-border
              no-focus
              variant="warning"
              size="sm"
              class="m-0 p-0"
            >
            </b-form-rating>
          </b-col>
        </b-row>
      </div>
      <div>
        <p>
          {{ comment.comment }}
        </p>
      </div>
      <div v-if="comment.images">
        <gallery-comments
          :images="comment.images"
          galleryID="my-test-gallery"
        ></gallery-comments>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
export default defineComponent( {
  name: "OpinionComment",
  props: {
    images: Array,
    comments: {
      type: Array as () => Array<{ username: string; rating: number; comment: string; images?: Array<string> }>,
      required: true,
    },
  },
  components: {
    GalleryComments: defineAsyncComponent(() =>
      import("../components/GalleryComments.vue")
    ),
  },
  data() {
    return {
      allImages: [] as any[],
    };
  },
  methods: {
    mapImages() {
      this.allImages = this.comments.flatMap((comment) => comment.images);
    },
  },
  mounted() {
    this.mapImages();
    console.log(this.comments);
  },
});
</script>
