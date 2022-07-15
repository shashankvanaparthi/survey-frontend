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
    path:"/user",
    name:"userhome",
    component: () => import("./views/UserHomeScreen.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./views/Profile.vue")
  },
  {
    path: "/survey/:id",
    name: "survey",
    component: () => import("./views/QuestionsList.vue"),
    props: true
  },
  {
    path: "/createSurvey",
    name: "createsurvey",
    component: () => import('./views/CreateSurvey.vue') 
  },
  {
    path: "/createQuestion",
    name: "createquestion",
    component: () => import('./views/CreateQuestions.vue') 
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
    return "/user"; 
  }
  return true
})


export default router;