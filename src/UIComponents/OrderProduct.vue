<template>
  <li>
    <div class="">
      <p>{{ product.irecurso }}</p>
      <p>{{ mvrtotal }}</p>
    </div>
    <p class="name">{{ nrecurso }}</p>
    <p>{{ product.qrecurso }} x {{ product.mprecio }}</p>
  </li>
</template>

<script>
import axios from 'axios';

export default {
  props: ['product'],
  created() {
    this.getNrecurso();
  },
  data() {
    return {
      nrecurso: '',
    };
  },
  computed: {
    mvrtotal() {
      return (parseInt(this.product.qrecurso) * parseInt(this.product.mprecio));
    },
  },
  methods: {
    getNrecurso() {
      const URL = 'http://186.115.207.187:9000/datasnap/rest/TCatElemInv/GetInfoElemInv/';
      const data = JSON.stringify({
        irecurso: this.product.irecurso,
        secciones: {
          infobasica: ['nrecurso'],
        },
      });
      const URLsecurity = '/2A46ED622/2000';
      const URLwithData = `${URL}${data}${URLsecurity}`;
      axios.get(URLwithData).then((response) => {
        this.nrecurso = response.data.result[0].respuesta.datos.infobasica.nrecurso;
      });
    },
  },
};
</script>

<style scoped>
  li{
    padding: 10px 5px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  li > div{
    display: flex;
    justify-content: space-between;
  }
  li p{
    text-align: left;
  }
  .name{
    font-weight: 600;
  }
</style>
