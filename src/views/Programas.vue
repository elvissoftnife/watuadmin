<template slot="progress">
  <v-container style="width:100%">
    <div id="update-modal" v-show="dialog">
      <v-card style="width: 600px;">
        <v-card-title>
          <span class="text-h5">Editar programa</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nombre*"
                  v-model="edit_program.nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <p>Descripción*</p>
                <v-textarea
                  solo
                  name="input-7-4"
                  v-model="edit_program.descripcion"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Vacantes*"
                  v-model="edit_program.vacantes"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Indica campos requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="editProgram()">
            Aceptar
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
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="setProgram(program)"
            >
              Editar
            </v-btn>
            <v-btn color="deep-purple lighten-2" text v-on:click="activateOrDesactivateProgram($event,program.id)">
              {{ program.estado==1 ?  'ACTIVAR':'DESACTIVAR' }}
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
      edit_program: {}
    };
  },
  methods: {
    editProgram: function() {
      axios
        .post(
          `https://api-watu.herokuapp.com/programa/editar/${this.edit_program.id}`,
          {
            nombre: this.edit_program.nombre,
            descripcion: this.edit_program.descripcion,
            vacantes: this.edit_program.vacantes,
          }
        )
        .then((response) => {
          if (response.status == 200) {
            this.programs.forEach((program) => {
              if (program.id == this.edit_program.id) {
                program.nombre = this.edit_program.nombre;
                program.descripcion = this.edit_program.descripcion;
                program.vacantes = this.edit_program.vacantes;
              }
            });
          }
        })
        .catch();
    },
    setProgram: function(program) {
      this.edit_program.id = program.id;
      this.edit_program.nombre = program.nombre;
      this.edit_program.descripcion = program.descripcion;
      this.edit_program.vacantes = program.vacantes;
      this.dialog = !this.dialog;
    },
    activateOrDesactivateProgram:function(event,id){
      console.log(event.target.innerText);
      axios.put(`https://api-watu.herokuapp.com/admin/programa/${id}`);
      let btn=event.target;
      if(btn.innerText=='ACTIVAR'){
        btn.innerText='DESACTIVAR';
      }else{
        btn.innerText='ACTIVAR';
      }
    }
  },
  beforeCreate: function() {
    axios
      .get("https://api-watu.herokuapp.com/admin/programas")
      .then((response) => {
        //this.programs = response.data.programas.filter(programa=>programa.estado<2);
        this.programs = response.data.programas;
        console.log(this.programs);
      })
      .catch();
  },
};
</script>
<style>
#update-modal {
  width: 100vw;
  height: 100vh;
  background: rgba(158, 158, 158, 0.4);
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
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
