import {createRouter, createWebHistory} from 'vue-router';
import LogIn from '@/views/LogIn.vue';
import UserProfile from '@/views/UserProfile.vue';
import AdminProfile from "@/views/AdminProfile.vue";

const routes = [
    {path: '/', component: LogIn, name: 'Home'},
    {path: '/profile/:user/:token', component: UserProfile, name: 'Profile', props: true},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.name === 'Profile' && !token) {
        next({name: 'Home'});
    } else {
        next();
    }
});

export default router;