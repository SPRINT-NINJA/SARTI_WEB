<template>
  <div class="w-100">
    <b-container fluid class="mt-4 mb-4">
      <div class="my-2">
        <div class="banner-container">
          <banner-overlay
            :imgSrc="require('../../../assets/banner-pedido.svg')"
            :content="''"
          />
          <b-avatar
            class="avatar-overlay"
            variant="orange-secundary"
            size="9rem"
          >
          </b-avatar>
        </div>
        <div>
          <div class="my-5 mx-2">
            <section v-show="!profileEdit">
              <h1>
                {{ profile.name }} {{ profile.fistLastName }}
                {{ profile.secondLastName ? profile.secondLastName : "" }}
              </h1>
              <h5>{{ profile.user.email }}</h5>
            </section>
          </div>
          <div
            class="text-center"
            v-if="profile.address === null || profile.address === ''"
          ></div>
          <b-row>
            <b-col cols="12" md="8" v-show="profileEdit">
              <EditCustomerAccount  />
            </b-col>
            <b-col cols="12" md="8" v-show="!profileEdit">
              <section>
                <b-card class="my-3">
                  <b-card-title> Dirección</b-card-title>
                  <hr />
                  <b-card-body v-if="profile.address === null || profile.address === '' ">
                    <section class="text-center">
                      <img
                        src="../../../assets/location.svg"
                        class="img-address"
                      />
                      <h5>¿Deseas agregar tu dirección?</h5>
                      <p>
                        Por favor, proporciónanos tu dirección para completar la
                        compra.Por favor da clic en 
                        <b>Editar perfil</b>
                      </p>
                    </section>
                  </b-card-body>
                  <b-card-body v-else>
                    <p>
                      Ciudad,{{ profile.address.city }}, Colonia,
                      {{ profile.address.colony }},Estado de
                      {{ profile.address.state }}, Calle
                      {{ profile.address.street }}, Localidad
                      {{ profile.address.locality }}, Tipo de residencia
                      {{ profile.address.addressType }}, N.Ext
                      {{ profile.address.externalNumber }}, N.Int
                      {{ profile.address.internalNumber }}, Código postal
                      {{ profile.address.zipCode }},
                      {{ profile.address.referenceNear }}
                    </p>
                  </b-card-body>
                  
                </b-card>
              </section>
            </b-col>
            <b-col cols="12" md="4">
              <EditAccount v-show="profileEdit" :email="profile.user.email" />

              <div
                class="d-flex justify-content-center align-items-center my-3"
              >
                <b-button
                  class="mx-2 w-100"
                  size="md"
                  variant="orange-primary"
                  @click="editProfile()"
                >
                  <b-icon
                    :icon="profileEdit ? 'box-arrow-left' : 'person-lines-fill'"
                  ></b-icon>
                  {{ profileEdit ? "Regresar" : "Editar Perfil" }}
                </b-button>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import ProfileCustomerViewModel from "../viewmodels/ProfileCustomerViewModel";

export default {
  name: "ProfileCustomer",
  components: {
    BannerComponent: () => import("@/modules/public/components/BannerComponent.vue"),
    BannerOverlay: ()=> import("@/modules/public/components/BannerOverlay.vue"),
    EditCustomerAccount: ()=> import("@/modules/auth/views/EditCustomerAccount.vue"),
    EditAccount: ()=> import("@/modules/auth/components/EditAccount.vue")
  },
  mixins: [ProfileCustomerViewModel],
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

.img-address {
  width: 20%;
}
</style>
