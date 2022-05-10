<script>
export default {
  data: function () {
    return {
      show: "/show",
    };
  },
  methods: {
    goShow: function () {
      this.$router.push("/show");
    },
    goSignUp: function () {
      this.$router.push("/signup");
    },
  },
};
</script>

<template>
  <header class="py-5">
    <div class="container px-lg-5">
      <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
        <div class="m-4 m-lg-5">
          <h1 class="display-5 fw-bold">Welcome, to METAR</h1>
          <h2>All your Favorite Airports in One Place</h2>
          <p>Easily make an account to save and search current weather data</p>
          <br />
          <li class="content__item">
            <button class="button button--calypso" @click="goSignUp"><span>Create Account</span></button>
          </li>
          or...
          <li class="content__item">
            <button class="button button--calypso" @click="goShow"><span>Search Without Account</span></button>
          </li>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
span {
  font-family: sans-serif;
}
</style>
