import React from 'react';
import TicketList from './TicketList';
import Header from './Header';
import { v1 } from 'uuid';
import { Switch, Route } from 'react-router-dom';
import Moment from 'moment';
import Admin from './Admin';
import NewTicketControl from './NewTicketControl';

class App extends React.Component{
//there is only one state object, w/ multiple key-value pairs. We will mutate individual state slices.
  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    };
    // this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  }

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
    let newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    Object.keys(newMasterTicketList).forEach(ticketId => {
      newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
    });
    //WHEN IT WAS AN ARRAY --> newMasterTicketList.forEach((ticket) =>
    //   ticket.formattedWaitTime = (ticket.timeOpen).fromNow(true)
    // );
    this.setState({masterTicketList: newMasterTicketList});
  }

  handleChangingSelectedTicket(ticketId){
    this.setState({selectedTicket: ticketId});
  }

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
          <Route exact path='/' render={()=><TicketList ticketList={this.state.masterTicketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl  />} />
          <Route path='/admin' render={(props)=><Admin ticketList={this.state.masterTicketList} currentRouterPath={props.location.pathname}
          onTicketSelection={this.handleChangingSelectedTicket}
          selectedTicket={this.state.selectedTicket}/>} />
        </Switch>
      </div>
    );
  }
}

export default App;
