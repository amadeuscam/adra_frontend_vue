import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Detail from '../views/Detail.vue'
import store from '../store'

Vue.use(VueRouter)



const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    props: true,
   
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.logginIn) next({ name: 'Login' })
  else next()
})

export default router
