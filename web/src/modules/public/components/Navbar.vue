<template>
  <b-navbar toggleable type="dark" variant="orange-primary" sticky>
    <!-- Brand a la izquierda -->
    <b-navbar-brand @click="initaliteSidebar" href="/sarti/home-page">
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/SARTI-LOGO.svg"
        width="40"
        height="50"
      />
      SARTI
    </b-navbar-brand>
  </b-navbar>
</template>

<script lang="ts">
export default {
  name: "Navbar",
  methods: {
    initaliteSidebar() {
      localStorage.setItem("activeIndex", "0");
    },
  },
};
</script>
