<template>
  <div class="">
    <div class="navigation">
      <ul>
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

export default defineComponent({
  name: "PublicView",
  setup() {
    // Reactive references
    const hoveredIndex = ref<number | null>(null);
    const isActive = ref(false);

    const menuItemsSeller = ref([
      { title: "Mi perfil", icon: "person", link: "/seller/profile" },
      { title: "Mis Productos", icon: "inboxes", link: "/seller/" },
      { title: "Mis Pedidos", icon: "box-seam", link: "/seller/" },
    ]);

    const menuItemsCustomer = [
      { title: "Mi perfil", icon: "person", link: "/customer/profile" },
      { title: "Mis Compras", icon: "bag", link: "/customer/order-list" },
      { title: "Mejores calificados", icon: "star", link: "/sarti/top-rated" },
      { title: "Emprendedores", icon: "shop", link: "/sarti/seller-list" },
    ];

    const menuItemsDelivery = [
      { title: "Mi perfil", icon: "person", link: "/delivery/profile" },
      {title: "En Recolección",icon: "geo-fill",link: "/delivery/order-list"},
      { title: "Mis Pedidos", icon: "mailbox", link: "/delivery/order-assigned" },
    ];

    //Menú dinamico
    const menuItems = ref([
      { title: "SARTI ", icon: "bag-fill", link: "/customer/profile" },
      { title: "Inicio", icon: "house", link: "/sarti/home-page" },
      ...menuItemsCustomer,
      { title: "Cerrar sesión", icon: "box-arrow-in-left", link: "/login" },
    ]);

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
