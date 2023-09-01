export const priceInit = (priceInitialState) => {
    const result = {
        ...priceInitialState, 
        mode: 'SearchByBarcode',
        products: []
    }
    return result
}


export const priceInitialState = {
    mode: '',
    products: [],
  };


  export const priceReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_MODE':
            return {
                ...state,
                mode: action.payload
            }
        case 'ADD_PRODUCT':
            const existingProduct = state.products.find((product) => product.product_id === action.payload.product_id);
            if (!existingProduct) {
                state.products.push(action.payload);
            } 
            return {
                ...state,
                products: state.products
            }
        case 'SINGLE_PRODUCT_PRICE':
            return {
                ...state,
                products: state.products.filter((item) => {
                    if(item.id === action.payload.id) {
                        item.unit_price = Number(action.payload.unit_price);
                        return item
                    }else{
                        return item
                    }
                })
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter((item) => item.id !== action.payload.id),
            };
        case 'REMOVE_PRODUCT':
            return {
                ...state,
                products: [],
            };
        default:
            return state;
    }
}