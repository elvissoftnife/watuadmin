<template>
  <v-card style="height: 100%">
    <NavAdmin></NavAdmin>
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
    >
      <v-container style="margin-top:150px">
        <router-view></router-view>
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
import NavAdmin from "./NavAdmin.vue";

export default {
  components: {
    NavAdmin,
  },
};
</script>

<style></style>
