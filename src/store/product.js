import axios from 'axios';

const state = {
  productsData: [],
  productPreviewData: null,
};

const mutations = {
  GET_PRODUCTS(state) {
    const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TCatElemInv/GetListaElemInv/';
    const urlData = JSON.stringify({
      datospagina: {
        cantidadregistros: 1000,
        pagina: 1,
      },
      camposderetorno: ['irecurso', 'nrecurso'],
      ilistapreciosdef: '3',
      ordenarpor: { irecurso: 'asc' },
    });
    const urlSecurity = '/2A46ED622/2000';
    const URL = `${urlHttp}${urlData}${urlSecurity}`;
    axios.get(URL).then((response) => {
      state.productsData = response.data.result[0].respuesta.datos;
    });
  },
  GET_PRODUCT(state) {
    const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TCatElemInv/GetFotoElemInv/';
    const urlData = JSON.stringify({
      irecurso: state.productPreviewData.irecurso,
      codimg: '1',
    });
    const urlSecurity = '/2A46ED622/2000';
    const URL = `${urlHttp}${urlData}${urlSecurity}`;
    axios.get(URL).then((response) => {
    });
  },
};

const module = {
  state,
  mutations,
};

export default module;
