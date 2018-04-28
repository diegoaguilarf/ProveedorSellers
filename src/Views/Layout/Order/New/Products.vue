<template>
  <div class="products">
    <div class="card products_search">
      <i class="ti-search"></i>
      <input type="text" placeholder="Buscar Productos..." v-model="searchProduct">
    </div>
    <ul class="products_list" v-if="productsDataFilterable.length || searchProduct">
      <ProductCard
        v-for="product in productsDataFilterable"
        :data="product"
        v-on:click.native="showProductPreview(product)"/>
    </ul>
    <ul class="products_list" v-else>
      <ProductCard
        v-for="product in productsData"
        :data="product"
        v-on:click.native="showProductPreview(product)"/>
    </ul>
  </div>
</template>

<script>
import ProductCard from '@/UIComponents/ProductCard';

export default {
  components: { ProductCard },
  created() {
    if (!this.$store.state.order.oprdata.datosprincipales.init) {
      this.$router.push('/new/customer');
    }
    this.$store.commit('ADD_BACK', { path: '/new/customer' });
  },
  data() {
    return {
      searchProduct: '',
      productsDataFilterable: [],
      options: {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "nrecurso",
        ]
      },
    };
  },
  computed: {
    productsData() {
      return this.$store.state.product.productsData;
    },
  },
  watch: {
    searchProduct(value) {
      this.productsDataFilterable = this.productsData.filter(product => product.irecurso.includes(value));
      this.$search(value, this.productsData, this.options).then(response => {
        this.productsDataFilterable.push(...response)
      })
    }
  },
  methods: {
    showProductPreview(product) {
      this.$store.state.product.productPreviewData = product;
    },
  },
};
</script>

<style lang="css">
  .products{
    width: 100%;
  }
  .card.products_search{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    margin-top: 10px;
  }
  .products_search input{
    width: 100%;
    height: 25px;
    padding: 10px 35px;
    border-style: none;
  }
  .products_search i{
    position: absolute;
    margin-left: 10px;
  }
  .products_search i.ti-menu{
    right: 0;
    margin-left: 0;
    margin-right: 10px;
  }
  .products_list{
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    overflow: auto;
  }
</style>
