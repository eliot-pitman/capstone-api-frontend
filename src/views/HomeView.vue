<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to METAR, here are your favorite airports METAR",
      airport: [],
      token: "",
      user: [],
      info: [],
      favorites: [],
    };
  },
  created: function () {
    axios.get("/favorites").then((response) => {
      this.favorites = response.data;
      console.log("favorites", response.data);
    });
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>

    <h2>{{ favorites }}</h2>
  </div>
</template>

<style></style>
