import Vue from 'vue';
import Vuex from 'vuex';
import catalogModule from './modules/catalog';
import ordersModule from './modules/orders';
import recommendationsModule from './modules/recommendations';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    catalog: catalogModule,
    orders: ordersModule,
    recommendations: recommendationsModule,
  },
  state: {
  },
});
