<template>
  <div class="order_new_customer">
    <div class="card customer_search">
      <i class="ti-search"></i>
      <input type="text" placeholder="Buscar cliente..." v-model="searchCustomer">
    </div>
    <ul class="customer_list" v-if="customersDataFilterable.length || searchCustomer">
      <li
        class="customer_item"
        v-for="customer in customersDataFilterable"
        v-on:click="addCustomer(customer)">
        <div class="content">
          <p class="customer_name">{{ customer.ntercero | capitalize }} {{ customer.napellido | capitalize }}</p>
          <p class="customer_id">{{ customer.init }}</p>
        </div>
      </li>
    </ul>
    <ul class="customer_list" v-else>
      <li
        class="customer_item"
        v-for="customer in customersData"
        v-on:click="addCustomer(customer)">
        <div class="content">
          <p class="customer_name">{{ customer.ntercero | capitalize }} {{ customer.napellido | capitalize }}</p>
          <p class="customer_id">CC {{ customer.init }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.state.order.oprdata.datosprincipales.initvendedor = this.$store.state.userData.phone_number;
    this.$store.commit('ADD_BACK', { path: '/' });
  },
  data() {
    return {
      searchCustomer: '',
      customersDataFilterable: [],
      options: {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "ntercero",
          "napellido"
        ]
      },
    };
  },
  computed: {
    customersData() {
      return this.$store.state.customer.customersData;
    },
  },
  watch: {
    searchCustomer(value) {
      this.customersDataFilterable = this.$store.state .customer.customersData.filter(customer => customer.init.includes(value));
      this.$search(value, this.customersData, this.options).then(response => {
        this.customersDataFilterable.push(...response)
      })
    },
  },
  methods: {
    addCustomer(customer) {
      this.$store.commit('ADD_BACK', this.$route);
      this.$store.dispatch('ADD_ORDERCUSTOMER', customer);
      this.$router.push('/new/products');
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

<style scoped>
  .order_new_customer{
    width: 100%;
    overflow: auto;
  }
  .card.customer_search{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    margin-top: 10px;
  }
  .customer_search input{
    width: 100%;
    height: 25px;
    padding: 10px 35px;
    border-style: none;
  }
  .customer_search i{
    position: absolute;
    margin-left: 10px;
  }
  .customer_search i.ti-menu{
    right: 0;
    margin-left: 0;
    margin-right: 10px;
  }
  .customer_list{
    width: 100%;
    height: calc(100% - 85px);
    flex-direction: column;
    margin-top: 20px;
    overflow: auto;
  }
  .customer_item{
    flex: none;
    display: flex;
    padding: 5px 10px;
    margin: 5px 0;
  }
  .customer_name{
    font-weight: 600;
  }
  .customer_id{
    font-size: 14px;
    color: rgba(0,0,0,0.7);
  }
  .customer_item .content{
    text-align: left;
  }
</style>
