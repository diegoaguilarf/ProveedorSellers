import axios from 'axios';

const state = {
  productsData: [],
  productPreviewData: null,
};

const actions = {
  GET_PRODUCTS({state, rootState}) {
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
    const URL = `${urlHttp}${urlData}${rootState.contapymeAuth}`;
    axios.get(URL).then((response) => {
      state.productsData = response.data.result[0].respuesta.datos;
    });
  },
  GET_PRODUCT({state, rootState}) {
    const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TCatElemInv/GetFotoElemInv/';
    const urlData = JSON.stringify({
      irecurso: state.productPreviewData.irecurso,
      codimg: '1',
    });
    const URL = `${urlHttp}${urlData}${rootState.contapymeAuth}`;
    axios.get(URL).then((response) => {
    });
  },
};

const module = {
  state,
  actions,
};

export default module;
