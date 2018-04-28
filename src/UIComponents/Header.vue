<template>
  <header>
    <i class="ti-arrow-left" v-if="thereIsABack" @click="handleBack"></i>
    <span v-else></span>
    <figure>
      <img src="../assets/logo.png" alt="El Proveedor">
    </figure>
    <span></span>
  </header>
</template>

<script>
export default {
  computed: {
    thereIsABack() {
      return this.$store.state.thereIsABack;
    },
  },
  methods: {
    handleSidebar() {
      this.$store.commit('HANDLE_SIDEBAR');
    },
    handleBack() {
      this.$router.push(this.thereIsABack.path);
      this.$store.state.thereIsABack = null;
    },
  },
};
</script>

<style scoped>
  header{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid rgba(0,0,0,.0975);
  }
  header i{
    font-size: 20px;
  }
  header figure img{
    max-width: 200px;
    max-height: 30px;
  }
</style>
