import React, { useState, useEffect } from 'react';
import moment from 'moment';
import API from '../utils/API';

const CalendarEvents = ({ todaysCalendarEvents }) => {

    const [calendarEvents, setCalendarEvents] = useState([]);

    const deleteEvent = id => {
        API.deleteCalendarEvent(id)
            .then(res => API.getCalendarEvents())
            .catch(err => console.log(err));
    };

    useEffect(() => {
        API.getCalendarEvents()
            .then(res => setCalendarEvents(res.data))
            .catch(err => console.log(err));
        }, [calendarEvents]);
        
    useEffect(() => {
        // Accepts the array and key
    const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };
  
  // Group by color as key to the person array
  const eventsGroupedByDay = groupBy(calendarEvents, 'eventDate');
  }, [calendarEvents]);

    const filteredCalendarEvents = calendarEvents && calendarEvents.filter(calendarEvent => calendarEvent.eventDate === moment().format('M/D/YYYY'));

    const mappedCalendarEvents = calendarEvents && calendarEvents.map(calendarEvent => (
        <li key={calendarEvent._id} className={ calendarEvent.eventDate === moment().format('M/D/YYYY') ? "card border border-danger text-danger my-2" : calendarEvent.eventDate === moment().add(1, 'd').format('M/D/YYYY') ? "card border border-warning text-warning my-2" : "card border border-success text-success my-2" }>
            <div className="card-header" aria-expanded="false">
                <button className={ calendarEvent.eventDate === moment().format('M/D/YYYY') ? "btn btn-outline-danger btn-sm" : calendarEvent.eventDate === moment().add(1, 'd').format('M/D/YYYY') ? "btn btn-outline-warning btn-sm" : "btn btn-outline-success btn-sm" } data-toggle="collapse" data-target={`#collapseExample${calendarEvent._id}`}>Show/Hide</button>
                &nbsp;{calendarEvent.eventDate} @ {calendarEvent.eventTime}
            </div>
            <div id={`collapseExample${calendarEvent._id}`} className="collapse card-body">
                <div>
                    <div>
                        <h4 className="text-weight-bold text-muted">{calendarEvent.eventLocation}</h4>
                        <p className="text-muted">{calendarEvent.eventDescription}</p>
                        <div className="text-right">
                            <button className="btn btn-warning btn-sm" onClick={() => deleteEvent(calendarEvent._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    ));

    const currentDaysCalendarEvents = calendarEvents && filteredCalendarEvents.map(calendarEvent => (
        <li key={calendarEvent._id} className={ calendarEvent.eventDate === moment().format('M/D/YYYY') ? "card border border-danger text-danger my-2" : calendarEvent.eventDate === moment().add(1, 'd').format('M/D/YYYY') ? "card border border-warning text-warning my-2" : "card border border-success text-success my-2" }>
            <div className="card-header" aria-expanded="false">
                <button className={ calendarEvent.eventDate === moment().format('M/D/YYYY') ? "btn btn-outline-danger btn-sm" : calendarEvent.eventDate === moment().add(1, 'd').format('M/D/YYYY') ? "btn btn-outline-warning btn-sm" : "btn btn-outline-success btn-sm" } data-toggle="collapse" data-target={`#collapseExample${calendarEvent._id}`}>Show/Hide</button>
                &nbsp;{calendarEvent.eventDate} @ {calendarEvent.eventTime}
            </div>
            <div id={`collapseExample${calendarEvent._id}`} className="collapse card-body">
                <div>
                    <div>
                        <h4 className="text-weight-bold text-muted">{calendarEvent.eventLocation}</h4>
                        <p className="text-muted">{calendarEvent.eventDescription}</p>
                        <div className="text-right">
                            <button className="btn btn-warning btn-sm" onClick={() => deleteEvent(calendarEvent._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    ));

    return (
        <div className="justify-content-center container">
            <div className="col mt-3">
                <h3>{todaysCalendarEvents ? "Today's Events" : "All Events"}</h3>
                <ul className="list-group">
                    {todaysCalendarEvents ? currentDaysCalendarEvents : !todaysCalendarEvents ? mappedCalendarEvents : "No Event Data"} 
                </ul>
            </div>
        </div>
    );
};

export default CalendarEvents;