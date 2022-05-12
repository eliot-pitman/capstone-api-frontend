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
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container px-lg-5">
      <img id="logo" src="favicon.ico" alt="_blank" />
      <a v-if="!isLoggedIn" class="navbar-brand" href="/">METAR</a>
      <a v-if="isLoggedIn" class="navbar-brand" href="/home">METAR</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link active" aria-current="page" href="/home">Home</a>
          </li>
          <li class="nav-item"><a class="nav-link" href="/about">About</a></li>
          <li class="nav-item" v-if="!isLoggedIn"><a class="nav-link" href="/signup">Create Account</a></li>
          <li class="nav-item" v-if="!isLoggedIn"><a class="nav-link" href="/login">Log In</a></li>
          <li class="nav-item" v-if="isLoggedIn"><a class="nav-link" href="/logout">Log Out</a></li>
          <li class="nav-item" v-if="isLoggedIn"><a class="nav-link" href="/userinfo">Account</a></li>
          <li class="nav-item" v-if="isLoggedIn"><a class="nav-link" href="/add">Add Airport</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<style>
#app {
  text-align: center;
  background: white;
}
.navbar-brand {
  font-family: "Bungee", cursive;
  font-size: 2cm;
}
#logo {
  height: 100px;
  width: 100px;
}
</style>
