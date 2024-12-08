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
            :src="profile.facePhoto"   
          >
          </b-avatar>
        </div>
        
        <div>
          <div class="my-5 mx-2">
            <section v-show="!profileEdit">
              <h1>
                {{ profile.name }} {{ profile.firstLastName }}
                {{ profile.secondName ? profile.secondName : "" }}
              </h1>
              <h5>{{ profile.email }}</h5>
            </section>
          </div>
          <b-row>
            <b-col cols="12" md="8" >
            <Transition  name="bounce">
              <EditDeliveryMan v-if="profileEdit" :profile="profile"/>
            </Transition>
            <Transition  name="slide-fade">
              <section v-if="!profileEdit">
                <b-card>
                  <b-card-title>Identificación</b-card-title>
                  <hr />
                  <b-card-body class="text-center">
                    <p>
                      <b-row>
                        <b-col cols="12" md="6">
                            <img class="img-credential" :src="profile.frontIdentificationPhoto"  alt="">
                        </b-col>
                        <b-col cols="12" md="6">
                            <img class="img-credential" :src="profile.backIdentificationPhoto" alt="">
                        </b-col>
                      </b-row>
                    </p>
                  </b-card-body>
                </b-card>
              </section>
            </Transition>
            </b-col>
            <b-col cols="12" md="4">
              <Transition  name="bounce">
                <EditAccount v-if="profileEdit" :email="profile.email" />
              </Transition>

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
// import BannerOverlay from "../../public/components/BannerOverlay.vue";
import ProfileDeliveryManViewModel from "../viewmodels/ProfileDeliveryManViewModel";
// import EditAccount from "@/modules/auth/components/EditAccount.vue";
// import EditDeliveryMan from "@/components/EditDeliveryMan.vue";

export default {
  name: "ProfileCustomer",
  components: {
    BannerComponent: () => import("@/modules/public/components/BannerComponent.vue"),
    BannerOverlay: () =>  import("@/modules/public/components/BannerOverlay.vue"),
    EditAccount: () => import("@/modules/auth/components/EditAccount.vue"), 
    EditDeliveryMan: () => import("@/components/EditDeliveryMan.vue"),
  },
  mixins: [ProfileDeliveryManViewModel],
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

.img-credential{
  width: 90%;
  max-height: 200px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
  rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  object-fit: cover;
}

</style>
