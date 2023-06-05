export const productCategoryInitialstate = []

export const productCategoryReducer = (state, action) => {
   switch(action.type){
       case 'PRODUCT_CATEGORY_ADD':
         return [
            action.payload, 
            ...state
         ]
      case 'PRODUCT_CATEGORY_REMOVE':
         return state.filter(item => item !== action.payload)
      default:
         return state;
   }
}

