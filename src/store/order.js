import axios from 'axios';

const date = () => {
  const dateObj = new Date();
  const day = `0${dateObj.getDate()}`.slice(-2);
  const month = `0${dateObj.getUTCMonth() + 1}`.slice(-2); // months from 1-12
  const year = dateObj.getUTCFullYear();

  return `${month}-${day}-${year}`;
};

const state = {
  customerOrderData: {},
  ordersData: [],
  orderData: null,
  accion: 'CREATE',
  operaciones: [
    {
      itdoper: 'ORD1',
    },
  ],
  oprdata: {
    datosprincipales: {
      init: '', // Identificacion del cliente
      initvendedor: '', // Identificacion del vendedor
      iinventario: '1',
      finicio: date(), // Fecha en que se empieza a preparar el pedido
      qdias: '1', // Dias habiles de entrega
      ilistaprecios: '2', // Lista de precios
      sobservenc: '', // Observaciones del pedido
      bregvrunit: 'F', // Es posible registrar los precios de los elementos
      qporcdescuento: '0', // Porcentaje de descuento
      bregvrtotal: 'F', // Es posible registrar el total de todos los elementos
      frmenvio: '0', // Forma de envio
      frmpago: '1', // Forma de pago
      condicion1: '1', // Condicion
      blistaconiva: 'T', // Es con iva
      busarotramoneda: 'F', // Se utilizo otro tipo de moneda
      imonedaimpresion: '', // Codigo de la moneda que se imprime el pedido
      mtasacambio: '0', // Tasa de cambio
      ireferencia: '', // Número del documento referencia usado en el pedido
      bcerrarref: 'F', // Referencia cerrada?
      itdprintobs: '-1', // Codigo de la sucursal del cliente
      icontactocliente: '0',
    },
    encabezado: {
      iemp: '1', // Código de la empresa a la cual pertenece la operación.
      itdsop: '420', // Tipo de documento de soporte de la operación.
      fsoport: date(), // Fecha de soporte de la operación.
      iclasifop: '1', // Código de la clase de operación especificada para la operación
      imoneda: '10',
      iprocess: '1', // El estado de procesamiento 0, 1, 2
      banulada: 'F', // Esta anulada
      inumsop: '0', // Numero de documento
      snumsop: '<AUTO>', // Numero de documento segun la mascara
      tdetalle: 'Pruebas de aplicacion vendedores 6', // Descripcion de la operacion
    },
    liquidacion: {
      parcial: '0',
      iva: '0',
      total: '0',
    },
    listaproductos: [],
  },
  getOrdersConfig: {
    datospagina: {
      cantidadregistros: '20',
      pagina: '1',
    },
    camposderetorno: [
      'itdoper',
      'inumoper',
      'tdetalle',
      'fcreacion',
      'ncorto',
      'iestado',
      'ntdsop',
      'ntercero',
      'init',
      'iprocess',
      'fsoport',
      'snumsop',
      'qerror',
      'qwarning',
      'banulada',
      'mingresos',
      'megresos',
      'mtotaloperacion',
    ],
    ordenarpor: {
      fsoport: 'desc',
    },
    itdoper: [
      'ORD1',
    ],
  },
};

const mutations = {
  GET_ORDERS(state) {
    const URL = 'http://186.115.207.187:9000/datasnap/rest/TCatOperaciones/GetListaOperaciones/';
    const URLsecurity = '/2B9AAB51E8/2000';
    const data = JSON.stringify(state.getOrdersConfig);
    const URLwithData = `${URL}${data}${URLsecurity}`;
    axios.get(URLwithData).then((response) => {
      state.ordersData = response.data.result[0].respuesta.datos;
    });
  },
  GET_ORDER(state, inumoper) {
    const URL = 'http://186.115.207.187:9000/datasnap/rest/TCatOperaciones/DoExecuteOprAction/';
    const URLsecurity = '/2B9AAB51E8/2000';
    const data = JSON.stringify({
      accion: 'LOAD',
      operaciones: [
        {
          inumoper,
          itdoper: 'ORD1',
        },
      ],
    });
    const URLwithData = `${URL}${data}${URLsecurity}`;
    axios.get(URLwithData).then((response) => {
      state.orderData = response.data.result[0].respuesta.datos;
    });
  },
  ADD_ORDERCUSTOMER(state, data) {
    state.oprdata.datosprincipales.init = data.init;
    state.customerOrderData = data;
  },
  CALCULATE_LIQUIDACION(state) {
    state.oprdata.liquidacion.parcial = 0;
    state.oprdata.liquidacion.iva = 0;
    state.oprdata.liquidacion.total = 0;
    state.oprdata.listaproductos.forEach((product) => {
      state.oprdata.liquidacion.total += (product.mprecio * product.qrecurso);
    });
    state.oprdata.liquidacion.iva = (state.oprdata.liquidacion.total * 0.19);
    const parcial = state.oprdata.liquidacion.total - state.oprdata.liquidacion.iva;
    state.oprdata.liquidacion.parcial = parcial;
    state.oprdata.liquidacion.parcial = state.oprdata.liquidacion.parcial.toString();
    state.oprdata.liquidacion.iva = state.oprdata.liquidacion.iva.toString();
    state.oprdata.liquidacion.total = state.oprdata.liquidacion.total.toString();
  },
  SAVE_ORDER(state) {
    const URL = 'http://186.115.207.187:9000/datasnap/rest/TCatOperaciones/DoExecuteOprAction/';
    const URLsecurity = '/2B9AAB51E8/2000';
    const data = JSON.stringify({
      accion: state.accion,
      operaciones: state.operaciones,
      oprdata: state.oprdata,
    });
    const URLwithData = `${URL}${data}${URLsecurity}`;
    axios.get(URLwithData);
  },
};

const actions = {
  ADD_ORDERPRODUCT({ commit, state }, data) {
    state.oprdata.listaproductos.push(data);
    commit('CALCULATE_LIQUIDACION');
  },
};

const order = {
  state,
  mutations,
  actions,
};

export default order;
