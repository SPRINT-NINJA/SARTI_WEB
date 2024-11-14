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
                {{ profile.name }} {{ profile.firstLastName }}
                {{ profile.secondName ? profile.secondName : "" }}
              </h1>
              <h5>{{ profile.email }}</h5>
            </section>
          </div>
          <b-row>
            <b-col cols="12" md="8" v-show="profileEdit">
              <EditCustomerAccount :profile="profile" />

            </b-col>
            <b-col cols="12" md="8" v-show="!profileEdit">
              <section>
                <b-card class="my-3">
                  <b-card-title> Dirección</b-card-title>
                  <hr />
                  <b-card-body>
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
              <b-row>
                <b-col>
                  <b-card v-show="!profileEdit" class="text-center">
                    <b-card-title> Productos </b-card-title>
                    <b-icon
                      class="my-3"
                      icon="shop-window"
                      variant="red-palete"
                      scale="3"
                    ></b-icon>
                    <b-card-body>
                      <div
                        class="d-flex justify-content-center align-items-center my-2"
                      >
                        <b-button variant="orange-primary">
                          Visualizar
                        </b-button>
                      </div>
                    </b-card-body>
                  </b-card>
                </b-col>
                <b-col>
                  <b-card v-show="!profileEdit" class="text-center">
                    <b-card-title> Mis Pedidos </b-card-title>
                    <b-icon
                      class="my-3"
                      icon="box-seam"
                      variant="red-palete"
                      scale="3"
                    ></b-icon>
                    <b-card-body>
                      <div
                        class="d-flex justify-content-center align-items-center my-2"
                      >
                        <b-button variant="orange-primary">
                          Visualizar
                        </b-button>
                      </div>
                    </b-card-body>
                  </b-card>
                </b-col>
              </b-row>
              <EditAccount v-show="profileEdit" :email="profile.email" />
         
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
                        :icon="
                          profileEdit ? 'box-arrow-left' : 'person-lines-fill'
                        "
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

<script>
import BannerComponent from "../../public/components/BannerComponent.vue";
import BannerOverlay from "../../public/components/BannerOverlay.vue";
import ProfileCustomerViewModel from "../viewmodels/ProfileCustomerViewModel";
import EditCustomerAccount from "@/components/EditCustomerAccount.vue";
import EditAccount from "@/components/EditAccount.vue";

export default {
  name: "ProfileCustomer",
  components: {
    BannerComponent: BannerComponent,
    BannerOverlay: BannerOverlay,
    EditCustomerAccount,
    EditAccount
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
</style>
