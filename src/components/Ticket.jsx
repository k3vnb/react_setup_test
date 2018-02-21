import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Ticket(props){
  function handleSavingSelectedTicket(ticketId){
    const { dispatch } = props;
    const action = {
      type: 'SELECT_TICKET',
      ticketId: ticketId
    };
    dispatch(action);
  }

  const ticketInfo =
    <div>
      <h3>{props.location} - {props.names}</h3>
      <p><em>{props.formattedWaitTime}</em></p>
      <p>{props.issue}</p>
      <p>{props.ticketId}</p>
      <hr/>
    </div>;

  if (props.currentRouterPath === '/admin') {
    return (
      <div onClick={() => {handleSavingSelectedTicket(props.ticketId);}}>
      {ticketInfo}
    </div>
    );
  } else {
    return (
      <div>
        {ticketInfo}
      </div>
    );
  }
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string,
  issue: PropTypes.string,
  ticketId: PropTypes.string.isRequired,
  id: PropTypes.string,
  formattedWaitTime: PropTypes.string.isRequired,
  currentRouterPath: PropTypes.string,
  onTicketSelection: PropTypes.func
};

export default connect() (Ticket);
