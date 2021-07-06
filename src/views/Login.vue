<template>
  <v-app>
    <v-container>
      <v-btn depressed color="primary" v-on:click="iniciarSesion()">
        Iniciar Sesion
      </v-btn>
      <p>Login</p>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "login",
  components: {},
  methods: {
    iniciarSesion() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped></style>
