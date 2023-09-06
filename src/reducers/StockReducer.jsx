export const stockInit = (stockInitialState) => {
  const result = {
      ...stockInitialState, 
      mode: 'SearchByBarcode',
      products: []
  }
  return result
}



export const stockInitialState = {
 mode: '',
 products: [],
 supplier: {},
};


export const stockReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_MODE':
            return {
                ...state,
                mode: action.payload
            }
        case 'ADD_SUPPLIER':
            return {
                ...state,
                supplier: action.payload,
            };
        case 'ADD_PRODUCT':
            const existingProduct = state.products.find((product) => product.product_id === action.payload.product_id);
            //console.log(action.payload)
            //console.log(state.products)
            if (!existingProduct) {
                state.products.push(action.payload);
            } else if(existingProduct){
                existingProduct.quantity_bought += action.payload.quantity_bought
                existingProduct.total_cost = existingProduct.quantity_bought * existingProduct.unit_price
            }
            return {
                ...state,
                products: state.products

            }
        case 'SINGLE_PRODUCT_QUANTITY':
            return {
                ...state,
                products: state.products.filter((item) => {
                    if(item.id === action.payload.id) {
                        item.quantity_bought = Number(action.payload.quantity_bought);
                        item.product_stock = parseInt(item.quantity) + item.quantity_bought
                        item.total_cost = item.quantity_bought * item.unit_cost
                        return item
                    }else{
                        return item
                    }
                })
            }
        case 'SINGLE_PRODUCT_COST':
            return {
                ...state,
                products: state.products.filter((item) => {
                    if(item.id === action.payload.id) {
                        item.unit_cost = Number(action.payload.unit_cost);
                        item.total_cost = item.quantity_bought * item.unit_cost
                        return item
                    }else{
                        return item
                    }
                })
            }
        case 'SEARCH_PRODUCT':
            return {
                products: action.payload
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter((item) => item.id !== action.payload.id),
            };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                    ...item,
                    ...action.payload,
                    };
                }
                return item;
                }),
            };
        case 'SINGLE_PRODUCT':
                return {
                    products: state.products.filter((item) => item.id === action.payload.id),    
                };
        case 'REMOVE_PRODUCT':
                return {
                    ...state,
                    products: [],
                };
        case 'REMOVE_SUPPLIER':
                return {
                    ...state,
                    supplier: {},
                };
        default:
            return state;
  }
}