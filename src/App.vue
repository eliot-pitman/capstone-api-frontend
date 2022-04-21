<script>
export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>

<template>
  <nav>
    <span v-if="isLoggedIn">
      |
      <router-link to="/home">Home</router-link>
      |
    </span>
    <span v-if="isLoggedIn">
      |
      <router-link to="/about">About</router-link>
      |
    </span>
    <span v-if="!isLoggedIn">
      |
      <router-link to="/signup">SignUp</router-link>
      |
    </span>
    <span v-if="!isLoggedIn">
      |
      <router-link to="/login">LogIn</router-link>
      |
    </span>
    <span v-if="isLoggedIn">
      |
      <router-link to="/logout">LogOut</router-link>
      |
    </span>
    <span v-if="isLoggedIn">
      |
      <router-link to="/userinfo">UserInfo</router-link>
      |
    </span>
    <span v-if="isLoggedIn">
      |
      <router-link to="/add">Add Airport</router-link>
      |
    </span>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
