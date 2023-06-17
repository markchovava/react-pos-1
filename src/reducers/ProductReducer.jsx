export const productInitialState = {
    products: [],
  };

export const productReducer = (state, action) => {
   switch(action.type){
       case 'FETCH_PRODUCT':
            return {
                ...state,
                products: action.payload,
            };
       case 'ADD_PRODUCT':
            return {
                ...state,
                products: [ action.payload, ...state.products],
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
            }
        case 'UPDATE_PRODUCT_QUANTITY':
            return {
                ...state,
                products: state.products.filter((item) => {
                    if(item.id === action.payload.id) {
                        console.log(action.payload.stock)
                        item.quantity = action.payload.stock
                        return item
                    }else{
                        return item
                    }
                })
            }
        case 'SINGLE_PRODUCT':
                return {
                    products: state.products.filter((item) => item.id === action.payload.id),    
                };
        case 'DELETE_PRODUCT':
                return {
                  ...state,
                  products: state.products.filter((item) => item.id !== action.payload.id),
                };
        default:
           return state;
   }
}




