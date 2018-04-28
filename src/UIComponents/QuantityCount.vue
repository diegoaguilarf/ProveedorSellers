<template>
  <div class="quantity_count">
    <button v-if="true" v-on:click="removeQuantity">-</button>
    <button v-else><i class="material-icons">delete_forever</i></button>
    <input type="number" min="0" ref="count" v-model="quantity">
    <button v-on:click="addCount">+</button>
  </div>
</template>

<script>
export default {
  props: ['value', 'max'],
  data() {
    return {
      quantity: this.value,
    };
  },
  watch: {
    quantity(value) {
      this.$emit('input', value);
    },
  },
  methods: {
    addCount() {
      if (this.quantity < this.max) {
        this.quantity++;
      }
    },
    removeQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
};
</script>

<style lang="css">
  .quantity_count{
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	padding: 3px;
  	border-radius: 2px;
  	border: 1px solid #e5edef;
  }
  .quantity_count button{
  	width: 40px;
  	height: 40px;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	border-radius: 2px;
  	background-color: #f7f7f7;
  	color: #9faab7;
  	cursor: pointer;
    border-style: none;
  	font-size: 17px;
  }
  .quantity_count button i{
  	font-size: 16px;
  	color: #9faab7;
  }
  .quantity_count input{
    width: 50px;
    padding: 0 4px;
    text-align: center;
    border-style: none;
    /* pointer-events: none; */
  }
</style>
