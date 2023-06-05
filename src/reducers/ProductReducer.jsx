export const ACTION = {
    FETCH_PRODUCT: 'FETCH_PRODUCT',
    SEARCH_PRODUCT: 'SEARCH_PRODUCT',
    ADD_PRODUCT: 'ADD_PRODUCT',
    REMOVE_PRODUCT: 'REMOVE_TASK',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT'
}

export const initialState = {
    products: [],
  };

export const productReducer = (state, action) => {
   switch(action.type){
       case ACTION.FETCH_PRODUCT:
            return {
                ...state,
                products: action.payload,
            };
       case ACTION.ADD_PRODUCT:
            return {
                ...state,
                products: [ action.payload, ...state.products],
            }
       case ACTION.SEARCH_PRODUCT:
            return {
                products: action.payload
            }
       case ACTION.REMOVE_PRODUCT:
           return 
       case ACTION.UPDATE_PRODUCT:
           return 
       case ACTION.DELETE_PRODUCT:
           return 
       default:
           return state;
   }
}
