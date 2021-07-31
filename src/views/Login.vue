<template>
  <v-app>
    <v-container>
      <v-btn depressed color="primary" v-on:click="iniciarSesion()">
        Iniciar Sesion
      </v-btn>
      <p>Login</p>
      <span>¿Olvidaste tu contraseña?</span>
      <a @click.stop="dialog = true">Click aqui</a>

      <v-dialog
        v-model="dialog"
        max-width="290"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title class="text-h5">
            Recuperar contraseña
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    label="Correo electronico"
                    type="email"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="primary" text @click="recoverPassword()">
              Enviar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    email: "",
  }),
  name: "login",
  components: {},
  methods: {
    iniciarSesion() {
      this.$router.push("/home");
    },
    recoverPassword() {
      this.dialog = false;
      console.log(this.email);
      const email = {
        email: this.email,
      };
      axios
        .post(`https://api-watu.herokuapp.com/reset/password`, email)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style scoped></style>
