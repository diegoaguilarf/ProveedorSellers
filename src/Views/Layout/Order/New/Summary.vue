<template>
  <div class="summary">
    <div class="card order_area">
      <ul class="">
        <li>
          <label for="">Tipo doc:</label>
          <p>Pedido de un cliente</p>
        </li>
        <li>
          <label for="">Fecha do:</label>
          <!-- <p>{{ orderData.datosprincipales.finicio }}</p> -->
        </li>
        <li>
          <label for="">Estado:</label>
          <p>Sin Procesar</p>
        </li>
      </ul>
    </div>
    <div class="card order_area">
      <ul>
        <li>
          <label for="">Cliente:</label>
          <p>Diego Alejadnro Aguilar Fierro</p>
        </li>
        <li>
          <label for="">Vendedor:</label>
          <p>Jorge Aguilar</p>
        </li>
        <li>
          <label for="">L. precios:</label>
          <p>Lista de precios 2</p>
        </li>
      </ul>
    </div>
    <div class="card order_products">
      <header>
        Lista de productos
      </header>
      <ul>
        <OrderProduct :product="product" v-for="product in orderData.oprdata.listaproductos" />
      </ul>
    </div>
    <div class="card order_area">
      <ul>
        <li>
          <label for="">Subtotal:</label>
          <p>{{ orderData.oprdata.liquidacion.parcial }}</p>
        </li>
        <li>
          <label for="">IVA:</label>
          <p>{{ orderData.oprdata.liquidacion.iva }}</p>
        </li>
        <li>
          <label for="">Total</label>
          <p>{{ orderData.oprdata.liquidacion.total }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import OrderProduct from '../../../../UIComponents/OrderProduct.vue';

export default {
  components: { OrderProduct },
  created() {
    if (!this.$store.state.order.oprdata.datosprincipales.init) {
      this.$router.push('/new/customer');
    }
    this.$store.commit('ADD_BACK', { path: '/new/products' });
  },
  computed: {
    orderData() {
      return this.$store.state.order;
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
  .summary{
    width: 100%;
    height: calc(100% - 20px) !important;
    margin-top: 20px;
    display: grid !important;
    justify-content: center;
    align-content: start;
    align-items: initial;
    grid-template-columns: 95%;
    grid-row-gap: 10px;
    overflow: auto;
    box-sizing: border-box;
    padding: 20px 0 10px 0;
  }
  .card{
    max-width: 450px;
    width: 100%;
    height: initial;
  }
  .order_area ul{
    width: 100%;
  }
  .order_area ul li{
    display: flex;
    padding: 15px 5px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .order_area ul li label{
    font-weight: 600;
    margin-right: 5px;
  }
  .order_products{
    flex-direction: column;
  }
  .order_products header{
    padding: 10px 5px;
    text-align: left;
    background-color: #EEE;
  }
  .order_products ul{
    width: 100%;
  }
</style>
