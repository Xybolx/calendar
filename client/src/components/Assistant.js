import React, { useState, useEffect } from 'react';
import moment from 'moment';
import useForm from './useForm';
import API from '../utils/API';

// Import the Artyom library
import Artyom from 'artyom.js';

// Import the previously created class to handle the commands from another file
import useArtyomCommands from './useArtyomCommands.js';
import CalendarEvents from './CalendarEvents.js';

// Create a "globally" accesible instance of Artyom
const Jarvis = new Artyom();

export const Assistant = props => {
        
        const [artyomActive, setArtyomActive] = useState(false);

        const [todaysCalendarEvents, setTodaysCalendarEvents] = useState(true);

        // const [date, setDate] = useState("");

        // const [location, setLocation] = useState("");

        // const [time, setTime] = useState("");

        // const [description, setDescription] = useState("");

        const [values, setValues] = useState({
            date: "",
            location: "",
            time: "",
            description: ""
        });

        const { date, location, time, description } = values;
        
        const startAssistant = () => {

            console.log("Artyom succesfully started !");
            
            Jarvis.initialize({
                lang: "en-GB",
                debug: true,
                continuous: true,
                soundex: true,
                listen: true,
                name: "Jarvis",
            }).then(() => {
                // Display loaded commands in the console
                console.log(Jarvis.getAvailableCommands());
                console.log("active clicked!");
                
                Jarvis.say("Ready to serve you");

            setArtyomActive(true);
        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen !", err);
        });
    };

    const stopAssistant = () => {

        Jarvis.fatality().then(() => {
            Jarvis.say("Yes sir. Shutting down.")
            console.log("Jarvis has been succesfully stopped");
            Jarvis.emptyCommands();

            setArtyomActive(false);
            
        })
            .then(() => console.log("active clicked!"))
            .catch((err) => {
                console.error("Oopsy daisy, this shouldn't happen neither!", err);

                setArtyomActive(false);
            });
    };

    useEffect(() => {
        startAssistant();
    }, []);

    // const handleChange = ev => {
    //     ev.persist();
    //     const { name, value } = ev.target;
    //     setValues(values => ({ ...values, [name]: value }));
    // };

    const handleSubmit = ev => {
        ev.preventDefault();
        if (date && location && time && description) {
            API.saveCalendarEvent({
                eventDate: date,
                eventLocation: location,
                eventTime: time,
                eventDescription: description
            }).then(res => handleClearForm())
            .then(() => setVisible(false))
            .catch(err => console.log(err));
        }
    };
    
    const { handleChange, handleClearForm } = useForm();

    const clickSubmit = () => {
        const subBtn = document.getElementById('submit');
        subBtn.click();
    };

    const clickActive = () => {
        const activeBtn = document.getElementById('artyomActive');
        activeBtn.click();
    };

    const getTodaysDate = () => {
        setValues(values => ({ ...values, date: moment().format('M/D/YYYY') }));
    };

    const getTomorrowsDate = () => {
        setValues(values => ({ ...values, date: moment().add(1, 'd').format('M/D/YYYY') }));
    };

    const toggleTodaysCalendarEvents = () => {
        setTodaysCalendarEvents(!todaysCalendarEvents);
    };

    // Send custom assistant name and load commands into Artyom
    const [visible, setVisible] = useArtyomCommands(Jarvis, stopAssistant, setValues, clickSubmit, getTomorrowsDate);

        return (
            <div>
                <h1>Welcome to Jarvis Assistant</h1>
                <div className="container">
                    <img className="img-fluid rounded-circle" src="BAHO.gif" alt="butler pic" />
                </div>
                <div>
                    <strong>Current Calendar Date:&nbsp;</strong>
                    {date ? date : "No Date Selected"}
                </div>
                {/* Voice commands action buttons */}
                <div className="btn-group btn-group-lg btn-block container" role="group" aria-label="Jarvis Control Buttons">
                    <button className={artyomActive ? "btn btn-outline-danger" : "btn btn-outline-success"} id="artyomActive" onClick={artyomActive ? stopAssistant : startAssistant}>{artyomActive ? "Stop" : "Start"}</button>
                    <button className={todaysCalendarEvents ? "btn btn-outline-info" : "btn btn-outline-info"} id="todaysCalendar" onClick={toggleTodaysCalendarEvents}>{todaysCalendarEvents ? "Today" : !todaysCalendarEvents ? "All" : "Toggle Events"}</button>
                </div>
                {/* <button id="today" onClick={getTodaysDate}>Today</button>
                <button id="tomorrow" onClick={getTomorrowsDate}>Tomorrow</button> */}
                <div style={visible ? { display: "block" } : { display: "none" }}>
                    <h3>New Calendar Event</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                id="date"
                                value={date}
                                name="date"
                                placeholder="date"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="location"
                                value={location}
                                name="location"
                                placeholder="location"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="time"
                                value={time}
                                name="time"
                                placeholder="time"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="description"
                                value={description}
                                name="description"
                                placeholder="description"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button id="submit" type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
                <CalendarEvents todaysCalendarEvents={todaysCalendarEvents} />
            </div>
        )
    }