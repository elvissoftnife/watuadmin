<template>
  <div>
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Sedes</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="900px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Agregar Sede
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        class="py-0"
                      >
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Nombre"
                          dense
                          outlined
                          :rules="[rules.requiredHard('Nombre')]"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        class="py-0"
                      >
                        <v-select
                          v-model="editedItem.agencia"
                          label="Agencia"
                          dense
                          outlined
                          :rules="[rules.requiredHard('Agencia')]"
                          :menu-props="{ bottom: true, offsetY: true }"
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        class="py-0"
                      >
                        <v-text-field
                          v-model="editedItem.contactame"
                          label="Contacto"
                          dense
                          outlined
                          :rules="[rules.requiredHard('Contacto')]"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        class="py-0"
                      >
                        <v-text-field
                          v-model="editedItem.direccion"
                          label="Dirección"
                          dense
                          outlined
                          :rules="[rules.requiredHard('Dirección')]"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        class="py-0"
                      >
                        <v-text-field
                          v-model="editedItem.distrito"
                          label="Distrito"
                          dense
                          outlined
                          :rules="[rules.requiredHard('Distrito')]"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="7"
                        class="py-0"
                      >
                        <v-file-input
                        v-model="editedItem.image"
                          :rules="rules"
                          accept="image/png, image/jpeg, image/bmp"
                          placeholder="Seleccione una imagen"
                          prepend-icon="mdi-camera"
                          label="Imagen"
                          dense
                          outlined
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Estas seguro que quieres eliminar esta sede?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.image`]="{ item }">
          <v-icon
            v-model="item.image"
          >
            mdi-eye
          </v-icon>
        </template>
        <template v-slot:[`item.estado`]="{ item }">
          <v-simple-checkbox
            v-model="item.estado"
          ></v-simple-checkbox>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
  </div>
</template>

<script>
import { rules } from "@/utils/rules";
export default {
   data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          value: 'nombre',
        },
        { text: 'Contacto', value: 'contactame' },
        { text: 'Dirección', value: 'direccion' },
        { text: 'Distrito', value: 'distrito' },
        { text: 'Agencia a la que pertenece', value: 'agencia' },
        { text: 'Visible', value: 'estado', sortable: false },
        { text: 'Imagen', value: 'image', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        agencia: '',
        contactame: '',
        direccion: '',
        distrito: '',
        estado: 'false',
        image: ''
      },
      defaultItem: {
        nombre: '',
        agencia: '',
        contactame: '',
        direccion: '',
        distrito: '',
        estado: 'false',
        image: ''
      },
      rules,
      /*
      rules: [
        ...rules,
        value => !value || value.size < 2000000 || 'El peso de la imagen debe ser menos de 2 MB!',
      ],¨
      */
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar Sede' : 'Editar Sede'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: "true",
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: "true",
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: "true",
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: "true",
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: "true",
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: "true",
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: "true",
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: "true",
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: "true",
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: "true",
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: "true",
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
};
</script>

<style></style>
