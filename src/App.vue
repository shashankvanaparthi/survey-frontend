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
      <v-toolbar-items>
        <v-btn variant="text" @click="$router.push('/createUser')"> Create User </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn variant="text" @click="signOut"> Signout </v-btn>
      </v-toolbar-items>
    </v-app-bar>


    <v-main>
      <div class="container-fluid">
        <router-view class="mt-3"/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { isUsersLogged } from "./services/UserAuthenticationService"
export default {
  name: "App",
  data() {
    return {
      isLogged: isUsersLogged(),
    };
  },
  methods: {
    signOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.isLogged = isUsersLogged();
      this.$router.push({ name: "home" });
    },
  },

  mounted() {
    console.log("App.vue mounted")
    this.emitter.on("logged", (args) => {
      console.log("Changed");
      console.log(args);
      this.isLogged = isUsersLogged();
    });
  }
};
</script>