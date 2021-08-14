<template>
  <div class="limiter">
		<div class="container-login100" style="background-image: url('./assets/bg-01.jpg');">
			<div class="wrap-login100 p-t-30 p-b-50">
				<span class="login100-form-title p-b-41">
					WATU ADMIN
				</span>
        <v-form ref="form" v-model="valid" @submit.prevent="submit" class="login100-form validate-form p-b-33 p-t-5"> 
          <v-container>
            <v-row>
                <v-text-field
                  v-model="form.email"
                  :rules="[rules.required('correo'), rules.email]"
                  label="Correo"
                  type="email"
                  prepend-icon="mdi-account-circle"
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
                  :rules="[rules.required('contraseña')]"
                  prepend-icon="mdi-lock"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  @click:append="show1 = !show1"
                ></v-text-field>
                <div class="container-login100-form-btn m-t-32">
                  <v-btn 
                    color="primary"
                    :dark="!loginLoading"
                    depressed
                    block
                    :loading="loginLoading"
                    :disabled="loginLoading"
                    type="submit"
                    id="login"
                    >
                    Iniciar Sesion
                  </v-btn>
                </div>

              <div class="container-login100-form-btn m-t-32">
                  <span>¿Olvidaste tu contraseña? </span>
                  <a @click.stop="dialog = true"> Click aqui</a>
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
                                v-model="form.email2"
                                :rules="[rules.required('correo'), rules.email]"
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
                      <v-btn color="secundary" text @click="close()">
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-row>
          </v-container>
        </v-form>
			</div>
		</div>
    <v-snackbar
      v-model="showAlertError"
      timeout="-1"
      top
      content-class="pa-0"
      color="error"
    >
      <v-alert type="error" dense class="ma-0 pr-1" :icon="false">
        <v-row align="center">
          <v-col class="grow">
            {{ messageAlert }}
          </v-col>
          <v-col class="shrink">
            <v-btn dark @click="closeAlert"> cerrar </v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-snackbar>
	</div>
</template>

<script>
import axios from "axios";
import { rules } from "@/utils/rules";

export default {
  name: "Login",
  data: () => ({
    valid: false,
    form:{
      email: "",
      password: "",
      email2: "",
    },
    showAlertError: false,
    loginLoading: false,
    messageAlert: null,
    dialog: false,
    show1: false,
    rules,
  }),
  components: {},
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loginLoading = true;
        this.showAlertError = false;
        console.log("payload => ", this.form);

        axios
        .post(`https://api-watu.herokuapp.com/iniciar-sesion`, this.form)
        .then((response) => {
          console.log("response => ", response);
          this.$router.push("/home");
        })
        .catch(({ response }) => {
          this.messageAlert = this.getMessageError(response);
          this.showAlertError = true;
        })
        .finally(() => {
            this.loginLoading = false;
        });
      }
    },
    recoverPassword() {
      this.dialog = false;
      console.log("email2 => ", this.form.email2);
      axios
        .post(`https://api-watu.herokuapp.com/reset/password`, this.form.email2)
        .then((result) => {
          console.log(result);
          this.showAlertError = false;
        })
        .catch(({ response }) => {
          this.messageAlert = this.getMessageError(response);
          this.showAlertError = true;
        });
    },
    close(){
      this.dialog = false;
    },
    closeAlert() {
      this.showAlertError = false;
    },
    getMessageError(response) {
      if (!response)
        return "Error de Servidor!, intente en otro momento, gracias!";
      return response.data.mensaje || response.data.message;
    },
  },
};
</script>

<style lang="scss">
  @import '../assets/css/auth.css';
  @import '../assets/css/util.css';

  .login100-form{
    padding: 30px 30px;
  }
  
</style>
