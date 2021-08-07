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

    <v-data-table :headers="headers" :items="totalInscritos" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>INSCRITOS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>



        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <div style="display:flex">
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
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
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
    dialog: false,
    dialogDelete: false,
    snackbar: false,
    snackbarMessage: "",
    headers: [
      { text: "Programa", value: "programa" },
      { text: "Inscrito", value: "usuario" },
      { text: "Fecha", value: "fecha_reserva" },
    ],
    totalInscritos: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      estado: "",
      fecha_reserva: "",
      usuario: "",
      programa: "",
    },
    defaultItem: {
      estado: "",
      fecha_reserva: "",
      usuario: "",
      programa: "",
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("https://api-watu.herokuapp.com/vacantes/agencia/1").then((result) => {
        console.log("INSCRITOS");
        const inscriptionsResponse = result.data.listReserva;
        inscriptionsResponse.map((inscription) => {
          console.log("INSCRITOS", inscription);
          this.totalInscritos.push({
            id: inscription.id,
            estado: inscription.estado,
            fecha_reserva:  inscription.fecha_reserva.substring(0, 10),
            usuario: inscription.usuario.nombre,
            programa: inscription.programa.nombre,
          });
        });
      });
    },

  },
};
</script>

<style></style>
