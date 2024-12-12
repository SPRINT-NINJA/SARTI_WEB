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
        <span class="ml-2">{{ comment.customerName }}</span>
      </div>
      <div>
        <b-row>
          <b-col cols="6" md="6">
            <b-form-rating
              v-model="comment.rate"
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
      <div v-if="comment.image">
        <gallery-comments
          :images="comment.image"
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
    image: Array,
    comments: {
      type: Array as () => Array<{ customerName: string; rate: number; comment: string; image?: Array<string> }>,
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
    filterGallery() {
      if (Array.isArray(this.comments) && this.comments.length > 0) {
        this.allImages = this.comments
          .flatMap((comment) => comment.image || []) // Asegura que la propiedad `image` exista
          .map((img) => ({
            largeURL: img,
            thumbnailURL: img,
            width: 800,
            height: 600,
          }));
      } else {
        this.allImages = []; // Limpia las imágenes si no hay datos válidos
      }
      console.log(this.allImages, "Imágenes filtradas Rate");
    },
  },
  mounted() {
    this.filterGallery();
    console.log(this.comments);
  },
});
</script>
