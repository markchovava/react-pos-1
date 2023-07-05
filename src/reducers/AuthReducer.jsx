export const authInitialstate = {
  token: null,
  user: {},
}


export const authReducer = (state, action) => {
  switch(action.type){
    case 'CURRENT_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_TOKEN':
        return {
            ...state,
            token: action.payload,
        };
    case 'REMOVE_TOKEN':
        return {
            ...state,
            token: null,
        };
    default:
      return state
  }
}