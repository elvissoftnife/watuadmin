<template>
  <div>
    <div>
      <h2>Agencias</h2>
      <hr />
    </div>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Calories
            </th>
            <th class="text-left">
              Estado
            </th>
            <th class="text-left">
              Editar
            </th>
            <th class="text-left">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
            <td>
              <v-btn class="mx-2" fab dark small color="green" cli>
                <v-icon dark>
                  mdi-eye
                </v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="blue"
                @click="
                  dialog = true;
                  agencia.nombre = 'Mi agencia';
                  agencia.direccion = 'la direccion';
                "
              >
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn class="mx-2" fab dark small color="red">
                <v-icon dark>
                  mdi-delete
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-dialog v-model="dialog" max-width="600px">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card>
          <v-card-title>
            <span class="text-h5">Editar Agencia</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    :rules="rules.nombre"
                    label="Nombre*"
                    v-model="agencia.nombre"
                    hint="Ingresa el nombre."
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    :rules="rules.direccion"
                    label="Direccion"
                    hint="Ingresa el nombre de la direccion."
                    v-model="agencia.direccion"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              :disabled="!valid"
              text
              @click="validate"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => {
    return {
      valid: true,
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
      errors: [],
      agencia: {
        nombre: null,
        direccion: null,
      },
      dialog: false,
      rules: {
        nombre: [
          (v) => !!v || "Nombre requerido.",
          (v) =>
            (v && v.length <= 10) || "Nombre debe tener mas de 10 caracteres.",
        ],
        direccion: [
          (v) => !!v || "Direccion requerida.",
          (v) =>
            (v && v.length > 5) || "Direccion debe tener mas de 5 caracteres.",
        ],
      },
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        console.log("*********************");
        console.log(this.agencia.nombre);
        console.log(this.agencia.direccion);
        console.log("*********************");

        axios
          .get("https://jsonplaceholder.typicode.com/todos/1")
          .then((result) => {
            console.log(result.data);
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
<style></style>
