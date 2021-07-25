<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Agencias</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{on, attrs}">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Nueva agencia
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.nombre_agencia"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.acronimo_agencia"
                      label="Acronimo"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.descripcion"
                      label="Descripcion"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.url"
                      label="Url"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-file-input
                      label="Imagen"
                      accept="image/*"
                      @change="imagenSeleccionada"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >¿Seguro que quires eliminar?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Eliminar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{item}">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: false,
        value: 'nombre_agencia',
      },
      {text: 'Acronimo', value: 'acronimo_agencia'},
      {text: 'Descripcion', value: 'descripcion'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nombre_agencia: '',
      acronimo_agencia: '',
      descripcion: '',
      url: '',
      email: '',
      password: '',
      image: '',
    },
    defaultItem: {
      nombre_agencia: '',
      acronimo_agencia: '',
      descripcion: '',
      url: '',
      email: '',
      password: '',
      image: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nueva Agencia' : 'Editar Agencia';
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
      this.desserts = [];
      axios
        .get('https://api-watu.herokuapp.com/admin/agencias')
        .then(result => {
          console.log(result.data.agencias);
          this.desserts = result.data.agencias;
        });
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    imagenSeleccionada(e) {
      this.editedItem.image = e;
    },
    save() {
      if (this.editedIndex > -1) {
        this.editarAgencia();
      } else {
        this.crearNuevaAgencia();
      }
      this.close();
    },

    crearNuevaAgencia() {
      let fd = new FormData();

      fd.append('nombre_agencia', this.editedItem.nombre_agencia);
      fd.append('acronimo_agencia', this.editedItem.acronimo_agencia);
      fd.append('descripcion', this.editedItem.descripcion);
      fd.append('url', this.editedItem.url);
      fd.append('email', this.editedItem.email);
      fd.append('password', this.editedItem.password);
      fd.append('image', this.editedItem.image);

      axios
        .post('https://api-watu.herokuapp.com/admin/agencia/crear', fd)
        .then(resp => {
          console.log(resp);
          this.desserts.push(this.editedItem);
          console.log('Guardadoooo');
        });
    },

    editarrAgencia() {
      Object.assign(this.desserts[this.editedIndex], this.editedItem);
      console.log('Actualizado');
    },
  },
};
</script>

<style></style>
