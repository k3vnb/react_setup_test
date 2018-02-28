const persistDataLocally = store => next => action => {
  //entire JSON string is saved under 'reduxStore' key (local-storage is always key val pair)
  localStorage['reduxStore'] = JSON.stringify(store.getState());
  console.log('Local Storage:', localStorage['reduxStore']);
  return next(action)
}

export default persistDataLocally;
