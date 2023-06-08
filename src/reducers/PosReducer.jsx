export const posInit = (posInitialState) => {
    const result = {
        ...posInitialState, 
        mode: 'SearchByBarcode', 
        currency: 'USD',
        products: []
    }
    return result
}


export const posInitialState = {
   mode: '',
   currency: '',
   products: [],
 };


export const posReducer = (state, action) => {
   switch(action.type){
    case 'CHANGE_MODE':
         return {
            ...state,
            mode: action.payload
         }
    case 'CHANGE_CURRENCY':
         return {
            ...state,
            mode: action.payload
         }
       case 'ADD_PRODUCT':
            const distinctItems = [...new Set(state.products.concat(action.payload))]
            return {
                ...state,
                products: distinctItems,
            };
       case 'SINGLE_PRODUCT_QUANTITY':
            console.log(state.products)
            return {
                ...state,
                products: state.products.filter((item) => {
                    if(item.id === action.payload.id) {
                        console.log('quantity_sold: ' + action.payload.quantity_sold)
                        console.log('item quantity_sold: ' + item.quantity_sold)
                        console.log('Sent total_price: ' + (action.payload.quantity_sold * item.unit_price))
                        item.quantity_sold = Number(action.payload.quantity_sold)
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
                  products: state.products.filter((item) => item.id !== action.payload.id),
                };
        default:
           return state;
   }
}

