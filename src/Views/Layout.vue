<template>
  <div :class="{wrapper: true, 'slide-sidebar': sidebarState}">
    <Sidebar/>
    <ProductPreview v-if="productPreviewData"/>
    <SummaryOrder v-if="$route.path === '/new/products'"/>
    <SaveOrder v-if="$route.path === '/new/summary'"/>
    <div class="Layout">
      <Header />
      <div class="Layout_view">
        <transition :name="transitionName">
          <router-view/>
        </transition>
      </div>
      <Tabs />
    </div>
  </div>
</template>

<script>
import Tabs from '../UIComponents/Tabs.vue';
import Header from '../UIComponents/Header.vue';
import Sidebar from '../UIComponents/Sidebar.vue';
import ProductPreview from '../UIComponents/ProductPreview.vue';
import SummaryOrder from '../UIComponents/SummaryOrder.vue';
import SaveOrder from '../UIComponents/SaveOrder.vue';

export default {
  components: { Sidebar, Header, Tabs, ProductPreview, SummaryOrder, SaveOrder },
  created() {
    this.$store.dispatch('GET_PRODUCTS');
    this.$store.dispatch('GET_CUSTOMERS');
    this.$store.dispatch('GET_ORDERS');
  },
  mounted() {
    this.getHeight();
  },
  data() {
    return {
      transitionName: 'slide-right',
    };
  },
  computed: {
    sidebarState() {
      return this.$store.state.sidebarState;
    },
    productPreviewData() {
      return this.$store.state.product.productPreviewData;
    },
  },
  watch: {
    $route(to, from) {
      this.transitionName = to.params.id < from.params.id ? 'slide-right' : 'slide-left';
    },
  },
  methods: {
    getHeight() {
      const height = document.body.clientHeight - 102;
      document.querySelector('.Layout_view').style.height = `${height}px`;
    },
  },
};
</script>

<style scoped>
  .wrapper{
    width: calc(100% + 100vw - 150px);
    position: relative;
    /* left: calc(-100vw + 150px); */
    display: flex;
    flex: none;
    overflow: hidden;
    transition: .3s;
  }
  .wrapper.slide-sidebar{
    left: 0;
  }
  .Layout {
    width: 100vw;
    height: 100vh;
    flex: none;
    overflow: hidden;
    transform: scale(1);
    margin-left: 0;
    box-shadow: 0 0 0px 0px rgba(0,0,0,0.0);
    background-color: #FFF;
    transition: .3s;
  }
  .wrapper.slide-sidebar .Layout{
    transform: scale(.7);
    margin-left: -18vw;
    box-shadow: 0 0 12px 1px rgba(0,0,0,0.1);
    transition: .3s;
  }
  .Layout_view{
    position: relative;
    overflow: hidden;
    background-color: #fafafa;
  }
  .Layout_view > div{
    position: absolute;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .slide-right-enter-active {
    transition: all .3s ease;
  }
  .slide-right-leave-active {
    transition: all .3s ease;
  }
  .slide-right-enter {
    transform: translateX(-100%);
  }
  .slide-right-leave-to {
    transform: translateX(100%);
  }

  .slide-left-enter-active {
    transition: all .3s ease;
  }
  .slide-left-leave-active {
    transition: all .3s ease;
  }
  .slide-left-enter {
    transform: translateX(100%);
  }
  .slide-left-leave-to {
    transform: translateX(-100%);
  }
</style>
