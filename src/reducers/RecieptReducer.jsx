export const recieptInitialState = {
  items: [],
};


export const recieptReducer = (state, action) => {
  switch(action.type){
    case 'GET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}