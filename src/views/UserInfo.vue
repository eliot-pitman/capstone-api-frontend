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
      favorites: [],
    };
  },
  created: function () {
    axios.get("/favorites").then((response) => {
      this.favorites = response.data;
      console.log("favorites", response.data);
    });
    axios.get("/users").then((response) => {
      this.user = response.data;
      console.log("user", response.data);
    });
    // if (this.user.avitar) {
    //   this.isProfileImg = true;
    // }
  },
  methods: {
    goUpdate: function () {
      this.$router.push("/update");
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column align-items-center text-center p-3 py-5">
    <img v-show="this.isProfileImg === true" id="profile-img" class="rounded-circle mt-5" :src="`${user.avitar}`" />
    <img
      id="profile-img"
      class="rounded-circle mt-5"
      src="https://i.etsystatic.com/10919371/r/il/a8b127/1598401416/il_794xN.1598401416_jji7.jpg"
    />
    <span class="font-weight-bold">{{ user.name }}</span>
    <span class="text-black-50">{{ user.email }}</span>
  </div>
  <header class="py-2 user-info">
    <div class="container px-lg-5">
      <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
        <div class="m-4 m-lg-5">
          <h1 class="display-5 fw-bold">Account Information</h1>
          <br />
          <h3 class="fs-4">
            <div class="row mt-2">
              <div class="col-md-6">
                <span>Home Airport: {{ user.home_airport }}</span>
              </div>
              <br />
              <br />
              <div class="col-md-6">
                <span>Username: {{ user.username }}</span>
              </div>
              <br />
              <br />
              <div class="col-md-6">
                <span>Amount of Favorited Airports: {{ favorites.length }}</span>
              </div>
            </div>
          </h3>
          <br />
          <li class="content__item">
            <button class="button button--pandora mt-3" @click="goUpdate">
              <span>Update Info</span>
            </button>
          </li>
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
