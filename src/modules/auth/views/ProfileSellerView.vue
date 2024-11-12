<template>
  <div class="w-100">
    <b-container fluid class="mt-4 mb-4">
      <div class="">
        <div class="banner-container">
          <banner-overlay
            :imgSrc="require('../../../assets/banner-pedido.svg')"
            :content="''"
          />
          <b-avatar
            class="avatar-overlay"
            src="https://png.pngtree.com/png-clipart/20240709/original/pngtree-casual-man-flat-design-avatar-profile-picture-vector-png-image_15526568.png"
            size="9rem"
          >
          </b-avatar>
        </div>
        <b-row class="my-5 mx-5">
          <b-col cols="12" md="8">
            <section>
              <h1>Juan Carlos Bodoque</h1>
              <h5>juan123@gmail.com</h5>
            </section>
            <section>
              <b-card class="my-4">
                <b-card-title> Información de Tienda</b-card-title>
                <hr />
                <h2 class="text-center">
                  Las palomitas
                  <b-icon icon="check2-circle" variant="success"></b-icon>
                </h2>
                <b-card-content>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries.                 
                  </p>
                </b-card-content>
              </b-card>
            </section>
            <section>
              <b-card class="my-4">
                <b-card-title> Dirección</b-card-title>
                <hr />
                <b-card-content>
                  <p>
                    Ciudad,México,Colonia, Benito Juarez,Estado de Morelos,
                    Calle 5 de mayo, Localidad Emiliano Zapata, Tipo de
                    residencia Local, N.Ext 4, N.Int N/A, Código postal 62765,
                    Casa topa con calle a la secunadria la amate del puerto
                    escondido
                  </p>
                </b-card-content>
              </b-card>
            </section>
          </b-col>
          <b-col cols="12" md="4">
            <b-row>
              <b-col>
                <b-card class="text-center my-2">
                  <b-card-title> Productos </b-card-title>
                  <b-icon
                    class="my-3"
                    icon="shop-window"
                    variant="red-palete"
                    scale="3"
                  ></b-icon>
                  <b-card-content>
                    <div
                      class="d-flex justify-content-center align-items-center my-2"
                    >
                      <b-button variant="orange-primary"> Visualizar </b-button>
                    </div>
                  </b-card-content>
                </b-card>
              </b-col>
              <b-col>
                <b-card class="text-center my-2">
                  <b-card-title> Pedidos </b-card-title>
                  <b-icon
                    class="my-3"
                    icon="box-seam"
                    variant="red-palete"
                    scale="3"
                  ></b-icon>
                  <b-card-content>
                    <div
                      class="d-flex justify-content-center align-items-center my-2"
                    >
                      <b-button variant="orange-primary"> Visualizar </b-button>
                    </div>
                  </b-card-content>
                </b-card>
              </b-col>
            </b-row>

            <b-card>
              <b-card-content>
                <div
                  class="d-flex justify-content-center align-items-center my-2"
                >
                  <b-button
                    class="mx-2 w-100"
                    size="md"
                    variant="orange-primary"
                  >
                    <b-icon icon="person-lines-fill"></b-icon>
                    Editar Perfil
                  </b-button>
                </div>
              </b-card-content>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import BannerComponent from "../../public/components/BannerComponent.vue";
import BannerOverlay from "../../public/components/BannerOverlay.vue";
export default {
  name: "Profile seller",
  components: {
    BannerComponent: BannerComponent,
    BannerOverlay: BannerOverlay,
  },
};
</script>

<style scoped>
.banner-container {
  position: relative;
}

.avatar-overlay {
  position: absolute;
  top: 110px; /* Ajusta según lo necesario */
  left: 60px; /* Ajusta según lo necesario */
  z-index: 1; /* Asegura que el avatar esté por encima del banner */
}
</style>
