<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import '../static/themify-icons/themify-icons.css';
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  outline: none;
}
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
.card{
  max-width: 450px;
  width: 90%;
  flex: none;
  display: flex;
  background-color: #FFF;
  border-radius: 2px;
  box-shadow: 1px 1px 4px 0 rgba(0,0,0,0.2);
}
.action{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-style: none;
}
.area{
  text-align: left;
}
.label{
  font-size: 14px;
  color: gray;
}
</style>
