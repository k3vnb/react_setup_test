import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function NewTicketForm(props){
  // console.log(props);
  let _names = null;
  let _location = null;
  let _issue = null;

  function handleNewTicketFormSubmission(event) {
      event.preventDefault();
      props.onNewTicketCreation({names: _names.value, location: _location.value, issue: _issue.value, timeOpen: new Moment()});
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

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

// NewTicketForm = connect()(NewTicketForm);
// export default NewTicketForm;
//(connect() is a higher-order component which is a function that takes an existing component & returns a second component that 'wraps' the first by redefining it to include more functionality)

export default connect() (NewTicketForm);
