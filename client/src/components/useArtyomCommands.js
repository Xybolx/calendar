import { useState, useEffect, useRef, useCallback } from 'react';
import moment from 'moment';

const useArtyomCommands = (artyomInstance, stopAssistant, handleSubmit, values, setValues) => {

    let Artyom = useRef(artyomInstance);

    Artyom = Artyom.current;

    const [visible, setVisible] = useState(false);

    const [value, setValue] = useState("");

    const onEnd = () => {
        console.log("end" + value);
    };
    
    const onResult = result => {
        setValue(result);
    };

    // Execute the loadCommands method to inject the methods to the instance of Artyom
    const loadCommands = useCallback(() => {

        // Here you can load all the commands that you want to Artyom
        return Artyom.addCommands([
            {
                indexes: ["Hello", "screw you"],
                action: (i) => {
                    switch (true) {
                        case i === 0:
                            Artyom.say("How are you, asshole?");
                            break;
                        case i === 1:
                            Artyom.say("Screw you too, asshole!");
                            break;
                        default:
                            console.log(i);
                            break;
                    }
                }
            },
            {
                indexes: ["What is the date", "What is tomorrow's date"],
                action: (i, wildcard) => {
                    switch (true) {
                        case i === 0:
                            Artyom.say("The date is" + moment().format('MMMM, Do, YYYY'));
                            break;
                        case i === 1:
                            Artyom.say("Tomorrow's date is" + moment().add(1, 'days').format('MMMM, Do, YYYY'));
                            break;
                        default:
                            console.log(i);
                            break;
                    }
                }
            },
            {
                indexes: ["Access calendar for *", "Access calendar for *", "access location *", "access time *", "access description *"],
                smart: true,
                action: (i, wildcard) => {
                    switch (true) {
                        case i === 0:
                            let now = moment().format('M/D/YYYY');
                            Artyom.say("Yes,  master. Accessing calendar for" + wildcard + now);
                            setValues(values => ({ ...values, date: now }));
                            setVisible(true);
                            break;
                        case i === 1:
                            Artyom.say("Yes,  master. Accessing calendar for" + wildcard + moment().add(1, 'days').format('M, D, YYYY'));
                            // setDate(moment().add(1, 'days').format('M/D/YYYY'));
                            setVisible(true);
                            break;
                        case i === 2:
                            Artyom.say("Yes,  master. setting location to" + wildcard);
                            setValues(values => ({ ...values, location: wildcard })); 
                            setVisible(true);
                            break;
                        case i === 3:
                            Artyom.say("Yes,  master. setting time to" + wildcard);
                            setValues(values => ({ ...values, time: wildcard }));
                            setVisible(true);
                            break;
                        case i === 4:
                            Artyom.say("Yes,  master. setting description to" + wildcard);
                            setValues(values => ({ ...values, description: wildcard }));
                            setVisible(true);
                            break;
                        default:
                            console.log(i);
                            setVisible(false);
                            break;
                    }

                }
            },
            {
                indexes: ['shut down', 'save event'],
                action: (i) => {
                    if (i === 0) {
                        stopAssistant();
                    }
                    if (i === 1) {
                        handleSubmit(values);
                    }
                }
            },
        ]);
    }, [stopAssistant, handleSubmit, setValues, values]);

    useEffect(() => {
        loadCommands();
    }, [loadCommands]);

    return [visible, setVisible];
};

export default useArtyomCommands;