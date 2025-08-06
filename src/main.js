"use strict";

import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/router"
import "../public/style.css"

const app = createApp(App);
app.use(router);
app.mount("#app");
