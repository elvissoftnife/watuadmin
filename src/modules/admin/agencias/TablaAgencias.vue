<template>
  <div>
    <div style="text-align:right">
      <v-btn color="primary" class="mb-2" @click="dialogCrear = true">
        Nueva agencia
      </v-btn>
    </div>
    <v-dialog v-model="dialogCrear" max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Nueva Agencia</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-row>
                  <v-col cols="12" sm="8" md="8">
                    <v-text-field
                      v-model="crearItem.nombre_agencia"
                      label="Nombre"
                      :rules="rules.nombre"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      v-model="crearItem.acronimo_agencia"
                      label="Acronimo"
                      :rules="rules.acronimo"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="crearItem.url"
                      label="Url"
                      :rules="rules.url"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="crearItem.email"
                      label="Email"
                      :rules="rules.email"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="crearItem.password"
                      label="Password"
                      :rules="rules.password"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      solo
                      v-model="crearItem.descripcion"
                      label="Descripcion"
                      :rules="rules.descripcion"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      label="Imagen"
                      accept="image/*"
                      @change="imagenSeleccionada"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-skeleton-loader
                      v-if="imagePreview === null"
                      height="330"
                      width="100%"
                      type="image"
                    ></v-skeleton-loader>

                    <v-img
                      v-if="imagePreview !== null"
                      height="330"
                      width="100%"
                      :src="imagePreview"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogCrear = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="crearNuevaAgencia">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="nombre_agencia"
      class="elevation-1"
    >
      <template v-slot:item.image="{ item }">
        <v-img :src="item.image" contain height="150" width="150"></v-img>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Agencias</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="1000px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Editar Agencia</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-row>
                        <v-col cols="12" sm="8" md="8">
                          <v-text-field
                            v-model="editedItem.nombre_agencia"
                            label="Nombre"
                            :rules="rules.nombre"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4" md="4">
                          <v-text-field
                            v-model="editedItem.acronimo_agencia"
                            label="Acronimo"
                            :rules="rules.acronimo"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedItem.url"
                            label="Url"
                            :rules="rules.url"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                          <v-textarea
                            solo
                            v-model="editedItem.descripcion"
                            label="Descripcion"
                            :rules="rules.descripcion"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-file-input
                            label="Imagen"
                            accept="image/*"
                            ref="inputFile"
                            @change="imagenSeleccionadaEditar"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-skeleton-loader
                            v-if="imagePreviewEdit === null"
                            height="250"
                            width="100%"
                            type="image"
                          ></v-skeleton-loader>

                          <v-img
                            v-if="imagePreviewEdit !== null"
                            height="250"
                            width="100%"
                            :src="imagePreviewEdit"
                          ></v-img>
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="dialog = false"
                            >
                              Cancelar
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="editarImagenAgencia"
                            >
                              Editar
                            </v-btn>
                          </v-card-actions>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.estado="{ item }">
        <v-switch
          @change="cambiarEstado(item)"
          v-model="item.estado"
          color="success"
          hide-details
        ></v-switch>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>

      <template v-slot:no-data>
        <div>
          Agencias cargando...
        </div>
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar">
      {{ "Complete el formulario de forma correcta." }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    dialogCrear: false,
    imagePreview: null,
    imagePreviewEdit: null,
    headers: [
      { text: "Imagen", value: "image", sortable: false },
      {
        text: "Nombre",
        align: "start",
        value: "nombre_agencia",
      },
      { text: "Acronimo", value: "acronimo_agencia", sortable: false },
      { text: "Descripcion", value: "descripcion", sortable: false },
      { text: "Estado", value: "estado", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    crearItem: {
      nombre_agencia: "",
      acronimo_agencia: "",
      descripcion: "",
      url: "",
      email: "",
      password: "",
      image: "",
    },
    editedItem: {
      nombre_agencia: "",
      acronimo_agencia: "",
      descripcion: "",
      url: "",
      email: "",
      password: "",
      image: "",
    },
    defaultItem: {
      nombre_agencia: "",
      acronimo_agencia: "",
      descripcion: "",
      url: "",
      email: "",
      password: "",
      image: "",
    },
    snackbar:false,
    rules:{
      nombre:[
        val => (val || '').length > 0 || 'Ingrese un nombre.'
      ],
      acronimo:[
        val => (val || '').length > 0 || 'Ingrese un acronimo.'
      ],
      url:[
        val => (val || '').length > 0 || 'Ingrese la url.'
      ],
      email:[
        val => (val || '').length > 0 || 'Ingresa un email.'
      ],
      password:[
        val => (val || '').length > 6 || 'Ingrese una constraseña valida.'
      ],
      descripcion:[
        val => (val || '').length > 0 || 'Ingrese una descripcion.'
      ]
    }
  }),
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [];
      axios
        .get("https://api-watu.herokuapp.com/admin/agencias")
        .then((result) => {
          console.log(result.data.agencias);
          this.desserts = result.data.agencias;
        });
    },

    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    cambiarEstado(item) {
      const valorNuevo = item.estado;
      console.log("-----------------------");
      console.log(valorNuevo);
      axios
        .put("https://api-watu.herokuapp.com/admin/agencia/" + item.id, {})
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => {
          console.log("Errroooor");
          item.estado = valorNuevo ? 0 : 1;
          console.log(error);
        });
    },

    imagenSeleccionada(e) {
      this.crearItem.image = e;
      this.imagePreview = e !== null ? URL.createObjectURL(e) : null;
    },

    imagenSeleccionadaEditar(e) {
      console.log(e);
      this.editedItem.image = e;
      this.imagePreviewEdit =
        e !== null && e !== undefined ? URL.createObjectURL(e) : null;
    },

    crearNuevaAgencia() {
      let nombre_agencia = this.crearItem.nombre_agencia.length>0
      let acronimo_agencia = this.crearItem.acronimo_agencia.length>0
      let url = this.crearItem.url.length>0
      let email = this.crearItem.email.length>0
      let password = this.crearItem.password.length>6
      let descripcion = this.crearItem.descripcion.length>0
      let imagen = this.crearItem.image!==null && this.crearItem.image.type!=undefined 

      if(!nombre_agencia || !acronimo_agencia || !url || !email || !password || !descripcion || !imagen){
        this.snackbar=true
        return;
      }

      let fd = new FormData();
      fd.append("nombre_agencia", this.crearItem.nombre_agencia);
      fd.append("acronimo_agencia", this.crearItem.acronimo_agencia);
      fd.append("descripcion", this.crearItem.descripcion);
      fd.append("url", this.crearItem.url);
      fd.append("email", this.crearItem.email);
      fd.append("password", this.crearItem.password);
      fd.append("image", this.crearItem.image);


      axios
        .post("https://api-watu.herokuapp.com/admin/agencia/crear", fd)
        .then((resp) => {
          console.log(resp);
          this.desserts.push(this.crearItem);
          console.log("Guardadoooo");
          this.dialogCrear = false;
        });
    },

    editarAgencia(imagen) {

      let nombre_agencia = this.editedItem.nombre_agencia.length>0
      let acronimo_agencia = this.editedItem.acronimo_agencia.length>0
      let url = this.editedItem.url.length>0
      let descripcion = this.editedItem.descripcion.length>0

      if(!nombre_agencia || !acronimo_agencia || !url || !descripcion){
        this.snackbar=true
        return;
      }

      axios
        .post(
          "https://api-watu.herokuapp.com/agencia/editar/" + this.editedItem.id,
          {
            nombre_agencia: this.editedItem.nombre_agencia,
            acronimo_agencia: this.editedItem.acronimo_agencia,
            descripcion: this.editedItem.descripcion,
            url: this.editedItem.url,
            image: imagen,
          }
        )
        .then((resp) => {
          console.log(resp);
          this.imagePreviewEdit = null;
          this.$refs.inputFile.reset();
          this.dialog = false;
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem);
          });
          this.initialize();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editarImagenAgencia() {
      if (this.imagePreviewEdit === null) {
        this.editarAgencia(this.editedItem.image);
      } else {
        let fd = new FormData();
        fd.append("image", this.editedItem.image);
        axios
          .post("https://api-watu.herokuapp.com/subirimage", fd)
          .then((resp) => {
            this.editarAgencia(resp.data.URL);
          });
      }
    },
  },
};
</script>

<style></style>
