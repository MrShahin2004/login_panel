"use strict";

import {createRouter, createWebHistory} from 'vue-router';
import App from "../App.vue";
import UserProfile from "../UserProfile.vue";

const Routes = [
    {path: "/", component: App, name: "Home"},
    {path: "/profile", component: UserProfile, name: "Profile"}
];

const Router = createRouter({
    history: createWebHistory(),
    Routes
});

export default Router;
