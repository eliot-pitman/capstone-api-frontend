<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "User Info:",
      user: [],
      updateParams: {},
      status: "",
      isProfileImg: false,
    };
  },
  created: function () {
    axios.get("/users").then((response) => {
      this.user = response.data;
      console.log("user", response.data);
    });
    if (this.user.avitar) {
      this.isProfileImg = true;
    }
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
  <div class="d-flex flex-column align-items-center text-center p-3 py-5">
    <img v-show="this.isProfileImg === true" id="profile-img" class="rounded-circle mt-5" :src="`${user.avitar}`" />
    <img
      v-show="this.isProfileImg === false"
      id="profile-img"
      class="rounded-circle mt-5"
      src="https://www.pngitem.com/pimgs/m/200-2008473_pilot-with-hat-and-tie-pilot-silhouette-transparent.png"
    />
    <span class="font-weight-bold">{{ user.name }}</span>
    <span class="text-black-50">{{ user.email }}</span>
  </div>
  <header class="py-2 user-info">
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
          <a class="btn btn-primary btn-lg" href="/update">Edit Account</a>
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
