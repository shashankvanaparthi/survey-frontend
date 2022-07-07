import { createWebHistory, createRouter } from "vue-router";
const Profile = () => import("./components/Profile.vue")
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./components/Home.vue")
  },
  {
    path:"/login",
    name: "login",
    component: () => import("./components/Login.vue")
  },
  {
    path:"/signup",
    name:"signup",
    component: () => import("./components/Register.vue")
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;