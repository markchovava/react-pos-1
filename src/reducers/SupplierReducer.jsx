export const supplierInitialState = {
    suppliers: [],
  };
  
  export const supplierReducer = (state, action) => {
    switch(action.type){
        case 'FETCH_SUPPLIERS':
             return {
                 ...state,
                 suppliers: action.payload,
             };
        case 'ADD_SUPPLIER':
             return {
                 ...state,
                 suppliers: [ action.payload, ...state.suppliers],
             }
         case 'SINGLE_SUPPLIER':
                 return {
                  suppliers: state.suppliers.filter((item) => item.id === action.payload.id),    
                 };
         case 'DELETE_SUPPLIER':
                 return {
                   ...state,
                   suppliers: state.suppliers.filter((item) => item.id !== action.payload.id),
                 };
         default:
            return state;
    }
  }