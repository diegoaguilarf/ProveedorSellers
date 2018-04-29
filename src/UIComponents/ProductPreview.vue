<template>
  <div class="card product_preview">
    <span class="close" @click="closePreview"><i class="ti-close"></i></span>
    <div class="product_preview_wrapper">
      <div class="product_preview_photo">
        <img :src="photo">
      </div>
      <div class="product_preview_content">
        <h3 class="product_preview_name">{{ data.nrecurso }}</h3>
        <p class="product_preview_desc">Galleta recubierta de chocolate x 20 und</p>
        <p class="product_preview_price">{{ data.mprecio }}</p><p>{{stock}} unidades disponibles</p>
      </div>
    </div>
    <div class="product_preview_actions">
      <QuantityCount v-model="quantity" :max="stock"/>
      <button class="action add_product-action" v-if="stock" @click="addProduct">Agregar</button>
      <button class="action sold_out_product-action" v-else>Agotado</button>
    </div>
  </div>
</template>

<script>
import QuantityCount from './QuantityCount.vue';
import axios from 'axios';

export default {
  components: { QuantityCount },
  created() {
    this.$store.commit('GET_PRODUCT');
    this.getStock();
  },
  data() {
    return {
      quantity: 1,
      stock: 0,
    };
  },
  computed: {
    data() {
      return this.$store.state.product.productPreviewData;
    },
    photo() {
      const objPhoto = JSON.stringify({
        irecurso: this.data.irecurso,
        codimg: '1',
      });
      return `http://186.115.207.187:9000/datasnap/rest/TCatElemInv/GetFotoElemInv/${objPhoto}/2B9AAB51E8/2000`;
    },
  },
  methods: {
    closePreview() {
      this.$store.state.product.productPreviewData = null;
    },
    getStock() {
      axios.get(`http://186.115.207.187:9000/datasnap/rest/TInventarios/GetSaldoFisicoProductoEnBodegas/{"irecurso": ${this.data.irecurso}}/2B9AAB51E8/2000`).then((response) => {
        if (response.data.result[0].respuesta.datos[0]) {
          this.stock = response.data.result[0].respuesta.datos[0].qproducto;
        }
      });
    },
    addProduct() {
      this.data.qrecurso = this.quantity;
      this.data.mvrtotal = (this.quantity * this.data.mprecio).toString();
      this.data.iinventario = 1; // Inventario 1 es bodega
      this.$store.dispatch('ADD_ORDERPRODUCT', this.data);
      this.closePreview();
    },
  },
};
</script>

<style>
.product_preview{
  position: fixed;
  top: 10px;
  left: 10px;
  width: calc(100% - 20px);
  height: calc(100vh - 20px);
  flex-direction: column;
  justify-content: space-between;
  background-color: #FFF;
  z-index: 3;
  box-shadow: 0 0 0 20px rgba(0,0,0,0.5);
}
.product_preview .close{
  position: absolute;
  top: -5px;
  right: -5px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 50%;
}
.product_preview .close i{
  color: #FFF;
}
.product_preview_wrapper{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: auto;
}
.product_preview_photo{
  width: 100%;
  height: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product_preview_photo img{
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
.product_preview_content{
  width: 100%;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  text-align: left;
  padding: 0 10vw;
  line-height: 1.5;
  box-sizing: border-box;
}
.product_preview_name{
  font-size: 26px;
}
.product_preview_desc{
  font-size: 13px;
  color: #757e9c;
}
.product_preview_price{
  font-size: 19px;
  font-weight: 700;
  color: peru;
}
.product_preview_actions{
	width: 100%;
	height: 80px;
  display: flex;
	justify-content: space-around;
	align-items: center;
  border-top: 1px solid #DBDBDB;
}
.add_product-action{
  padding: 14px 40px;
  background-color: #25c58b;
  color: #FFF;
  font-size: 16px;
}
.sold_out_product-action{
  padding: 14px 40px;
  background-color: gray;
  color: #FFF;
  font-size: 16px;
}
</style>
