<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-btn variant="text" @click="$router.push('/')"> Survey </v-btn>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="$router.push('/login')"> Login </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn variant="text" @click="$router.push('/signup')"> Signup </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>