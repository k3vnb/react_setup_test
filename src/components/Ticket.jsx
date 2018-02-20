import React from 'react';
import PropTypes from 'prop-types';

function Ticket(props){
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
      <div onClick={() => {props.onTicketSelection(props.ticketId);}}>
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

export default Ticket;
