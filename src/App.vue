<template>
  <v-app>
    <v-app-bar v-if="isLogged === false">
      <v-app-bar-title>
        <v-btn variant="text" @click="$router.push('/')"> Survey </v-btn>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="$router.push('/login')"> Login </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-app-bar v-if="isLogged === true">
      <v-app-bar-title>
        <v-btn variant="text" @click="$router.push('/')"> Survey </v-btn>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props">
            Create
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title style="cursor: pointer;" @click="goSurvey">Survey</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title style="cursor: pointer;" @click="goQuestions">Question</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>


      <v-toolbar-items>

        <!-- <v-btn variant="text" @click="$router.push('/create')"> Create </v-btn> -->
      </v-toolbar-items>
      <v-toolbar-items v-if="isAdmin === true">
        <v-btn variant="text" @click="$router.push('/createUser')"> Create User </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn variant="text" @click="signOut"> Signout </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="p-2">
        <a class="nav-link" @click="goProfile" style="cursor: pointer;" id="navbarDropdownMenuLink-4"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="https://placeimg.com/50/50/any" class="rounded-circle z-depth-0" alt="avatar image" height="30">
        </a>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <div class="container-fluid">
        <router-view class="mt-3" />
      </div>
    </v-main>
  </v-app>



</template>

<script>
import { isUsersLogged, isAdmin } from "./services/UserAuthenticationService"
export default {
  name: "App",
  data() {
    return {
      isLogged: isUsersLogged(),
      isAdmin: isAdmin()
    };
  },
  methods: {
    signOut() {
      localStorage.clear()
      this.isLogged = isUsersLogged();
      this.$router.push({ name: "home" });
    },
    goSurvey() {
      console.log("goSurvey clicked");
      this.$router.push({ name: "createsurvey" })
    },
    goQuestions() {
      console.log("goQuestions clicked");
      this.$router.push({ name: "createquestion" })
    },
    goProfile() {
      this.$router.push({ name: 'profile' })
    },
  },

  mounted() {
    console.log("App.vue mounted")
    this.emitter.on("logged", (args) => {
      console.log("Changed");
      console.log(args);
      this.isLogged = isUsersLogged();
    });
    this.emitter.on("isAdmin", (args) => {
      console.log("isAdmin Changed");
      this.isAdmin = isAdmin();
    })
  }
};
</script>