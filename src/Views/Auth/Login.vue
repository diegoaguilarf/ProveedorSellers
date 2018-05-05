<template>
  <div class="FormLogin">
    <img src="../../assets/logo.png" class="auth-layout-logo">
    <el-alert
      title="Autenticacion"
      type="error"
      description="Su contraseña o correo es incorrecto"
      v-if="authError"
      :closable="false"
      show-icon>
    </el-alert>
    <form v-on:submit.prevent class="form">
      <div class="input-area first">
        <p class="nameItem">Correo electronico</p>
        <input class="input-email" type="email" placeholder="Correo electronico" v-model="email">
      </div>
      <div class="input-area">
        <span v-if="typePassword == 'password'" @click="showPassword"><i class=""></i>Mostrar</span>
        <span v-else @click="hiddenPassword"><i class=""></i>Ocultar</span>
        <p class="nameItem">Contraseña</p>
        <input class="input-password" :type="typePassword" placeholder="Contraseña" v-model="password">
      </div>
      <router-link to="/recuperar-contrasena">
        <a href="" class="forgot-password">¿Olvidaste tu contraseña?</a>
      </router-link>
      <div class="container-button">
        <button class="btn btn-login btn-fill" v-on:click="login"><p>Ingresar</p></button>
      </div>
    </form>
    <!-- <button class="btn btn-facebook"><i class="fa fa-facebook-square"></i>Ingresar con Facebook</button> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      messageInvalid: 'La dirección de correo electrónico o contraseña no es válida',
      email: '',
      password: '',
      greet: '',
      authError: false,
      showInvalid: false,
      typePassword: 'password',
    };
  },
  watch: {
    email(value) {
      this.showInvalid = false;
    },
    password(value) {
      this.showInvalid = false;
    },
  },
  methods: {
    show() {
      this.showInvalid = true;
    },
    login() {
      const authData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('LOGIN', authData).then(() => {
        this.$router.push('/');
        this.authError = false;
      }).catch(() => {
        this.authError = true;
        setTimeout(() => {
          this.authError = false;
        }, 5000)
      });
    },
    showPassword() {
      this.typePassword = 'text';
    },
    hiddenPassword() {
      this.typePassword = 'password';
    },
  },
};
</script>

<style scoped>
.FormLogin{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.action-signup{
  margin: 0 0 30px 0;
  color: #757e9c;
  font-size: 12px;
}
.action-signup a{
  cursor: pointer;
}
@-webkit-keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}
.forgot-password {
  font-size: 12px;
  color: #757e9c;
  padding-top: 5px;
  align-self: flex-end;
  cursor: pointer;
}
.forgot-password:hover {
  color: initial;
}
.form > a {
  max-width: 320px;
  width: 100%;
  text-align: end;
}
.form .invalid-data {
  text-align: center;
  color: rgba(241, 75, 89, 0.707);
}
.input-area.first{
  margin-top: 10px;
}
.input-area span{
  position: absolute;
  right: 0;
  color: #757e9c;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}
.input-area i.fa{
  margin-right: 5px;
  font-size: 15px;
}
.container-button {
  padding-top: 15px;
  max-width: 320px;
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.title-login {
  font-size: 18px;
  color: #59617b;
  text-align: center;
}

.input-area{
  position: relative;
  max-width: 320px;
  width: 100%;
  margin-bottom: 10px;
}
.nameItem {
  color: #757e9c;
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  text-align: left;
  margin-bottom: 5px;
}
.container-inputs {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  border-radius: 3px;
  background: #fff;
}
input, select {
  width: 100%;
  box-sizing: border-box;
  border-style: none;
  background-color: transparent;
  outline: none;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  color: #76767b;
  font-size: 14px;
  line-height: 1;
  border-radius: 3px;
  vertical-align: middle;
  padding: 0.6rem 2rem 0.6rem;
  border: 1px solid #dfdfdf;
}
input::-webkit-input-placeholder {
  color: #bfbfbf;
}
select::-webkit-input-placeholder {
  color: #bfbfbf;
}
.is-error{
  border: 2px solid #f56c6c;
}
.btn {
  color: #fff;
  max-width: 320px;
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  /* margin-top: 30px; */
  font-size: 16px;
}
button {
  outline: none;
}

.btn-start {
  position: absolute;
  background-color: rgba(0,0,0,0.2);
  color: #FFF;
  border: 0;
  cursor: pointer;
  bottom: 40px;
  z-index: 2;
  left: calc(100%/2 - 160px);
  font-size: 16px;
  /* text-transform: uppercase; */
}
.btn-start:hover {
}
.btn-facebook {
  background-color: #4567ac;
  font-weight: 600;
}
.btn-facebook:hover {
  background-color: #254278;
}
.btn-facebook i.fa{
  margin-right: 10px;
  font-size: 18px;
}
.auth-layout-logo {
  width: 170px;
  z-index: 3;
  margin: 10px 0 40px 0;
}
.btn-fill{
  position: relative;
  background-color: #FFF;
  border: 1px solid #2f406a;
  overflow: hidden;
}
.btn-fill p{
  position: absolute;
  z-index: 2;
  color: #2f406a;
  font-weight: 600;
  transition: .3s;
}
.btn-fill:hover p{
  color: #FFF;
}
.btn-fill::before{
  content: '';
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: 50px;
  background-color: #2f406a;
  z-index: 1;
  transition: .3s;
}
.btn-fill:hover::before{
  top: 0%;
}
@media screen and (max-width: 600px) {
  .form{
    box-sizing: border-box;
    padding: 10px;
  }
  input {
    padding: 0.8rem 2.5rem 0.8rem;
  }
}
</style>
