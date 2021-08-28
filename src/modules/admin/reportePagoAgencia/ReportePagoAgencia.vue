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
          <v-toolbar-title>Reporte de Pago de Agencias</v-toolbar-title>
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
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
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
    dialog: false,
    dialogDelete: false,
    snackbar: false,
    snackbarMessage: "",
    headers: [
      { text: "Nombre", value: "nombre_agencia" },
      { text: "Acronimo", value: "acronimo_agencia" },
      { text: "Fecha", value: "fecha_inscripcion" },
      { text: "Correo", value: "usuario.email" },
    ],
    totalPagoAgencias: [],
    editedIndex: -1,
    editedItem: {
      nombre_agencia: "",
      acronimo_agencia: "",
      fecha_inscripcion: "",
      usuario: "",
    },
    defaultItem: {
      nombre_agencia: "",
      acronimo_agencia: "",
      fecha_inscripcion: "",
      usuario: "",
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
      axios
        .get("https://api-watu.herokuapp.com/admin/agencias/pagos")
        .then((result) => {
          const inscriptionsResponse = result.data.listar_agencias;
          this.agencias = result.data;
          inscriptionsResponse.map((pagoAgencia) => {
            this.totalPagoAgencias.push({
              nombre_agencia: pagoAgencia.nombre_agencia,
              acronimo_agencia: pagoAgencia.acronimo_agencia,
              fecha_inscripcion: pagoAgencia.fecha_inscripcion.substring(0, 10),
              usuario: pagoAgencia.usuario,
            });
          });
        });
    },

    imprimir() {
      axios
        .get("https://api-watu.herokuapp.com/report2", {
          responseType: "arraybuffer",
        })
        .then((r) => {
          console.log(r.data);
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
