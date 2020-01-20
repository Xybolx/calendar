import React, { useState, useEffect } from "react";
import useForm from './useForm';
import axios from 'axios';
import useSpeechRecognition from "./useSpeechRecognition";
import API from '../utils/API';
import CalendarEventsView from "./CalendarEventsView";

const Dictation = () => {

    const [value, setValue] = useState("");

    const [calendarEvent, setCalendarEvent] = useState({
        event: "",
        eventDate: ""
    });

    const [isSpeaking, setIsSpeaking] = useState(false);

    const onEnd = () => {
        handleSubmit(calendarEvent);
        setIsSpeaking(false);
        console.log("end");
    };
    
    const onResult = result => {
        setCalendarEvent({
            event: result,
            eventDate: Date.now()
        });
        setValue(result);
        setIsSpeaking(true);
        
        // if (result.includes("I love you")) {
        // }
        console.log(result);
    };

    // useEffect(() => {
    //     if (value.includes("save")) {
    //     }
    // }, []);

    const { listen, listening, stop, supported } = useSpeechRecognition({ onResult, onEnd });

    // useSpeech(calendarEvent, isSpeaking);

    const toggle = 
    listening && isSpeaking ? 
        () => {
            stop();
            setIsSpeaking(false);
        }
        : () => {
            listen();
        }

    const handleSubmit = ev => {
        // ev.preventDefault();
        if (calendarEvent !== {}) {
            axios.post("/api/calendarEvents", calendarEvent)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        } else {
            console.log("nothing to save");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} id="speech-recognition-form">
                {!supported && (
                    <p>Oh no, it looks like your browser doesn&#39;t support Speech Recognition.</p>
                )}
                {supported && (
                    <>
                        <p>
                            Click 'Start Listening' and then start speaking. 
                            SpeechRecognition will provide a transcript of what you are saying.
                        </p>
                        {/* <input
                           id="eventDate"
                           className="input"
                           name="date"
                           value={Date.now()}
                           placeholder="Event Date"  
                        /> */}
                        <textarea
                            readOnly
                            id="transcript"
                            className="container text-center"
                            name="transcript"
                            placeholder="Waiting for you to speak..."
                            value={value}
                            rows={8}
                        />
                    </>
                )}
            </form>
            <button type="button" className="btn btn-outline-dark" onClick={toggle}><i className="fas fa-microphone-alt" /> {listening ? 'Stop Listening' : 'Start Listening'}</button>
            <span className="container"><i className="fas fa-volume-up" /> {isSpeaking ? 'Speaking' : 'Not Speaking'}</span>
            <CalendarEventsView />
        </div>
    );
};

export default Dictation;