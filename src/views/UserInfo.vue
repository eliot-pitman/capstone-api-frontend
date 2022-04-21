<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "User Info:",
      user: [],
      updateParams: {},
      status: "",
    };
  },
  created: function () {
    axios.get("/users").then((response) => {
      this.user = response.data;
      console.log("user", response.data);
    });
  },
  methods: {
    userUpdate: function () {
      axios
        .patch("/users", this.updateParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("error", error.response.status, error.response.statusText);
          this.status = error.response.status;
        });
    },
  },
};
</script>

<template>
  <div class="user-info">
    <h1>{{ message }}</h1>
    <img :src="`${user.avitar}`" alt="_blank" />
    <h2>Name: {{ user.name }}</h2>
    <h2>Email: {{ user.email }}</h2>
    <h2>Home Airport {{ user.home_airport }}</h2>
    <h2>Username: {{ user.username }}</h2>
  </div>
</template>

<style>
img {
  height: 150px;
  width: 150px;
}
</style>
