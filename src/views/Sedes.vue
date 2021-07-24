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
            <v-dialog v-model="dialogVisible" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Estas seguro que quieres desabilitar esta sede?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeVisible">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="changeVisible">OK</v-btn>
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
            v-ripple
            @click="openDialogVisible(item)"
          ></v-simple-checkbox>
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
      dialogVisible: false,
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
        { text: 'Imagen', value: 'image', sortable: false }, 
        { text: 'Visible', value: 'estado', sortable: false }, 
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

    },

    watch: {
      dialogVisible (val) {
        val || this.closeVisible()
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
            estado: true,
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: true,
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: true,
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: true,
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: true,
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: true,
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: true,
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: true,
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: true,
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: true,
          },
          {
            nombre: 'Ace Work and Travel-Lima',
            contactame: 956321458,
            direccion: 'direccion2 Lima-Peru',
            distrito: 'Lima',
            agencia: 'Agencia GAAA',
            image: "Imagen",
            estado: true,
          },
        ]
      },

      openDialogVisible(item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogVisible = true
      },

      changeVisible () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeVisible()
      },

      closeVisible () {
        this.dialogVisible = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

    },
};
</script>

<style></style>
