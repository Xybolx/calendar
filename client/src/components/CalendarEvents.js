import React, { useState, useEffect } from 'react';
import moment from 'moment';
import API from '../utils/API';

const CalendarEvents = props => {

    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(() => {
        API.getCalendarEvents()
            .then(res => setCalendarEvents(res.data))
            .catch(err => console.log(err));
    }, []);

    const mappedCalendarEvents = calendarEvents && calendarEvents.reverse().map(calendarEvent => (
        <li key={calendarEvent._id} className="card">
            <div className="card-header" data-toggle="collapse" data-target={`#collapseExample${calendarEvent._id}`} aria-expanded="false">
                {moment(calendarEvent.eventDate).format("MMMM Do YYYY")}
            </div>
            <div id={`collapseExample${calendarEvent._id}`} className="collapse card-body">
                <div>
                    <h5>{calendarEvent.eventTime}</h5>
                    <div>
                        <h4 className="text-danger">{calendarEvent.eventLocation}</h4>
                        <p className="text-muted">{calendarEvent.eventDescription}</p>
                    </div>
                </div>
            </div>
        </li>
    ));

    return (
        <div className="jumbotron">
            <ul className="list-group">
            {mappedCalendarEvents ? mappedCalendarEvents : "No Events Found"} 
            </ul>
        </div>
    );
};

export default CalendarEvents;