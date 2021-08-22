import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    beneficiarios: [],
    token: localStorage.getItem('token') || '',
    page: 1,
    page_url: 1,
    buscar: false,
    search_keyword: '',
    load: false,
    user_data: {}
  },
  mutations: {
    add_beneficiarios(state, payload) {
      state.beneficiarios = payload.data
    },
    updateToken(state, payload) {
      state.token = payload
    },
    destroyToken(state, payload) {
      state.token = ''
    },
    incrementPage(state, payload) {
      state.page = payload
    },
    addUserInfo(state, payload) {
      state.user_data = payload
    }
  },
  actions: {
    async get_beneficiarios({
      commit,
      state
    }) {
      let vm = this
      console.log(state.page);
      state.load = false

      axios.defaults.adapter = require('axios/lib/adapters/http')
      let url = null
      let isnum = /^\d+$/.test(state.search_keyword);
      if (isnum) {
        url = `personas/?numero_adra=${state.search_keyword}&page=${state.page}`
      } else {
        url = `personas/?nombre_apellido=${state.search_keyword}&page=${state.page}`
      }



      const splet_url = url.split("&page=")
      state.page_url = parseInt(splet_url[1])

      if (state.buscar) {

        await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          }
        }).then((result) => {
          console.log(result.data);
          state.load = true
          state.records = result.data.count


          let data = {
            "data": result.data.results
          }
          state.beneficiarios = []
          commit('add_beneficiarios', data)


        })



      } else {

        await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          }
        }).then((result) => {
          console.log(result.data);
          state.records = result.data.count
          state.load = true
          let data = {
            "data": result.data.results
          }
          state.beneficiarios = []
          commit('add_beneficiarios', data)

        })
      }




    },
    // async get_beneficiario({
    //   commit,
    //   state
    // }, val) {

    //   axios.defaults.adapter = require('axios/lib/adapters/http')
    //   let url = null
    //   let isnum = /^\d+$/.test(val);
    //   if (isnum) {
    //     console.log("223");
    //     url = `http://localhost:8000/api/personas/?numero_adra=${val}`
    //   } else {
    //     console.log("2222223");
    //     url = `http://localhost:8000/api/personas/?nombre_apellido=${val}`
    //   }

    //   await axios.get(url, {
    //     headers: {
    //       'Authorization': `Bearer ${state.token}`,
    //     }
    //   }).then((result) => {
    //     console.log(result.data);
    //     // console.log(state.page);
    //     // if (state.records == 0) {
    //     //   state.records = parseInt(result.data.count)
    //     //   state.per_page = result.data.results.length
    //     // }



    //     // let data = {
    //     //   "data": result.data.results
    //     // }
    //     // commit('add_beneficiarios', data)
    //     // console.log(state.records);
    //     // console.log(state.per_page);
    //   })
    // },
    async userLogin({
      commit,
      state,
      dispatch
    }, userCredenciales) {
      return await new Promise((resolve, reject) => {
        axios.post("token/", {
          username: userCredenciales.username,
          password: userCredenciales.password

        }).then((result) => {
          console.log(result.data);

          var base64Url = result.data.access.split('.')[1];
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          let token_data = JSON.parse(jsonPayload)
          console.log(token_data.user_id);
          let dt = {
            user_id: token_data.user_id,
            token: result.data.access
          }

          // return JSON.parse(jsonPayload);

          const token = result.data.access
          commit('updateToken', result.data.access)
          localStorage.setItem('token', token)
          dispatch("get_user_data", dt);
          axios.defaults.headers.common['Authorization'] = token
          resolve(result)

        }).catch(err => {
          console.log("please login");
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    userLogout({
      commit,
      getters
    }) {
      if (getters.logginIn) {
        return new Promise((resolve, reject) => {
          commit('destroyToken')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })

      }
    },
    get_user_data({
      state,
      commit
    }, data) {

      axios.get(`users/${data.user_id}/`, {
        headers: {
          'Authorization': `Bearer ${state.token? state.token : data.token}`,
        }
      }).then((result) => {
        console.log( result.data);
        commit('addUserInfo', result.data)
      })

    },
    paginate_control({
      commit,
      state,
      dispatch
    }, page) {

      commit("incrementPage", page);
      dispatch("get_beneficiarios");



    },
    filteredDataByNumeroAdra({
      state
    }, numero_adra) {
      return state.beneficiarios.filter((el) => el.numero_adra == numero_adra)


    },



  },
  getters: {
    logginIn(state) {
      return state.token !== ''
    },
    get_beneficario_data: (state) => (id) => {
      return state.beneficiarios.find(todo => todo.id === id)
    },
    get_user_data: (state) => {
      return state.user_data
    },



  },
  modules: {}
})
export default store