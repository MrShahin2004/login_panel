import {createRouter, createWebHistory} from 'vue-router';
import LogIn from '@/views/LogIn.vue';
import UserProfile from '@/views/UserProfile.vue';
import AdminProfile from "@/views/AdminProfile.vue";

const routes = [
    {path: "/", component: LogIn, name: "Home"},
    {path: "/user/profile/:username/:token", component: UserProfile, name: "UserProfile", props: true},
    {path: "/admin/profile/:username/:token", component: AdminProfile, name: "AdminProfile", props: true}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const Token = localStorage.getItem('token');
    if ((to.name === "UserProfile" && !Token) || (to.name === "AdminProfile" && !Token)) {
        next({name: 'Home'});
    } else {
        next();
    }
});

export default router;