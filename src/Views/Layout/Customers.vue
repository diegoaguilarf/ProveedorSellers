<template>
  <div class="Customers">
    <h1>Clientes</h1>
    <ul>
      <li v-for="customer in customersData">{{ customer.ntercero }} {{ customer.napellido }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Customers',
  created() {
    this.$store.commit('GET_CUSTOMERS');
  },
  computed: {
    customersData() {
      return this.$store.state.customer.customersData;
    },
  },
};
</script>

<style lang="css">
  .Customers{
    width: 100%;
  }
</style>
