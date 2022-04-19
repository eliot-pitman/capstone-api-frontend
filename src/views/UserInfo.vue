<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "User",
      user: [],
    };
  },
  created: function () {
    axios.get("/users").then((response) => {
      this.user = response.data;
      console.log("user", response.data);
    });
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>{{ user }}</h2>
  </div>
</template>

<style></style>
