<template>
  <v-card>
    <NavAdmin></NavAdmin>
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      max-height="800"
    >
      <v-container style="min-height: 1000px;margin-top:150px">
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
