export const salesInitialState = {
  sales: [],
};

export const salesReducer = (state, action) => {
  switch(action.type){
    case 'FETCH_SALES':
      return {
        ...state,
        sales: action.payload,
      };
    case 'ADD_SALES':
      return{
        ...state,
        sales: [...state.sales, action.payload]
      }
    default:
      return state;
  }
}
