<template>
  <v-app-bar
    fixed
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

    <div class="logo">Watu Admin</div>

    <v-spacer></v-spacer>

    <div class="item-nav" @click="redirect('/agencias')">Agencias</div>
    <div class="item-nav" @click="redirect('/sedes')">Sedes</div>
    <div class="item-nav" @click="redirect('/programas')">Programas</div>
    <div class="item-nav" @click="redirect('/usuarios')">
      Usuarios
    </div>
    <div class="item-nav" @click="redirect('/')">Cerrar Sesion</div>
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

.logo {
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
