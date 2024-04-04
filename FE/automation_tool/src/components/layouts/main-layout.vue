<template>
<div class="main-layout">
    <HeaderComponent />
    <main>
        <router-view />
    </main>
    <FooterComponent />
</div>
</template>

<script>
import HeaderComponent from '.././layouts/header-component.vue'
import FooterComponent from '.././layouts/footer-component.vue'

export default {
    name: 'MainLayout',
    components: {
        HeaderComponent,
        FooterComponent
    },
    props: {
        msg: String
    }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.main-layout {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
}

main {
    flex : 1 0 auto;
    background: #f0f5f2;
    width: 100%;
}
</style>
  ./header-component.vue./footer-component.vue
