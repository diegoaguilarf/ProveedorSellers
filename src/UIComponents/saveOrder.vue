<template>
  <div class="save_order">
    <button class="action show_save-action" @click="saveOrder">
      <p>Finalizar compra</p>
      <p>Finalizar</p>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    saveOrder() {
      this.$store.dispatch('SAVE_ORDER');
      this.$router.push('/')
    },
  },
};
</script>

<style scoped>
  .save_order{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #45d482;
    z-index: 2;
  }
  .save_order_content{
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .customer_name, .total{
    color: #FFF;
  }
  .total{
    font-weight: 600;
    font-size: 17px;
  }
  .show_save-action{
    padding: 10px 35px;
    background-color: #FFF;
  }
  .show_save-action p{
    display: none;
    color: #45d482;
    font-size: 16px;
  }
  .show_save-action p:nth-child(1){
    display: flex;
  }
  @media(max-width: 350px){
    .show_save-action p:nth-child(1){
      display: none;
    }
    .show_save-action p:nth-child(2){
      display: flex;
    }
  };
</style>
