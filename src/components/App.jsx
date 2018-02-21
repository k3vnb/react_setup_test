import React from 'react';
import TicketList from './TicketList';
import Header from './Header';
// import { v1 } from 'uuid';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Admin from './Admin';
import NewTicketControl from './NewTicketControl';
import { connect } from 'react-redux';

class App extends React.Component{
//there is only one state object, w/ multiple key-value pairs. We will mutate individual state slices.
  // constructor(props) {
  //   super(props);
  //   console.log(props);
  //   this.state = {
  //     masterTicketList: {},
  //     selectedTicket: null
  //   };
    // this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
  //   this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  // }

  componentDidMount(){
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime(){
    const { dispatch } = this.props;
    Object.keys(this.props.masterTicketList).map(ticketId => {
      const ticket = this.props.masterTicketList[ticketId];
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = {
        type: 'UPDATE_TIME',
        id: ticketId,
        formattedWaitTime: newFormattedWaitTime
      };
      dispatch(action);
    });
  }

  // handleChangingSelectedTicket(ticketId){
  //   this.setState({selectedTicket: ticketId});
  // } Gone with the redux refactor re: ticket & admin

//Object.assign creates copies of objects & adds new content to those copies in a single method call. It takes 3 args: ({target}, source obj/slice of state we're updating, source obj, source obj/single key-val pair, newTicket.id is the key, and the entire newTicket obj is the value)
  // handleAddingNewTicketToList(newTicket){
  //   let newTicketId = v1();
  //   let newMasterTicketList = Object.assign({}, this.state.masterTicketList, {
  //     [newTicketId]: newTicket
  //   });
  //   newMasterTicketList[newTicketId].formattedWaitTime = newMasterTicketList[newTicketId].timeOpen.fromNow(true);
  //   this.setState({masterTicketList: newMasterTicketList});
  // }
// onNewTicketCreation={this.handleAddingNewTicketToList} <--extracted from Route tag

  render(){
    console.table(this.state.masterTicketList);
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.props.masterTicketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl  />} />
          <Route path='/admin' render={(props)=><Admin  currentRouterPath={props.location.pathname}
          />} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList
  };
};

App.propTypes = {
  masterTicketList: PropTypes.object
};

export default withRouter(connect(mapStateToProps) (App));
