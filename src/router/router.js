"use strict";

import {createRouter, createWebHistory} from 'vue-router';
import App from "../App.vue";
import UserProfile from "../UserProfile.vue";

const Routes = [
    {path: "/", component: App, name: "Home"},
    {path: "/new", component: UserProfile, name: "New"}
];

const Router = createRouter({
    history: createWebHistory(),
    Routes
});

export default Router;
