  
  const cupboardReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CUPBOARD':
          return action.payload;
      //   case 'UNSET_USER':
      //     return {};     <-------- do I need a clear recipes case?
        default:
          return state;
      }
  }

  export default cupboardReducer;