<template>
  <div class="image-gallery" v-if="images.length > 0">
    <div
      class="image-container"
      v-for="(image, index) in images"
      :key="image.id"
      @click="showImage(index)"
    >
      <img :src="image.thumbnailUrl" alt="Image" />
    </div>
    <div class="full-screen-image" v-if="currentImageIndex !== null">
      <img
        :src="currentImageIndex !== null ? images[currentImageIndex].url : ''"
        alt="Image"
      />

      <button class="prev" @click="prevImage">Previous</button>
      <button class="next" @click="nextImage">Next</button>
      <button @click="closeImage">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "ImageGallery",
  data() {
    return {
      images: [] as { id: number; thumbnailUrl: string; url: string }[],
      currentImageIndex: null as number | null,
    };
  },
  methods: {
    showImage(index: number): void {
      this.currentImageIndex = index;
    },
    closeImage(): void {
      this.currentImageIndex = null;
    },
    prevImage(): void {
      if (this.currentImageIndex !== null && this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },
    nextImage(): void {
      if (
        this.currentImageIndex !== null &&
        this.currentImageIndex < this.images.length - 1
      ) {
        this.currentImageIndex++;
      }
    },
  },
  created() {
    axios
      .get("https://jsonplaceholder.typicode.com/photos?_page=1&_limit=50")
      .then((response) => {
        this.images = response.data;
      });
  },
};
</script>

<style scoped>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-container {
  width: 200px;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.image-container:hover img {
  transform: scale(1.1);
}

.full-screen-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.full-screen-image img {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.full-screen-image button {
  margin: 10px;
}

.prev {
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(-0%, -50%);
}
.next {
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(-0%, -50%);
}
</style>
