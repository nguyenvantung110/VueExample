<template>
<div class="container login-wrapper">
    <div class="login-form card">
        <div class="card-title">
            <h3>Signin</h3>
        </div>
        <div class="user-name d-flex gap-2 align-items-center">
            <label class="">User Name</label>
            <input class="form-control" v-model="userName" type="text" />
        </div>
        <div class="password d-flex gap-2 align-items-center">
            <label>Password</label>
            <input class="form-control" v-model="password" type="text" />
        </div>
        <div class="login-btn d-flex flex-row gap-5 align-items-center justify-content-between">
            <button class="btn btn-success flex-grow-1" @click="login">Signin</button>
            <span>Signup</span>
        </div>
    </div>
</div>
</template>

<script>

export default {
    data() {
        return {
            userName: '',
            password: ''
        }
    },
    methods: {
        login() {
            console.debug()
            if (this.userName === 'tungnv' && this.password === '123') {
                localStorage.setItem('isLoggedIn', true);
                this.$router.push('/');
            } else {
                window.alert('UserName or password incorrect !!!')
            }
        }
    }
}
</script>

<style scoped>
.login-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-form {
    padding: 2rem;
    gap: 1rem;
}

.user-name label, .password label {
    flex-basis:40%
}
</style>
