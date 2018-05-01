import axios from 'axios';

const state = {
  customersData: [],
};

const actions = {
  GET_CUSTOMERS({state, rootState}) {
    const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TCatTerceros/GetListaTerceros/';
    const urlData = JSON.stringify({
      datospagina: {
        cantidadregistros: 200,
        pagina: 1,
      },
      camposderetorno: ['init', 'ntercero', 'napellido'],
      
      ordenarpor: { ntercero: 'asc' },
    });
    const URL = `${urlHttp}${urlData}${rootState.contapymeAuth}`;
    axios.get(URL).then((response) => {
      state.customersData = response.data.result[0].respuesta.datos;
    });
  },
};

const module = {
  state,
  actions,
};

export default module;
