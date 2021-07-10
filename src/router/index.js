import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";

import ContainerAdmin from "../common/components/ContainerAdmin.vue";
import Home from "../views/Home.vue";
import Agencias from "../views/Agencias.vue";
import Inscritos from "../views/Inscritos.vue";
import Programas from "../views/Programas.vue";
import ReportePagosAgencias from "../views/ReportePagosAgencias.vue";
import ReportePagosUsuarios from "../views/ReportePagosUsuarios.vue";
import Sedes from "../views/Sedes.vue";
import Usuarios from "../views/Usuarios.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "",
    name: "container",
    component: ContainerAdmin,
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
      },
      {
        path: "agencias",
        name: "agencias",
        component: Agencias,
      },
      {
        path: "inscritos",
        name: "inscritos",
        component: Inscritos,
      },
      {
        path: "programas",
        name: "programas",
        component: Programas,
      },
      {
        path: "reportepagosagencias",
        name: "reportepagosagencias",
        component: ReportePagosAgencias,
      },
      {
        path: "reportepagosusuarios",
        name: "reportepagosusuarios",
        component: ReportePagosUsuarios,
      },
      {
        path: "sedes",
        name: "sedes",
        component: Sedes,
      },
      {
        path: "usuarios",
        name: "usuarios",
        component: Usuarios,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
