export const salesItemInitialState = {
  items: [],
};

export const salesItemReducer = (state, action) => {
  switch(action.type){
    case 'FETCH_SALES_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}