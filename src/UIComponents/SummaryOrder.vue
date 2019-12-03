<template>
  <div class="summary_order">
    <button class="action show_summary-action" @click="goSummary">
      <p>Ver resumen</p>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    orderData() {
      return this.$store.state.order.customerOrderData;
    },
    liquidacion() {
      return this.$store.state.order.oprdata.liquidacion;
    },
  },
  methods: {
    goSummary() {
      this.$store.commit('ADD_BACK', this.$route);
      this.$router.push({ name: 'OrderNewSummary' });
    },
  },
  filters: {
    capitalize(value) {
  		if (value) {
  			value = value.toLowerCase();
  				return value.replace(/^\w|\s\w/g, l => l.toUpperCase());
  		}
  	},
  },
};
</script>

<style lang="css">
  .summary_order{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #45d482;
    z-index: 2;
  }
  .summary_order_content{
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .summary_customer_name, .total{
    color: #FFF;
  }
  .total{
    font-weight: 600;
    font-size: 17px;
  }
  .show_summary-action{
    padding: 10px 35px;
    background-color: #FFF;
  }
  .show_summary-action p{
    display: none;
    color: #45d482;
    font-size: 16px;
  }
  .show_summary-action p:nth-child(1){
    display: flex;
  }
</style>
