<template>
  <form class="" action="index.html" method="post">

  </form>
</template>

<script>
export default {
  data() {
    return {
      init: '', // Cedula
      infobasica: {
        ntercero: 'Luis', // Nombre
        napellido: 'Gomez', // Apellido
        bempresa: 'F',
        itddocum: '13',
        tratamiento: 'señor',
        sprofesion: 'contador', // Profesion
        isexo: 'M', // Sexo
        fnacimiento: '03-25-1987', // Fecha de nacimiento
        ipais: '169', // Id del pais
        idep: '17', // Id del departamento
        imun: '001',
        tdireccion: 'cra 26 # 23-21', // Direccion de la tienda
        sbarrio: 'centro', // Barrio
        ttelefono: '8915621', // Telefono
        tcelular: '3217526687', // Celular
        semail: 'lgomez@gmail.com', // Correo electronico
      },
      datosvendedor: [
        {
          iautorizacion: '100',
          icc: '10102',
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
