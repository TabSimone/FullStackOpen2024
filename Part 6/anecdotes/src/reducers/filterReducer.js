const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      console.log("Entrato in SET_FILTER")
      return action.payload
    default:
      return state
  }
}

export default filterReducer