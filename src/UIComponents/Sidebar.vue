<template>
  <!-- <v-touch v-on:swipeleft="onSwipeLeft">
    <div class="Sidebar">
      <div class="Sidebar_profile">
        <img :src="userData.photo_url" :alt="userData.name">
        <div class="Sidebar_profile_info">
          <h2>¡Hola, soy {{ userData.name }}!</h2>
        </div>
      </div>
      <ul class="menu_list" v-on:click="onSwipeLeft">
        <li class="menu_item"><router-link to="/"><i class="ti-home"></i>Inicio</router-link></li>
        <li class="menu_item"><router-link to="/setting"><i class="ti-settings"></i>Ajustes</router-link></li>
        <li class="menu_item" @click="logout"><i class="ti-power-off"></i>Salir</li>
      </ul>
    </div>
  </v-touch> -->
</template>

<script>
export default {
  computed: {
    sidebarState() {
      return this.$store.state.sidebarState;
    },
    userData() {
      return this.$store.state.userData;
    },
  },
  methods: {
    onSwipeLeft() {
      this.$store.commit('HANDLE_SIDEBAR');
    },
    logout() {
      this.$store.commit('LOGOUT');
    },
  },
};
</script>

<style scoped>
  .Sidebar{
    width: calc(100vw - 150px);
    height: 100vh;
  }
  .Sidebar_profile{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
  }
  .Sidebar_profile img{
    width: 140px;
    height: 140px;
    border-radius: 50%;
    margin-left: 10px;
    object-fit: cover;

  }
  .Sidebar_profile h2{
    font-size: 25px;
    text-align: left;
    font-weight: normal;
    color: #FFF;
    margin-left: 10px;
  }
  .Sidebar_profile_info{
    flex: 1;
  }
  .menu_list{
    width: 100%;
    display: grid;
    grid-template: repeat(3, 55px) / 1fr;
  }
  .menu_item{
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 18px;
  }
  .menu_item, .menu_item a{
    color: #FFF;
  }
  .menu_item i{
    color: #FFF;
    margin-right: 10px;
  }
  @media(max-width: 400px) {
    .Sidebar_profile img{
      width: 100px;
    }
    .Sidebar_profile h2{
      font-size: 20px;
    }
    .menu_item{
      font-size: 15px;
    }
  }
</style>
