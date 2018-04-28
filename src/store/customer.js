import axios from 'axios';

const state = {
  customersData: [],
};

const mutations = {
  GET_CUSTOMERS(state, stateRoot) {
    const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TCatTerceros/GetListaTerceros/';
    const urlData = JSON.stringify({
      datospagina: {
        cantidadregistros: 200,
        pagina: 1,
      },
      camposderetorno: ['init', 'ntercero', 'napellido'],
      datosfiltro: { bcliente: 'T' },
      ordenarpor: { ntercero: 'asc' },
    });
    const urlSecurity = '/2A46ED622/2000';
    const URL = `${urlHttp}${urlData}${urlSecurity}`;
    axios.get(URL).then((response) => {
      state.customersData = response.data.result[0].respuesta.datos;
    });
  },
};

const module = {
  state,
  mutations,
};

export default module;
