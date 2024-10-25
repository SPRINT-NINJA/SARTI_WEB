<template>
    <b-navbar toggleable type="dark" variant="dark">
      <!-- Brand a la izquierda -->
      <b-navbar-brand href="#">
        <img alt="Vue logo" class="logo"  src="@/assets/SARTI-LOGO.svg" width="40" height="50" />
      </b-navbar-brand>
      
      <!-- Icono de carrito a la derecha -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">
          <b-icon icon="cart"></b-icon>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </template>
  
  <script lang="ts">
  export default {
    name: 'Navbar',
  }
  </script>