export const userInitialState = {
  users: [],
};

export const userReducer = (state, action) => {
  switch(action.type){
      case 'FETCH_USERS':
           return {
               ...state,
               users: action.payload,
           };
      case 'ADD_USER':
           return {
               ...state,
               users: [ action.payload, ...state.users],
           }
       case 'SINGLE_USER':
               return {
                users: state.users.filter((item) => item.id === action.payload.id),    
               };
       case 'DELETE_USER':
               return {
                 ...state,
                 users: state.users.filter((item) => item.id !== action.payload.id),
               };
       default:
          return state;
  }
}