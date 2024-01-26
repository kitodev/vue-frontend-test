<template>
  <nav>
    <ul>
      <li>
        <router-link to="/todo">Todo</router-link>
      </li>
      <li>
        <router-link to="/image-gallery">Image Gallery</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "NavBar",
  components: {
    RouterLink,
  },
});
</script>

<style scoped>
nav {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin-bottom: 10px;
}

nav ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

nav li {
  margin: 0 10px;
}

nav a {
  color: #fff;
  text-decoration: none;
}
</style>
