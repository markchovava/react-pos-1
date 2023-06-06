
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
                    //...state,
                  
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



export const productViewInitialState = {}

  export const productViewReducer = (state, action) => {
    switch(action.type){
        case 'PRODUCT_VIEW':
           return  {
            product: action.payload
       }
       default:
           return state;
    }
}


export const getProduct = async () => {
    const result = await AxiosClient.get(`product/${id}`)
    .then((response) => {
        console.log(response.data)
        productViewDispatch({
            type: 'PRODUCT_VIEW',
            payload: response.data,
        })    
    })   
}
