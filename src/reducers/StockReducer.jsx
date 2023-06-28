export const stockInitialState = {
  quantity: 0,
};

export const stockReducer = (state, action) => {
  switch(action.type){
    case 'EDIT_QUANTITY':
      return {
        ...state,
        quantity: action.payload,
      };
    default:
      return state;
  }
}