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
  text-align: center;
}
</style>
