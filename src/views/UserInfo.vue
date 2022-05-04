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
  <header class="py-5 user-info">
    <div class="container px-lg-5">
      <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
        <div class="m-4 m-lg-5">
          <h1 class="display-5 fw-bold">Account Information</h1>
          <img :src="`${user.avitar}`" alt="_blank" />
          <h3 class="fs-4">
            <p>Name: {{ user.name }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Home Airport: {{ user.home_airport }}</p>
            <p>Username: {{ user.username }}</p>
          </h3>
          <button @click="userUpdate(updateParams)">Update User</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
img {
  height: 150px;
  width: 150px;
}
</style>
