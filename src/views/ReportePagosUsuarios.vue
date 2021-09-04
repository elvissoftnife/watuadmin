<template>
  <div>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-data-table
      :headers="headers"
      :items="totalPagoAgencias"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Reporte de Pago de Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn
            @click="imprimir()"
            color="primary"
            large
            depressed
            class="ml-sm-4"
          >
            Descargar Reporte
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <div style="display: flex">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>

          <v-switch
            v-model="item.switch"
            flat
            @click="updateItem(item)"
          ></v-switch>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<!--
    <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
-->
<script>
import axios from "axios";
export default {
  data: () => ({
    agencias: [],
    usuarios: [],
    dialog: false,
    dialogDelete: false,
    snackbar: false,
    snackbarMessage: "",
    headers: [
      { text: "Nombres", value: "nombre"},
      { text: "Apellidos", value: "apellido_paterno" },
      { text: "Email", value: "email" },
      { text: "Fecha de inscripción", value: "fecha_inscripcion" },
      { text: "Fecha fin de inscripción", value: "fecha_fin_inscripcion" },
    ],
    totalPagoAgencias: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      estado: "",
      email: "",
      fecha_inscripcion: "",
      fecha_fin_inscripcion: "",
    },
    defaultItem: {
      id: "",
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      estado: "",
      email: "",
      fecha_inscripcion: "",
      fecha_fin_inscripcion: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  beforeMount() {
    this.getUsers();
  },
  

  methods: {
    getUsers() {
      axios
        .get("https://api-watu.herokuapp.com/administrador/users ")
        .then((result) => {
          this.usuarios = result.data.usuario;

          const inscriptionsResponse = result.data.usuario;
          inscriptionsResponse.map((usuario) => {
            this.totalPagoAgencias.push({
              id: usuario.id,
              nombre: usuario.nombre,
              apellido_paterno: usuario.apellido_paterno,
              apellido_materno: usuario.apellido_materno,
              estado: usuario.estado,
              email: usuario.email,
              fecha_inscripcion: usuario.fecha_inscripcion,
              fecha_fin_inscripcion: usuario.fecha_fin_inscripcion,
            });
          });
        });
    },

    imprimir() {
      axios
        .post("https://api-watu.herokuapp.com/report", { usuarios: this.usuarios },{ responseType: "arraybuffer"})
        .then((r) => {
          const url = window.URL.createObjectURL(new Blob([r.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "reportePagoAgencia.pdf");
          document.body.appendChild(link);
          link.click();
        });
    },
  },
};
</script>

<style></style>
