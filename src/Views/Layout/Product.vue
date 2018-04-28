<template>
  <div class="Products">
    <h1>Productos</h1>
    <ul class="Products_list">
      <div class="Products_item" v-for="product in productsData">
        <!-- <img :src="product.foto" alt=""> -->
        <p>{{ product.nrecurso }}</p>
      </div>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Product',
  mounted() {
    this.$store.commit('GET_PRODUCTS');
  },
  computed: {
    productsData() {
      return this.$store.state.product.productsData;
    },
  },
};
</script>

<style lang="css">
  .Products{
    width: 100%;
  }
  .Products_list{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .Products_item{
    max-width: 300px;
    max-height: 300px;
    width: calc(50% - 20px);
    height: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }
  .Products_item img{
    max-width: 90%;
    max-height: 90%;
  }
</style>
