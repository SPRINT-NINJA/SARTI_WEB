<template>
    <div>
        <!-- Navbar -->
        <div>
            <b-navbar toggleable="lg" type="dark" id="orange-primary">
                <b-navbar-brand to="/">
                    <img src="./../../assets/logo/LOGO-blanco.png" alt="SARTI">
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
    name: 'NavBar',
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style scoped></style>