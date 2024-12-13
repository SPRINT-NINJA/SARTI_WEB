<template>
  <div>
    <div class="navigation">
      <ul>
        <li>
          <a href="/sarti/home-page">
            <span class="icon">
              <img src="../assets/sarti-side.png" class="icon-side"  alt="SARTI" />
            </span>
            <span class="title">SARTI</span>
          </a>
        </li>
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ active: activeIndex === index }"
          @click="setActiveIndex(index)"
        >
          <a :href="item.link" @click.prevent="handleMenuClick(item, index)">
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
        

        <!-- Condicional para mostrar el carrito solo para ciertos roles -->
        <div class="user color-cart n" v-if="showSearchAndCart">
          <a :href="userRole ? '/customer/cart':'/login'">
            <b-icon font-scale="2" icon="cart4"></b-icon>
          </a>
        </div>

        <!-- Elementos para EMPRENDEDOR o REPARTIDOR -->
        <div class="role-specific mx-2" v-else>
          <h5 v-if="userRole === 'EMPRENDEDOR' || userRole === 'REPARTIDOR' ">
            <b-icon variant="orange-primary" font-scale="2" icon="person-circle"></b-icon>
            Bienvenido
          </h5>
        </div>
      </div>

      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";

type Role = "EMPRENDEDOR" | "COMPRADOR" | "REPARTIDOR";

export default defineComponent({
  name: "PublicView",
  data() {
    return {
      menuItems: [] as Array<{ title: string; icon: string; link: string }>,
      activeIndex: null as number | null,
      isActive: false,
      userRole: null as Role | null, // Guardar el rol del usuario
    };
  },
  computed: {
    defaultMenuItems() {
      return [
        { title: "Inicio", icon: "house", link: "/sarti/home-page" },
        {
          title: "Crear tu cuenta",
          icon: "file-earmark-person",
          link: "/create-account",
        },
        { title: "Iniciar Sesión", icon: "box-arrow-in-right", link: "/login" },
      ];
    },
    menuRoles() {
      return {
        EMPRENDEDOR: [
          {
            title: "Mi perfil",
            icon: "person",
            link: "/seller/profile-seller",
          },
          {
            title: "Mis Productos",
            icon: "inboxes",
            link: "/seller/product-list",
          },
          { title: "Mis Pedidos", icon: "box-seam", link: "/seller/seller-order-list" },
          { title: "Cerrar sesión", icon: "box-arrow-in-left", link: "/login" },
        ],
        COMPRADOR: [
          {
            title: "Mi perfil",
            icon: "person",
            link: "/customer/profile-customer",
          },
          { title: "Inicio", icon: "house", link: "/sarti/home-page" },
          {
            title: "Mis Compras",
            icon: "bag",
            link: "/customer/order-list-customer",
          },
          {
            title: "Mejores calificados",
            icon: "star",
            link: "/sarti/top-rated",
          },
          { title: "Emprendedores", icon: "shop", link: "/sarti/seller-list" },
          { title: "Cerrar sesión", icon: "box-arrow-in-left", link: "/login" },
        ],
        REPARTIDOR: [
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
        ],
      };
    },
    showSearchAndCart() {
      // Mostrar la barra de búsqueda y el carrito solo para roles específicos
      return this.userRole === "COMPRADOR" || this.userRole === null;
    },
  },
  methods: {
    updateMenu() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          this.userRole = decoded?.role?.[0]?.authority as Role;
          this.menuItems = this.menuRoles[this.userRole] || this.defaultMenuItems;
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          this.userRole = null;
          this.menuItems = this.defaultMenuItems;
        }
      } else {
        this.userRole = null;
        this.menuItems = this.defaultMenuItems;
      }
    },
    toggleMenu() {
      this.isActive = !this.isActive;
      document
        .querySelector(".navigation")
        ?.classList.toggle("active", this.isActive);
      document
        .querySelector(".main")
        ?.classList.toggle("active", this.isActive);
    },
    setActiveIndex(index: number) {
      this.activeIndex = index;
      localStorage.setItem("activeIndex", index.toString());
    },
    handleMenuClick(item: { title: string; link: string }, index: number) {
      if (item.title === "Cerrar sesión") {
        this.logout();
      } else {
        this.setActiveIndex(index);
        if (item.link) {
          window.location.href = item.link;
        }
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("activeIndex");
      location.reload(); 
    },
  },
  mounted() {
    const storedIndex = localStorage.getItem("activeIndex");
    this.activeIndex = storedIndex ? parseInt(storedIndex, 10) : null;
    this.updateMenu();
  },
});
</script>

