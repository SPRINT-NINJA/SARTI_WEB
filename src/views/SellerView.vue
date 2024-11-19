<template>
    <div>
        <navbar/>
        <router-view></router-view>
    </div>
</template>
<script>
import Vue from 'vue';
export default Vue.extend({
    name: "SellerView",
    components:{
        Navbar: () => import("@/modules/public/components/Navbar.vue"),
    }
})
</script>