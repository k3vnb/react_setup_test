export default (state = {}, action) => {
  let newState;
  const { names, location, issue, timeOpen, id } = action;

  switch (action.type) {
  case 'ADD_TICKET':
    newState = Object.assign({}, state, {
      [id]: {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id
      }
    });
    return newState;
  case 'UPDATE_TIME':
    return newState;
  default:
    return state;
  }
};
