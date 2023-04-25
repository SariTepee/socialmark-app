import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index";

// ! Server
import io from "socket.io-client";
const socket = io("http://localhost:2023");

import "@/assets/style.css";

// *NOTE - COMPONENETS
import appHeader from "@/components/Shared/appHeader";
import appBookmarkList from "@/components/Shared/appBookmarkList/appBookmarkList";
import appAxios from "./utils/appAxios";
import vueCryptojsMin from "vue-cryptojs";
import store from "./store";

// *NOTE - APP
const app = createApp(App);

app.use(router);
app.use(vueCryptojsMin);
app.use(store);

// *NOTE - GLOBAL PROPERTIES
app.config.globalProperties.$appAxios = appAxios;
app.config.globalProperties.$socket = socket;

app.component("app-header", appHeader);
app.component("app-bookmark-list", appBookmarkList);

app.mount("#app");
