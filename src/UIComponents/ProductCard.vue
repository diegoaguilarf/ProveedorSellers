<template>
  <div class="product_card card">
    <img :src="getPhoto" class="product_card_photo" alt="">
    <div class="product_card_content">
      <p class="product_card_price">{{ data.mprecio }}</p>
      <p class="product_card_name">{{ data.nrecurso | capitalize }}</p>
      <p class="product_card_code">codigo: {{ data.irecurso }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    getPhoto() {
      const objPhoto = JSON.stringify({
        irecurso: this.data.irecurso,
        codimg: '1',
      });
      return `http://186.115.207.187:9000/datasnap/rest/TCatElemInv/GetFotoElemInv/${objPhoto}/2A46ED622/2000`;
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
  .product_card{
    flex-direction: column;
    width: calc(50% - 20px);
    padding: 10px 5px;
    margin: 5px;
    background-color: #FFF;
  }
  .product_card_content{
    text-align: left;
  }
  .product_card_photo{
    width: 100%;
    height: 100px;
    object-fit: contain;
  }
  .product_card_price{
    font-weight: 600;
  }
  .product_card_code{
    font-size: 14px;
    color: rgba(0,0,0,0.6);
  }
</style>
