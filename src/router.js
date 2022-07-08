import { createWebHistory, createRouter } from "vue-router";
import { isUsersLogged } from "./services/UserAuthenticationService";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./views/Home.vue")
  },
  {
    path:"/login",
    name: "login",
    component: () => import("./views/Login.vue")
  },
  {
    path:"/createUser",
    name:"createuser",
    component: () => import("./views/CreateUser.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./views/Profile.vue"),
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  console.log(to.name);
  if (isUsersLogged() && (to.name == "home" || to.name == "login")) {
    console.log("redirecting")
    return "/profile"; 
  }
  return true
})


export default router;