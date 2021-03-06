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
    path:"/createUser",
    name:"createUser",
    component: () => import("./views/CreateUser.vue")

  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./views/Profile.vue")
  },
  {
    path:"/manageUsers",
    name:"manageUsers",
    component: () => import("./views/ManagesUsers.vue")
  },
  {
    path: "/survey/:id",
    name: "survey",
    component: () => import("./views/QuestionsList.vue"),
    props: true
  },
  {
    path: "/survey/share/:id",
    name: "shareSurvey",
    component: () => import("./views/Questions.vue"),
    meta:{
      hideNavBar:true
    }
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
  },
  {
    path:"/reports",
    name:"reports",
    component: () => import('./views/ReportsView.vue')
  },
  {
    path:"/reports/:id",
    name:"surveyReport",
    component: () => import('./views/Report.vue')
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  console.log(to.name);
  if(to.name=="shareSurvey"){
    return true;
  }
  if(!isUsersLogged() && to.name!="home"){
    if(to.name=="login") return true;
    return "/login";
  }
  if (isUsersLogged() && (to.name == "home" || to.name == "login")) {
    console.log("redirecting")
    return "/user"; 
  }
  return true
})


export default router;
