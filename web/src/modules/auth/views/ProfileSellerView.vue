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
          <div class="my-5 mx-2" >
            <section v-show="!profileEdit">
              <h1>{{ profile.name }} {{ profile.fistLastName }} {{ profile.secondLastName ?  profile.secondLastName : ''}}</h1>
              <h5>{{ profile.user.email }}</h5>
            </section>
        </div>
        <b-row>
          <b-col cols="12" md="8" v-show="profileEdit">
            <EditSellerAccount :profile="profile" />
          </b-col>
          <b-col cols="12" md="8" v-show="!profileEdit">
            <section>
              <b-card>
                <b-card-title> Información de Tienda</b-card-title>
                <hr />
                <h2 class="text-center">
                  {{ profile.bussinessName }}
                  <b-icon icon="check2-circle" variant="success"></b-icon>
                </h2>
                <b-card-body>
                  <p>
                    <img src="../../../assets/paypal.png" class="img-paypal" >
                    <b>
                    {{ profile.wallet }}
                    </b>
                  </p>
                  <p>
                    {{ profile.description }}              
                  </p>
                </b-card-body>
              </b-card>
            </section>
            <section>
              <b-card class="my-3">
                <b-card-title> Dirección</b-card-title>
                <hr />
                <b-card-body>
                  <p>
                    Ciudad,{{ profile.address.city }},
                    Colonia, {{ profile.address.colony }},Estado de {{ profile.address.state }},
                    Calle {{ profile.address.street }}, 
                    Localidad {{ profile.address.locality }}, 
                    Tipo de residencia {{ profile.address.addressType }}, 
                    N.Ext {{ profile.address.externalNumber }}, N.Int {{ profile.address.internalNumber }}, Código postal {{ profile.address.zipCode }},
                    {{ profile.address.referenceNear }}
                  </p>
                </b-card-body>
              </b-card>
            </section>
          </b-col>
          <b-col cols="12" md="4">
            
            <EditAccount v-show="profileEdit" :email="profile.user.email"/>
  
                <div
                  class="d-flex justify-content-center align-items-center my-2"
                >
                  <b-button
                    class="mx-2 w-100"
                    size="md"
                    variant="orange-primary"
                    @click="editProfile()"
                  >
                    <b-icon :icon="profileEdit ? 'box-arrow-left':'person-lines-fill'"></b-icon>
                    {{ profileEdit ? 'Regresar': 'Editar Perfil' }}
                    
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
import ProfileSellerViewModel from "../viewmodels/ProfileSellerViewModel";


export default {
  name: "ProfileSeller",
  components: {
    BannerComponent: () => import("@/modules/public/components/BannerComponent.vue"),
    BannerOverlay: ()=> import("@/modules/public/components/BannerOverlay.vue"),
    EditSellerAccount: ()=> import("@/modules/auth/views/EditSellerAccount.vue"),
    EditAccount: ()=> import("@/modules/auth/components/EditAccount.vue"),
    CustomOverlay: () =>
      import("@/modules/public/components/CustomOverlay.vue"),
  },
  mixins:[ProfileSellerViewModel]
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

.img-paypal{
  width: 70px;
}
</style>
