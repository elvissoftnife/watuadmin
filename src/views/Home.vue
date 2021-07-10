<template>
  <div>
    <v-row>
      <v-col>
        <GraficoUno></GraficoUno>
      </v-col>
      <v-col>
        <GraficoDos></GraficoDos>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <GraficoUno></GraficoUno>
      </v-col>
      <v-col>
        <GraficoDos></GraficoDos>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <GraficoUno></GraficoUno>
      </v-col>
      <v-col>
        <GraficoDos></GraficoDos>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GraficoUno from "../modules/admin/home/GraficoUno.vue";
import GraficoDos from "../modules/admin/home/GraficoDos.vue";

export default {
  components: {
    GraficoUno,
    GraficoDos,
  },
};
</script>

<style scoped></style>
