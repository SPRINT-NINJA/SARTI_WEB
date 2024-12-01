<template>
  <div class="camera">
    <video ref="videoPlayer" autoplay class="feed"></video>
    <div class="snap-container">
      <b-button
        @click="$emit('takePicture')"
        class="snap-btn"
        variant="red-palete"
      >
        Tomar foto
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Camera",
  data() {
    return {
      stream: null as MediaStream | null, // Definimos el tipo de `stream`
    };
  },
  methods: {
    init() {
      if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream: MediaStream) => {
            this.stream = stream;
            const videoPlayer = this.$refs.videoPlayer as HTMLVideoElement;
            if (videoPlayer) {
              videoPlayer.srcObject = stream;
            }
          })
          .catch((error) => {
            console.error("Error accessing the camera: ", error);
          });
      } else {
        console.warn("Camera not supported by the browser");
      }
    },
    takePicture() {
      this.$emit("takePicture");
      this.stopCamera();  // Apaga la cámara después de tomar la foto
    },
    stopCamera() {
    console.log(this.stream)
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  },
  mounted() {
    this.init();
  },
});
</script>

<style scoped>
.camera {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.feed {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4 / 3; /* Mantiene la relación de aspecto */
  background-color: #171717;
  box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}

.snap-container {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.snap-btn {
  width: 100px;
  height: 40px;
  font-size: 1.1em;
  font-weight: bold;
  text-align: center;
}

/* Media query para pantallas más pequeñas */
@media (max-width: 600px) {
  .feed {
    max-width: 100%;
    aspect-ratio: 1; /* Cambia la relación de aspecto en pantallas pequeñas */
  }

  .snap-btn {
    width: 80px;
    height: 35px;
    font-size: 1em;
  }
}
</style>
