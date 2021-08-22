<template>
  <div id="app">
    <div
      class="sidebar"
      :style="[
        !this.$store.getters.logginIn
          ? { display: 'none' }
          : { display: 'block' },
      ]"
    >
      <div class="logo-details">
        <!-- <i class="bx bxl-c-plus-plus icon"></i> -->
        <div class="logo_name">Adra Torrejon</div>
        <i class="bx bx-menu" id="btn"></i>
      </div>
      <ul class="nav-list">
        <li>
          <i class="bx bx-search"></i>
          <input
            type="text"
            v-model="buscar_ben"
            v-on:keyup="validateEmailAddress"
            placeholder="Search..."
          />
          <span class="tooltip">Search</span>
        </li>
        <li>
          <router-link to="/">
            <i class="bx bx-grid-alt"></i>
            <span class="links_name">Inicio</span>
          </router-link>

          <span class="tooltip">Inicio</span>
        </li>
        <li>
          <router-link to="/login">
            <i class="bx bx-user"></i>
            <span class="links_name">Login</span></router-link
          >

          <span class="tooltip">User</span>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-chat"></i>
            <span class="links_name">Messages</span>
          </a>
          <span class="tooltip">Messages</span>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-pie-chart-alt-2"></i>
            <span class="links_name">Analytics</span>
          </a>
          <span class="tooltip">Analytics</span>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-folder"></i>
            <span class="links_name">File Manager</span>
          </a>
          <span class="tooltip">Files</span>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-cart-alt"></i>
            <span class="links_name">Order</span>
          </a>
          <span class="tooltip">Order</span>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-heart"></i>
            <span class="links_name">Saved</span>
          </a>
          <span class="tooltip">Saved</span>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-cog"></i>
            <span class="links_name">Setting</span>
          </a>
          <span class="tooltip">Setting</span>
        </li>
        <li class="profile">
          <div class="profile-details">
            <!--<img src="profile.jpg" alt="profileImg">-->
            <div class="name_job">
              <div class="name">
                {{ this.$store.getters.get_user_data.username }}
              </div>
              <div class="job">{{ this.$store.getters.get_user_data.is_staff ? 'Superusuario':'Normal' }} </div>
            </div>
            <router-link to="/logout">
              <i class="bx bx-power-off" id="log_out"></i>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
    <section class="home-section" :style="login_style">
      <div class="container-fluid" :style="what_padding">
        <router-view />
      </div>
    </section>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      buscar_ben: "",
    };
  },
  watch: {
    buscar_ben(val) {
      this.$store.state.buscar = true;
      this.$store.state.search_keyword = this.buscar_ben;
    },
  },
  computed: {
    login_style() {
      if (!this.$store.getters.logginIn) {
        return { left: "0", width: "100%" };
      } else {
        return { left: "78px", width: "calc(100% - 78px)" };
      }
    },
    what_padding() {
      if (!this.$store.getters.logginIn) {
        return { padding: "0" };
      } else {
        return;
      }
    },
  },

  created: function () {
    axios.interceptors.response.use(
      (response) => {
        // Return a successful response back to the calling service
        return response;
      },
      (error) => {
        // Return any error which is not due to authentication back to the calling service
        if (error.response.status == 401) {
          this.$store.dispatch("userLogout").then(() => {
            this.$router.push({ name: "Login" });
          });
        } else {
          // window.location.href = '/operator-portal/login';
          // return false;
        }
      }
    );
  },
  mounted() {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector(".bx-search");

    closeBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      this.menuBtnChange(); //calling the function(optional)
    });

    searchBtn.addEventListener("click", () => {
      // Sidebar open when you click on the search icon
      sidebar.classList.toggle("open");
      this.menuBtnChange(); //calling the function(optional)
    });

    // following are the code to change sidebar button(optional)
  },
  methods: {
    validateEmailAddress(e) {
      console.log("estoyyyyyy");

      if (e.keyCode === 13) {
        let sidebar = document.querySelector(".sidebar");

        sidebar.classList.toggle("open");
        this.menuBtnChange(); //calling the function(optional)

        console.log("pulsado enter");
        this.$store.dispatch("paginate_control", 1);
        // if (this.$store.state.load) {
        //   return this.$store.state.records;
        // }
      } 
    },
    menuBtnChange() {
      let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the icons class
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the icons class
      }
    },
  },
};
</script>



<style>
@import "https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap";
.nav-list {
  padding: 0;
}

* {
  /* margin: 0;
  padding: 0; */
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 78px;
  background: #11101d;
  padding: 6px 14px;
  z-index: 99;
  transition: all 0.5s ease;
}
.sidebar .logo-details {
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}
.sidebar .logo-details .icon {
  opacity: 0;
  transition: all 0.5s ease;
}
.sidebar .logo-details .logo_name {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  opacity: 0;
  transition: all 0.5s ease;
}
.sidebar .logo-details #btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}
.sidebar i {
  color: #fff;
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}
.sidebar .nav-list {
  margin-top: 20px;
  height: 100%;
}
.sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
}
.sidebar li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 3;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  pointer-events: none;
  transition: 0s;
}
.sidebar li:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}
.sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: #11101d;
}
.sidebar li a:hover {
  background: #fff;
}
.sidebar li a:hover .links_name {
  transition: all 0.5s ease;
  color: #11101d;
}
.sidebar li a:hover i {
  transition: all 0.5s ease;
  color: #11101d;
}
.sidebar li a .links_name {
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}
.sidebar li i {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
}
.sidebar li .profile-details {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.sidebar li img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}
.sidebar input {
  font-size: 15px;
  color: #fff;
  font-weight: 400;
  outline: none;
  height: 50px;
  width: 100%;
  width: 50px;
  border: none;
  border-radius: 12px;
  transition: all 0.5s ease;
  background: #1d1b31;
}
.sidebar .bx-search {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 22px;
  background: #1d1b31;
  color: #fff;
}
.sidebar .bx-search:hover {
  background: #fff;
  color: #11101d;
}
.sidebar li.profile {
  position: fixed;
  height: 60px;
  width: 78px;
  left: 0;
  bottom: -8px;
  padding: 10px 14px;
  background: #1d1b31;
  transition: all 0.5s ease;
  overflow: hidden;
}
.sidebar li.profile .name {
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
}
.sidebar li.profile .job {
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
  font-size: 12px;
}
.sidebar .profile #log_out {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: #1d1b31;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-radius: 0px;
  transition: all 0.5s ease;
}

.sidebar.open {
  width: 250px;
}
.sidebar.open .logo-details .icon {
  opacity: 1;
}
.sidebar.open .logo-details .logo_name {
  opacity: 1;
}
.sidebar.open .logo-details #btn {
  text-align: right;
}
.sidebar.open li .tooltip {
  display: none;
}
.sidebar.open li a .links_name {
  opacity: 1;
  pointer-events: auto;
}
.sidebar.open input {
  padding: 0 20px 0 50px;
  width: 100%;
}
.sidebar.open .bx-search:hover {
  background: #1d1b31;
  color: #fff;
}
.sidebar.open li.profile {
  width: 250px;
}
.sidebar.open .profile #log_out {
  width: 50px;
  background: none;
}
.sidebar.open ~ .home-section {
  left: 250px;
  width: calc(100% - 250px);
}

.home-section {
  position: relative;
  background: #fff;
  min-height: 100vh;
  top: 0;
  left: 78px;
  width: calc(100% - 78px);
  transition: all 0.5s ease;
  z-index: 2;
}
.home-section .text {
  display: inline-block;
  color: #11101d;
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}
</style>
