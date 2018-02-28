import React from 'react';
// import Moment from 'moment';
// import PropTypes from 'prop-types';
// import { v1 } from 'uuid';
import { connect } from 'react-redux';
import constants from './../constants';
const { c } = constants;
import { addTicket } from './../actions';


function NewTicketForm(props){
  // console.log(props);
  let _names = null;
  let _location = null;
  let _issue = null;

  function handleNewTicketFormSubmission(event) {
    const { dispatch } = props;
    event.preventDefault();
    // const action = {
    //   type: c.ADD_TICKET,
    //   id: v1(),
    //   names: _names.value,
    //   location: _location.value,
    //   issue: _issue.value,
    //   timeOpen: new Moment(),
    //   formattedWaitTime: new Moment().fromNow(true)
    // };
    dispatch(addTicket(_names.value, _location.value, _issue.value));

    _names.value = '';
    _location.value = '';
    _issue.value = '';
  }

  return (
    <div>
      <form onSubmit={handleNewTicketFormSubmission}>
        <input
          type='text'
          id='names'
          placeholder='Pair Names'
          ref={(input) => {_names = input;}}/>
        <input
          type='text'
          id='location'
          placeholder='Location'
          ref={(input) => {_location = input;}}/>
        <textarea
          id='issue'
          placeholder='Describe your issue.'
          ref={(textarea) => {_issue = textarea;}}/>
        <button type='submit'>Help!</button>
      </form>
    </div>
  );
}

// NewTicketForm.propTypes = {
//   onNewTicketCreation: PropTypes.func
// }; <-- gone w/ React-Redux refactor

// NewTicketForm = connect()(NewTicketForm);
// export default NewTicketForm;
//(connect() is a higher-order component which is a function that takes an existing component & returns a second component that 'wraps' the first by redefining it to include more functionality)

export default connect() (NewTicketForm);
