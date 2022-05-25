<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
/* global mapboxgl */

export default {
  data: function () {
    return {
      airport: "",
      isLoading: false,
      lat: "",
      long: "",
      status: "",
    };
  },

  created: function () {
    var input = this.$route.params.id;
    this.isLoading = true;
    this.isError = false;
    const headers = {
      Authorization: "Bearer " + process.env.VUE_APP_AVWX_1,
    };
    axios
      .get(`https://avwx.rest/api/search/station?text=${input}&n=1&airport=true&reporting=true&format=json`, {
        headers,
      })
      .then((response) => {
        var x = response.data;
        this.airport = x[0];
        console.log("airport", this.airport);
        this.isLoading = false;
        this.lat = this.airport.latitude;
        this.long = this.airport.longitude;
        this.getMap(this.airport.longitude, this.airport.latitude);
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.isError = true;
        this.status = error;
      });
  },

  methods: {
    getMap: function (long, lat) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZWxpb3RwaXRtYW4iLCJhIjoiY2wyN3U3eHVsMDE5ajNoc3p1ZnpmYXp2OCJ9.ZTF3s8Nezquqp9jW5olx5g";
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [long, lat],
        zoom: 11,
      });
      console.log(map);
      // console.log("lat and long", this.lat, this.long);
    },
  },

  mounted: function () {},
  components: {
    Loading,
  },
};
</script>

<template>
  <h1 id="map" class="container" style="width: 400px; height: 300px"></h1>
  <loading :active="isLoading" :is-full-page="true"></loading>
  <div v-if="this.isError === true" class="alert alert-warning mt-5">{{ this.status }}</div>
</template>
