import React, { useState, useEffect } from 'react';

const ResumeResult = props => {

    const [result, setResult] = useState([]);

    const [el, setEl] = useState([]);

    useEffect(() => {
        setResult(props.data);
        document.getElementById("wrapper").insertAdjacentHTML("beforeend", result);
    }, [props.data, result]);

    return (
        <div id="wrapper" className="container-fluid text-center">{result}</div>
    );
};

export default ResumeResult;
