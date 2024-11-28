<template>
  <div class="">
    <div class="navigation">
      <ul>
        <li>
          <a href="#">
            <span class="icon">
              <img src="../assets/SARTI-LOGO.svg" alt="SARTI" />
            </span>
            <span class="title">SARTI</span>
          </a>
        </li>
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ hovered: hoveredIndex === index }"
          @mouseover="hoveredIndex = index"
        >
          <a :href="item.link">
            <span class="icon">
              <b-icon font-scale="1" :icon="item.icon"></b-icon>
            </span>
            <span class="title">{{ item.title }}</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="main">
      <div class="topbar">
        <div class="toggle" @click="toggleMenu">
          <b-icon icon="justify"></b-icon>
        </div>
        <div class="search">
          <label>
            <b-input type="text" placeholder="Buscar productos..." />
          </label>
        </div>

        <div class="user color-cart n">
          <a href="/customer/cart">
            <b-icon font-scale="2" icon="cart4"></b-icon>
          </a>
        </div>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {jwtDecode} from 'jwt-decode';

export default defineComponent({
  name: "PublicView",
  setup() {
    // Reactive references
    const hoveredIndex = ref<number | null>(null);
    const isActive = ref(false);


    // Definir menús
    const menuItemsSeller = [
      { title: "Mi perfil", icon: "person", link: "/seller/profile-seller" },
      { title: "Mis Productos", icon: "inboxes", link: "/seller/" },
      { title: "Mis Pedidos", icon: "box-seam", link: "/seller/" },
      { title: "Cerrar sesión", icon: "box-arrow-in-left", link: "/login" },
    ];

    const menuItemsCustomer = [
      { title: "Mi perfil", icon: "person", link: "/customer/profile" },
      {
        title: "Mis Compras",
        icon: "bag",
        link: "/customer/order-list-customer",
      },
      { title: "Mejores calificados", icon: "star", link: "/sarti/top-rated" },
      { title: "Emprendedores", icon: "shop", link: "/sarti/seller-list" },
      { title: "Cerrar sesión", icon: "box-arrow-in-left", link: "/login" },
    ];

    const menuItemsDelivery = [
      {
        title: "Mi perfil",
        icon: "person",
        link: "/delivery/profile-delivery",
      },
      {
        title: "En Recolección",
        icon: "geo-fill",
        link: "/delivery/order-list-delivery",
      },
      {
        title: "Mis Pedidos",
        icon: "mailbox",
        link: "/delivery/order-assigned",
      },
      { title: "Cerrar sesión", icon: "box-arrow-in-left", link: "/login" },
    ];

    const menuItemsWithoutAccount = [
      {
        title: "Crear tu cuenta",
        icon: "file-earmark-person",
        link: "/create-account",
      },
      { title: "Iniciar Sesión", icon: "box-arrow-in-right", link: "/login" },
    ];

    // Menú dinámico inicial
    const menuItems = ref([
      { title: "Inicio", icon: "house", link: "/sarti/home-page" },
      ...menuItemsWithoutAccount,
    ]);

    // Actualizar menú según el rol
    const updateMenu = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          const role = decoded?.role?.[0]?.authority;

          if (role === "SELLER") {
            menuItems.value = menuItemsSeller;
          } else if (role === "CUSTOMER") {
            menuItems.value = menuItemsCustomer;
          } else if (role === "DELIVERYMAN") {
            menuItems.value = menuItemsDelivery;
          } else {
            menuItems.value = [
              { title: "Inicio", icon: "house", link: "/sarti/home-page" },
              ...menuItemsWithoutAccount,
            ];
          }
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          menuItems.value = [
            { title: "Inicio", icon: "house", link: "/sarti/home-page" },
            ...menuItemsWithoutAccount,
          ];
        }
      } else {
        menuItems.value = [
          { title: "Inicio", icon: "house", link: "/sarti/home-page" },
          ...menuItemsWithoutAccount,
        ];
      }
    };

    // Llamar a `updateMenu` al cargar la aplicación
    updateMenu();

    const toggleMenu = () => {
      isActive.value = !isActive.value;
      const navigation = document.querySelector(".navigation") as HTMLElement;
      const main = document.querySelector(".main") as HTMLElement;

      if (navigation && main) {
        navigation.classList.toggle("active", isActive.value);
        main.classList.toggle("active", isActive.value);
        console.log("Menu toggled", isActive.value); // Para verificar si el método se ejecuta
      }
    };

    return {
      hoveredIndex,
      menuItems,
      toggleMenu,
    };
  },
});
</script>
