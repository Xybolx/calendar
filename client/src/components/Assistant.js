import React, { useState, useEffect } from 'react';
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
                executionKeyword: "execute"
            }).then(() => {
                // Display loaded commands in the console
                console.log(Jarvis.getAvailableCommands());
                
                Jarvis.say("Ready to serve you");

            setArtyomActive(true);
        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen !", err);
        });
    };

    const stopAssistant = () => {

        Jarvis.fatality().then(() => {
            console.log("Jarvis has been succesfully stopped");
            Jarvis.emptyCommands();

            setArtyomActive(false);
            
        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen neither!", err);

            setArtyomActive(false);
        });
    };

    const handleChange = ev => {
        ev.persist();
        const { name, value } = ev.target;
        setValues(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = values => {
        // ev.preventDefault();
        API.saveCalendarEvent({
            eventDate: values.date,
            eventLocation: values.location,
            eventTime: values.time,
            eventDescription: values.description
        });
        handleClearForm();
        setVisible(false);
    };
    
    // Send custom assistant name and load commands into Artyom
    const [visible, setVisible] = useArtyomCommands(Jarvis, stopAssistant, handleSubmit, values, setValues);
    
    
    const { handleClearForm } = useForm();

        return (
            <div>
                <h1>Welcome to Jarvis Assistant</h1>
                
                {/* Voice commands action buttons */}
                <input type="button" value="Start Jarvis" disabled={artyomActive} onClick={startAssistant}/>
                <input type="button" value="Stop Jarvis" disabled={!artyomActive} onClick={stopAssistant}/>

                {/* Speech synthesis Area */}

                {/* <p>I can read some text for you if you want:</p> */}
                
                {/* <textarea rows="5" onChange={handleTextAreaChange} value={textAreaValue}/> */}
                {/* <br/> */}
                {/* Read the text inside the textarea with artyom */}
                {/* <input type="button" value="Read Text" disabled={artyomIsReading} onClick={speakText}/> */}
                <div style={visible ? { display: "block" } : { display: "none" }}>
                <h3>New Calendar Event</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        id="date"
                        value={date || ""}
                        name="date"
                        placeholder="date"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        id="location"
                        value={location || ""}
                        name="location"
                        placeholder="location"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        id="time"
                        value={time || ""}
                        name="time"
                        placeholder="time"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        id="description"
                        value={description || ""}
                        name="description"
                        placeholder="description"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
                </form>
                </div>
                <CalendarEvents />
            </div>
        )
    }