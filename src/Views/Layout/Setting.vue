<template>
  <div class="setting">
    <label for="uploadPhoto" class="setting_photo" v-loading="loadingUploadPhoto" element-loading-background="rgba(0, 0, 0, 0.8)">
      <img :src="photo" alt="">
    </label>
    <input type="file" id="uploadPhoto" @change="uploadPhoto">
    <div class="setting_area" v-if="userData">
      <div class="setting_item" v-for="(item, index) in userData" v-on:click="editRow(index)">
        <i :class="item.icon"></i>
        <div v-show="!item.edit">
          <label>{{ item.label }}</label>
          <p>{{ item.value }}</p>
        </div>
        <div v-show="item.edit" class="setting_item_actions">
          <el-input v-model="item.value"/>
          <el-button type="success" icon="el-icon-check" circle></el-button>
        </div>
      </div>
    </div>
    <el-button @click="logout">Salir de la aplicación</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingUploadPhoto: false,
    };
  },
  computed: {
    photo() {
      return this.$store.state.userData.photo_url || '';
    },
    userData() {
      return [
        {
          icon: 'ti-email',
          label: 'Correo electrónico',
          value: this.$store.state.userData.email,
          edit: false,
        },
        {
          icon: 'ti-user',
          label: 'Nombre',
          value: this.$store.state.userData.name,
          edit: false,
        },
        {
          icon: 'ti-mobile',
          label: '# de celular',
          value: this.$store.state.userData.phone_number,
          edit: false,
        },
      ];
    },
  },
  methods: {
    editRow(index) {
      let row = this.userData[index];
      row.edit = true;
      this.userData.splice(index, 1, row);
    },
    uploadPhoto(event) {
      this.loadingUploadPhoto = true;
      const file = event.target.files[0];
      const ref = this.$firebase.storage().ref().child('sellers/mountains.jpg');
      ref.put(file).then((snapshot) => {
        const updates = {};
        updates[`/sellers/${this.$store.state.userData.key}/photo_url`] = snapshot.downloadURL;
        this.$firebase.database().ref().update(updates);
        this.$store.state.userData.photo_url = snapshot.downloadURL;
        this.loadingUploadPhoto = false;
      });
    },
    logout() {
      this.$store.commit('LOGOUT');
    }
  },
};
</script>

<style scoped>
  .setting{
    width: 100%;
    align-items: center;
  }
  .setting_photo{
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 20px;
    cursor: pointer;
  }
  .setting_photo img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  input[type=file]{
    display: none;
  }
  .setting_area{
    display: grid;
    grid-row-gap: 10px;
    margin: 30px 0;
  }
  .setting_item{
    width: 100%;
    display: flex;
    align-items: center;
    text-align: left;
  }
  .setting_item i{
    font-size: 20px;
    margin-right: 10px;
  }
  .setting_item label{
    font-size: 13px;
    color: #5a5a5a;
  }
  .setting_item p{
    font-size: 15px;
    font-weight: 600;
  }
  .setting_item_actions{
    display: flex;
  }
  .setting_item_actions .el-button{
    margin-left: 10px;
  }
  .save_setting-action{
    padding: 10px 30px;
    color: #FFF;
    background-color: #00C853;
  }
</style>
