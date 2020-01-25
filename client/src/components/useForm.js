import { useState } from 'react';

const useForm = () => {

    // values
    const [values, setValues] = useState({});

    // handle change
    const handleChange = ev => {
        ev.persist();
        const { name, value } = ev.target;
        setValues(values => ({ ...values, [name]: value }));
    };

    // handle clear form
    const handleClearForm = () => {
        setValues({});
    };

    return {
      values,
      setValues, 
      handleChange,  
      handleClearForm
    };

};

export default useForm;