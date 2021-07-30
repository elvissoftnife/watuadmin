<template slot="progress">
  <v-container style="width:100%">
    <div
      v-show="dialog"
      style="width:100vw; height:100vh; background:rgba(158, 158, 158, 0.4); position:absolute; z-index:10; top:0; left:0; display:flex; flex-direction:row; justify-content:center; align-items: center;"
    >
      <v-card style="width: 600px;">
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump',
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-layout row wrap>
      <v-flex v-for="program in programs" :key="program.id">
        <v-card class="mx-auto my-4" max-width="300">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="program.image"></v-img>

          <v-card-title>{{ program.nombre }}</v-card-title>

          <v-card-text>
            <div class="text-subtitle-1">Vacantes: {{ program.vacantes }}</div>

            <div class="grey--text my-4 text-subtitle-2">
              Inscritos: {{ program.inscritos }}
            </div>

            <div>
              {{ program.descripcion }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="dialog = !dialog">
              Editar
            </v-btn>
            <v-btn color="deep-purple lighten-2" text>
              Desactivar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      programs: [],
      dialog: false,
    };
  },
  methods: {
    editProgram: function(program_id) {
      console.log(this.programs.find((program) => program.id == program_id));
    },
  },
  beforeCreate: function() {
    axios
      .get("https://api-watu.herokuapp.com/admin/programas")
      .then((response) => {
        this.programs = response.data.programas;
        console.log(this.programs);
      })
      .catch();
  },
};
</script>
<style>
.media {
  border-radius: 3%;
}
.media:hover {
  box-shadow: 0 0 3pt 2pt #ff5555;
  border-radius: 3%;
  cursor: pointer;
}
.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
  width: 100%;
  position: absolute;
}
.block {
  display: block !important;
  height: 24px;
}
</style>
