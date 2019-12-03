<template>
  <div class="order_all">
    <div class="card order_new">
      <p>Crear un nuevo pedido</p>
      <router-link :to="{ name: 'OrderNewCustomer' }" class="action order_new-action"><p>Nuevo</p><i class="ti-save"></i></router-link>
    </div>
    <ul class="order_list">
      <li class="order_item" v-for="order in orders" v-on:click="getOrder(order)">
        <div class="order_item_customer">
          <p class="name">{{ order.snumsop }}</p>
          <p>{{ order.ntercero | capitalize }}</p>
        </div>
        <div class="order_item_right">
          <!-- <span class="order_item_state">{{ order.state.label }}</span> -->
          <p class="order_item_total">{{ order.fsoport }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderAll',
  data() {
    return {
    };
  },
  computed: {
    orders() {
      return this.$store.state.order.ordersData;
    },
  },
  methods: {
    uploadPhoto() {
      let message = ''
      firebase.storage().ref().putString(message).then(function(snapshot) {
        console.log('Uploaded a raw string!');
      });
    },
    getOrder(order) {
      this.$store.dispatch('GET_ORDER', order.inumoper);
      this.$router.push('/order');
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
  .order_all{
    width: 100%;
  }
  .card.order_new{
    height: 70px;
    align-items: center;
    margin-top: 40px;
  }
  .card.order_new p{
    display: flex;
    flex: 1;
    text-align: center;
    justify-content: center;
  }
  .order_new-action{
    /* width: 50px; */
    height: 50px;
    padding: 0 10px;
    margin: 0 10px;
    background-color: #00C853;
  }
  .order_new-action p{
    font-weight: 600;
    margin-right: 10px;
    color: #FFF;
  }
  .order_new-action i{
    color: #FFF;
    font-size: 22px;
  }
  .order_list{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    margin-top: 20px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .order_item{
    width: 90%;
    flex: none;
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    padding: 5px;
    border-radius: 2px;
    box-shadow: 0 1px 0 0 #DBDBDB;
    background-color: #FFF;
  }
  .order_item_customer{
    text-align: left;
  }
  .order_item_customer .name{
    font-weight: 600;
  }
  .order_item_right{
    display: flex;
    flex-direction: column;
    text-align: right;
  }
  .order_item_state{
    border: 1px solid #67c23a;
    padding: 4px;
    border-radius: 4px;
    margin-bottom: 3px;
    background-color: rgba(103,194,58,.1);
    color: #67c23a;
  }
  .order_item_total{
  }
</style>
