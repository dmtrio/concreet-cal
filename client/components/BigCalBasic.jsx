import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import * as CalendarModel from '../models/calendar.js';
<<<<<<< HEAD
import FreeTimeSlotsModal from './FreeTimeSlotsModal.jsx';
import findFreeTimes from '../models/findFreeTimes.js';
import AddEvent from './AddEvent.jsx';
=======
// import events from './events'; old dummy data
>>>>>>> 731b9cdf989930ee1585c03fe2b1fc3959ff37b2

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

class BigCalBasic extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      events: [],
      availableSlots: [],
      displayModal: false,
      selectedDate: undefined,
      eventDateTime: undefined,
      eventTitle: '',
      meetingLength: 0
=======
      events: []
>>>>>>> 731b9cdf989930ee1585c03fe2b1fc3959ff37b2
    }

    this.renderEventsToCalendar();
  }




  // componentWillMount() {
  //   // CalendarModel.getCalendarList(this.props.user.user, (currentUser, calendarList) => {
  //     var calendarList = [];
  //     CalendarModel.getCalendarEvents(this.props.user.user, calendarList, (eventsList) => {
  //       CalendarModel.processEvents(eventsList, (processedEvents) => {
  //         this.setState({
  //           events: processedEvents,
  //         })
  //       })
  //     })
  //   // });
  // }

  renderEventsToCalendar() {
    // CalendarModel.getCalendarList(this.props.user.user, (currentUser, calendarList) => {
    var calendarList = [];
      CalendarModel.getCalendarEvents(this.props.user.user, calendarList, (eventsList) => {
        CalendarModel.processEvents(eventsList, (processedEvents) => {
          this.setState({
            events: processedEvents,
          })
        })
      })
    // });
  }

  updateSlotsAndEventInfo(freeSlots, eventDate, eventTitle, eventLength) {
    this.setState({
      availableSlots: freeSlots,
      displayModal: true,
      selectedDate: eventDate,
      eventTitle: eventTitle,
      meetingLength: eventLength
    })
  }

  // get the selected meeting time in ISO format
  getEventDateTime(isoDateTime) {
    this.setState({
      eventDateTime: isoDateTime
    })
  }

  render(){
    return (
<<<<<<< HEAD
      <div className="calendar">
        <AddEvent
          user={this.props.user}
          updateSlotsAndEventInfo={this.updateSlotsAndEventInfo.bind(this)}
          selectedContacts={this.props.selectedContacts}
          selectedGroups={this.props.selectedGroups}
        />

        <br/>
        <BigCalendar
          {...this.props}
          popup
          events={this.state.events}
          views={allViews}
          titleAccessor='summary'
          defaultDate={new Date()}
        />
        {this.state.displayModal && <FreeTimeSlotsModal
          user={this.props.user}
          availableSlots={this.state.availableSlots}
          selectedDate={this.state.selectedDate}
          getEventDateTime={this.getEventDateTime.bind(this)}
          eventTitle={this.state.eventTitle}
          selectedContacts={this.props.selectedContacts}
          selectedGroups={this.props.selectedGroups}
          meetingLength={this.state.meetingLength}
          renderEventsToCalendar = {this.renderEventsToCalendar.bind(this)}
          />
        }
      </div>
=======
      <BigCalendar
        {...this.props}
        events={this.state.events}
        views={allViews}
        titleAccessor='summary'
        defaultDate={new Date()}
      />
>>>>>>> 731b9cdf989930ee1585c03fe2b1fc3959ff37b2
    )
  }
}


export default BigCalBasic;
