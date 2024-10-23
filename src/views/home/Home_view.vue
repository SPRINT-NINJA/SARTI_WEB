<template>
    <div>
        <!-- Navbar -->
        <div>
            <b-navbar toggleable="lg" type="dark" style="background-color: #F6A249;">
                <b-navbar-brand to="/">
                    <img src="./../../assets/logo/ICON-SARTI.png" alt="SARTI">
                </b-navbar-brand>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-button to="login" variant="hide" class="mb-2">
                            <b-icon variant="white" icon="cart3" font-scale="2"></b-icon>
                        </b-button>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>

    </div>
</template>

<script lang="ts">

export default {
    name: 'HomeView',
    data() {
        return {
        }
    },
}
</script>

<style>
</style>