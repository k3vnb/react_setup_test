const persistDataLocally = store => next => action => {
  //entire JSON string is saved under 'reduxStore' key (local-storage is always key val pair)
  next(action);
  localStorage['reduxStore'] = JSON.stringify(store.getState());
  console.log('Local Storage:', localStorage['reduxStore']);
}

export default persistDataLocally;
