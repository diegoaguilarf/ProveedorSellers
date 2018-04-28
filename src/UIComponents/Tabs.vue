<template>
  <div class="Tabs">
    <ul>
      <li v-for="tab in tabs">
        <a :href="tab.path" v-if="tab.external"><i :class="tab.icon"></i></a>
        <router-link :to="{name: tab.name, params: {id: tab.id}}" v-else><i :class="tab.icon"></i></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
      tabs: [
        {
          id: 0,
          label: 'Chat',
          icon: 'ti-comments',
          path: 'https://api.whatsapp.com/send?phone=573103371200',
          name: 'Chat',
          external: true,
        },
        {
          id: 1,
          label: 'Pedidos',
          icon: 'ti-agenda',
          path: 'order/all',
          name: 'OrderAll',
        },
        {
          id: 2,
          label: 'Ajustes',
          icon: 'ti-user',
          path: '/setting',
          name: 'Setting',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Tabs{
    width: 100%;
    height: 50px;
    border-top: 1px solid #DBDBDB;
  }
  .Tabs ul{
    height: 100%;
    display: flex;
    justify-content: space-around;
  }
  .Tabs ul li{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 10px;
    cursor: pointer;
  }
  .Tabs ul li:hover{
    background-color: #EEE;
  }
  .Tabs ul li a{
    width: 100%;
  }
</style>
