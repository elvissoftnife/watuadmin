<template>
  <v-app-bar
    absolute
    color="#fcb69f"
    dark
    shrink-on-scroll
    src="https://picsum.photos/1920/1080?random"
    scroll-target="#scrolling-techniques-2"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-app-bar-title>Title</v-app-bar-title>

    <v-spacer></v-spacer>

    <div class="item-nav" @click="redirect('/agencias')">Agencias</div>
    <div class="item-nav" @click="redirect('/reportepagosagencias')">
      Reporte Pagos
    </div>
    <div class="item-nav" @click="redirect('/home')">Cerrar Sesion</div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    redirect(url) {
      this.$router.push(url).catch(() => {});
    },
  },
};
</script>

<style scoped>
.item-nav {
  font-size: 20px;
  margin-left: 20px;
  padding-top: 10px;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
