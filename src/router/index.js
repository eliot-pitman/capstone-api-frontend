import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import LogOut from "../views/LogOut.vue";
import UserInfo from "../views/UserInfo.vue";
import AddAirport from "../views/AddAirport.vue";
import LobbyMETAR from "../views/LobbyMETAR.vue";
import ShowWeather from "../views/ShowWeather.vue";
import UserUpdate from "../views/UserUpdate.vue";
import ShowWOAccount from "../views/ShowWOAccount.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogOut,
  },
  {
    path: "/userinfo",
    name: "UserInfo",
    component: UserInfo,
  },
  {
    path: "/add",
    name: "AddAirport",
    component: AddAirport,
  },
  {
    path: "/",
    name: "LobbyMETAR",
    component: LobbyMETAR,
  },
  {
    path: "/weather/:icao",
    name: "ShowWeather",
    component: ShowWeather,
  },
  {
    path: "/update",
    name: "UserUpdate",
    component: UserUpdate,
  },
  {
    path: "/show",
    name: "show",
    component: ShowWOAccount,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
