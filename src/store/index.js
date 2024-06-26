// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    // Aquí defines tus variables de estado inicial
    // Ejemplo:
    apiResponse:{},
    isLoading:false
  },
  mutations: {
    // Aquí defines tus mutaciones para modificar el estado
    // Ejemplo:
    setApiResponse(state, response) {
      state.apiResponse = response;
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    }
  },
  getters: {
    getApiResponse(state){
        return state.apiResponse
    },
    getIsLoading(state){
        return state.isLoading
    }
  },
  actions: {

    async apiCall({ commit },form) {
      try {
        commit('setIsLoading', true);
        await axios.get('https://api.hipotecarios.info/creditos',{ params:{
            valorPropiedad:form.propertyValue,
            Pie:form.at,
            Tiempo:form.selectedYear,
            Dfl2:true
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
        }}).then((response) => {
          let data=[];
            if (response.data) {

              for (const bankKey in response.data) {
                if (Object.hasOwnProperty.call(response.data, bankKey)) {
                    const bankRecords = response.data[bankKey];
                    if (Array.isArray(bankRecords)) {
                        // Filtrar registros del banco actual
                        const filteredRecords = bankRecords.filter(record =>
                            record.tasaDeInteres &&
                            (record.caracteristicas && record.caracteristicas.length > 0)
                        );
                        // Agregar los registros filtrados a la lista de datos
                        data.push(...filteredRecords);
                    }
                }
            }
            commit('setApiResponse', data);
                
            } else {
                alert('Ocurrió un error al obtener la información')
            }

        });
       
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        commit('setIsLoading', false);
      }
    }
  },
});
