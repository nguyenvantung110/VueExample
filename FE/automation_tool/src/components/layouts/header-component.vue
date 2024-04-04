<template>
    <div class="header">
        <router-link to='/'>Home</router-link> |
        <router-link to='/toppage'>Toppage</router-link> |
        <a href="#" @click="logout">Logout</a>
    </div>
</template>
<script>
export default {
    methods : {
        logout(){
            localStorage.removeItem('isLoggedIn')
        }
    }
}
</script>
<style scoped>
    .header{
        color:black;
        background :#42b983;
        min-height:3rem;
        line-height:3rem;
    }
</style>