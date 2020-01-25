import { useState, useEffect, useRef, useCallback } from 'react';
import API from '../utils/API';
import moment from 'moment';

const useArtyomCommands = (JarvisInstance, stopAssistant, setValues, clickSubmit, getTomorrowsDate) => {

    let Jarvis = useRef(JarvisInstance);

    Jarvis = Jarvis.current;

    const [visible, setVisible] = useState(false);

    const [value, setValue] = useState("");

    const onEnd = () => {
        console.log("end" + value);
    };
    
    const onResult = result => {
        setValue(result);
    };

    // Execute the loadCommands method to inject the methods to the instance of Jarvis
    const loadCommands = useCallback(() => {

        // Here you can load all the commands that you want to Jarvis
        return Jarvis.addCommands([
            {
                // Non-smart commands
                indexes: ["Hello", "screw you", "you suck", "who is the docker commander", "did you know that robot means slave", "the boss is coming", "what do you know about angel", "shut down", "save event", "hide the calendar"],
                action: (i) => {
                    switch (true) {
                        case i === 0:
                            Jarvis.say("How are you, sir?");
                            break;
                        case i === 1:
                            Jarvis.say("Screw you too, sir!");
                            break;
                        case i === 2:
                            Jarvis.say("That's not very nice sir.");
                            break;
                        case i === 3:
                            Jarvis.say("Why you are sir.");
                            break;
                        case i === 4:
                            Jarvis.say("you're just trying to scare me sir.");
                            break;
                        case i === 5:
                                const compliments = ["sure are looking sharp", "sure do smell terrific", "sure are leading exceptionally well", "are looking particularly handsome in a totally plutonic context", "should give Web Services a raise for their hard work"];
                                const indexOfCompliment = Math.floor(Math.random() * compliments.length);
                                const randomCompliment = compliments[indexOfCompliment];
                                Jarvis.say(`Nathan, you ${randomCompliment} today`);
                            break;
                        case i === 6:
                                const insults = ["is trying to steal our healthcare", "is trying to steal our jobs", "has a habit of going off on a tangent", "has a human offspring named Lexy", "is the reg ex commander"];
                                const indexOfInsult = Math.floor(Math.random() * insults.length);
                                const randomInsult = insults[indexOfInsult];
                                Jarvis.say(`Angel ${randomInsult}`);
                            break;
                        case i === 7:
                            stopAssistant();
                            break;
                        case i === 8:
                            clickSubmit();
                            Jarvis.say("Yes, sir. Saving event.");
                            break;
                        case i === 9:
                            setVisible(false);
                            Jarvis.say("Yes, sir. Hiding the calendar.");
                        break;
                        default:
                            console.log(i);
                            break;
                    }
                }
            },
            
            {
                // Smart commands 
                indexes: ["Access calendar for *", "Access * calendar", "access location *", "access time *", "access description *"],
                smart: true,
                action: (i, wildcard) => {
                    switch (true) {
                        case i === 0:
                            const now = moment().format('M/D/YYYY');
                            Jarvis.say("Accessing calendar for" + wildcard);
                            setValues(values => ({ ...values, date: now }));
                            setVisible(true);
                            break;
                        case i === 1:
                            Jarvis.say("Accessing" + wildcard + "calendar");
                            getTomorrowsDate();
                            setVisible(true);
                            break;
                        case i === 2:
                            Jarvis.say("Yes,  sir. setting location to" + wildcard);
                            setValues(values => ({ ...values, location: wildcard })); 
                            break;
                        case i === 3:
                            Jarvis.say("Yes,  sir. setting time to" + wildcard);
                            setValues(values => ({ ...values, time: wildcard }));
                            break;
                        case i === 4:
                            Jarvis.say("Yes,  sir. setting description to" + wildcard);
                            setValues(values => ({ ...values, description: wildcard }));
                            break;
                        default:
                            console.log(i);
                            setVisible(false);
                            break;
                    }
                }
            },
        ]);
    }, [stopAssistant, setValues, clickSubmit, getTomorrowsDate]);

    useEffect(() => {
        loadCommands();
    }, [loadCommands]);

    return [visible, setVisible];
};

export default useArtyomCommands;