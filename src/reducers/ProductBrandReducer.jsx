export const productBrandInitialstate = {}

 export const productBrandReducer = (state, action) => {
   switch(action.type){
       case 'PRODUCT_BRAND_SELECT':
         return  action.payload   
      default:
         return state;
   }
}