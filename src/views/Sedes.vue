<template>
  <div>
<!--
        <v-row
          justify="center"
          class="mb-5"
          >
          <v-col
            cols="12"
            sm="4"
            lg="5"
          > 
            <v-text-field
                class="d-none d-sm-flex"
                v-model="form.nombre_sede"
                label="Nombre de la sede"
                placeholder="Buscar por el nombre de la sede"
                outlined
                dense
                hide-details
                :counter="20"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            lg="5"
          > 
            <v-text-field
                class="d-none d-sm-flex"
                v-model="form.nombre_sede"
                label="Distrito de la sede"
                placeholder="Buscar por distrito de la sede"
                outlined
                dense
                hide-details
                :counter="20"
            ></v-text-field>
          </v-col>
          <v-col
              cols="12"
              sm="4"
              lg="2"
              style="text-align: right"
            >
              <v-btn
                depressed
                color="rgba(241, 151, 0, .075)"
                class="secondary--text"
                @click="clearFilter"
              >
                Limpiar Filtros
              </v-btn>
          </v-col>
        </v-row>
     
      <hr role="separator" aria-orientation="horizontal" class="v-divider theme--light mb-10">
-->
      <v-data-table
        :headers="headers"
        :items="sedes"
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
                <v-card-title class="text-h6 grey lighten-2">
                  Cambiar visibilidad de Sede
                </v-card-title>
                <v-card-text class="pt-5" style="font-size: 18px">
                  Estas seguro que quieres desabilitar esta sede?
                </v-card-text>

                <v-divider></v-divider>
                
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
        <!--
        <template v-slot:[`item.image`]="{ item }">
          <v-icon
            v-model="item.image"
          >
            mdi-eye
          </v-icon>
        </template>
        -->
        <template v-slot:[`item.estado`]="{ item }">
          <v-simple-checkbox
            :value="getCheckboxValue(item.estado)"
            v-ripple
            @click="openDialogVisible(item)"
          ></v-simple-checkbox>
        </template>
      </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

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
        { text: 'Agencia a la que pertenece', value: 'agencia.nombre_agencia' },
        //{ text: 'Imagen', value: 'image', sortable: false }, 
        { text: 'Visible', value: 'estado', sortable: false }, 
      ],
      sedes: [],
      form: {
        nombre_sede: '',
        distrito_sede: ''
      },
      itemSede: {},
    }),
    watch: {
      dialogVisible (val) {
        val || this.closeVisible()
      },
      form: {
        handler() {
          this.search()
        },
        deep: true,
      },
    },
    mounted() {
      this.getSedes(this.form);
    },
    methods: {
      getSedes(request){
        axios
          .post("https://api-watu.herokuapp.com/admin/agencias/sedes", request)
          .then((result) => {
            console.log("result", result);
            this.sedes = result.data.sedes;
          });
      },
      openDialogVisible(item) {
        this.dialogVisible = true;
        this.itemSede = item;
      },

      changeVisible () {
        console.log("item.id => ", this.itemSede.id);
        axios
          .put("https://api-watu.herokuapp.com/admin/agencias/sede/" + this.itemSede.id)
          .then((result) => {
            console.log("result", result);
          })
          .finally(() => {
            this.getSedes(this.form);
          });
        this.closeVisible()
      },
      closeVisible () {
        this.dialogVisible = false
      },
      clearFilter() {
        this.form.nombre_sede= ''
        this.form.distrito_sede=''
        this.search()
      },
      search(){
        this.getSedes(this.form);
      },
      getCheckboxValue(estado) {
        if(estado === 1){
          return true;
        }
        else if(estado === 0 || estado === 2){
          return false;
        }
        else{
          return false;
        } 
      },

    },
};
</script>

<style></style>
