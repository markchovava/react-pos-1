export const posInit = (posInitialState) => {
    const result = {
        ...posInitialState, 
        mode: 'SearchByBarcode', 
        currency: {  ...posInitialState.currency, name: 'USD' },
        products: []
    }
    return result
}


export const posInitialState = {
   mode: '',
   products: [],
 };


export const posReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_MODE':
            return {
                ...state,
                mode: action.payload
            }
        case 'ADD_PRODUCT':
            const existingProduct = state.products.find((product) => product.product_id === action.payload.product_id);
            console.log(action.payload)
            console.log(state.products)
            if (!existingProduct) {
                state.products.push(action.payload);
            } else if(existingProduct){
                existingProduct.quantity_sold += action.payload.quantity_sold
                existingProduct.total_price = existingProduct.quantity_sold * existingProduct.unit_price
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
                        item.quantity_sold = Number(action.payload.quantity_sold);
                        item.stock = item.quantity - action.payload.quantity_sold
                        item.total_price = item.quantity_sold * item.unit_price
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
        default:
           return state;
   }
}



export const currencyInitialState = {
    currency: {},
    dbcurrency: {}
  };

export const currencyReducer = (state, action) => {
    switch(action.type){
     case 'CHANGE_CURRENCY':
         return {
            ...state,
             currency: action.payload
          }
    case 'UPDATE_CURRENCY':
         return {
            ...state,
            dbcurrency: state.currency.filter((item) => {
                 if(item.id === action.payload.id){
                     item.rate=action.payload
                     return item
                 } else {
                     return item
                 }
             })
         }
    default:
        return state;
    }
 }


export const paymentInitialSate = {
    method: ''
}

export const paymentReducer = (state, action) => {
    switch(action.type){
        case 'PAYMENT_METHOD':
            return {
                method: action.payload
            }
        default:
            return state;
    }
}

