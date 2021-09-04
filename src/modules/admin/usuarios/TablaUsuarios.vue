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

    <v-data-table :headers="headers" :items="totalUsuarios" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>USUARIOS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <!--
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Itemx
              </v-btn>
            </template>
            -->
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombres"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.namePat"
                        label="Apellido Paterno"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nameMat"
                        label="Apellido Materno"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.state"
                        label="Estado"
                        disabled
                      ></v-text-field>
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
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm(editedItem)"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Apellido Paterno", value: "namePat" },
      { text: "Apellido Materno", value: "nameMat" },
      { text: "Estado", value: "state" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    totalUsuarios: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      namePat: "",
      nameMat: "",
      email: "",
      password: "",
      state: false,
    },
    defaultItem: {
      name: "",
      namePat: "",
      nameMat: "",
      email: "",
      password: "",
      state: false,
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
      axios.get("https://api-watu.herokuapp.com/admin/users").then((result) => {
        const usersResponse = result.data.lista_users;
        usersResponse.map((user) => {
          console.log("USERR", user);
          this.totalUsuarios.push({
            id: user.id,
            name: user.nombre,
            namePat: user.apellido_paterno,
            nameMat: user.apellido_materno,
            state: user.estado == 1 ? "activado" : "desactivado",
            switch: user.estado == 1 ? true : false,
          });
        });
      });
    },

    editItem(item) {
      this.editedIndex = this.totalUsuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.totalUsuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm(user) {
      console.log(user);
      //this.totalUsuarios.splice(this.editedIndex, 1);
      //Eliminar usuario
      // const id = user.id;
      // axios
      //   .delete("https://api-watu.herokuapp.com/user/" + id)
      //   .then((result) => {
      //     console.log("result", result);
      //     console.log("borrado");
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });

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
    },

    updateItem(user) {
      const id = user.id;
      axios
        .put(`https://api-watu.herokuapp.com/admin/users/` + id)
        .then((result) => {
          console.log(result);
          console.log("user123", user);
          const newUser = {
            ...user,
            state: user.switch ? "activado" : "desactivado",
            switch: user.switch,
          };
          //Obtener en que posiicon del arreglo esta el usuario actualizaod
          const indexUserList = this.totalUsuarios.findIndex(
            (arr) => arr.id == id
          );
          //Eliminar ese usuario
          this.totalUsuarios.splice(indexUserList, 1);
          //Insertar el usuario editado al inicio
          this.totalUsuarios.unshift(newUser);

          // this.totalUsuarios[indexUserList] = newUser;

          this.snackbarMessage = "Estado actualizado";
          this.snackbar = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    save() {
      if (this.editedIndex > -1) {
        const { id, name, nameMat, namePat } = this.editedItem;
        const userEdit = {
          nombre: name,
          apellido_materno: nameMat,
          apellido_paterno: namePat,
        };
        axios
          .put("https://api-watu.herokuapp.com/user/" + id, userEdit)
          .then((result) => {
            console.log("result", result);
            this.snackbarMessage = "Usuario actualizado correctamente";
            this.snackbar = true;
          })
          .catch(function(error) {
            console.log(error);
          });
        //Obtener en que posiicon del arreglo esta el usuario actualizaod
        const indexUserList = this.totalUsuarios.findIndex(
          (arr) => arr.id == id
        );
        //Eliminar ese usuario
        this.totalUsuarios.splice(indexUserList, 1);
        //Insertar el usuario editado al inicio
        this.totalUsuarios.unshift(this.editedItem);
      } else {
        //Crear usuario
      }

      this.close();
    },
  },
};
</script>

<style></style>
