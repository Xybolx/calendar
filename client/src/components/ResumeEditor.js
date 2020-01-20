import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import ResumeResult from './ResumeResult';

const ResumeEditor = () => {

    const [result, setResult] = useState([]);
    const [finalResult, setFinalResult] = useState([]);

    return (
        <div className="container-fluid">
            <div className="text-center col-md-6 offset-md-3">
            <h2>Resume Editor</h2>
            </div>
            <CKEditor
                onInit={ editor => {
                    console.log( 'Editor is ready to use!', editor );

                    // Insert the toolbar before the editable area.
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                } }
                editor={ DecoupledEditor }
                onChange={ ( ev, editor ) => {
                    const data = editor.getData();
                    setResult(data);
                    const replacedDash = data.replace(/-/g, '');
                    // const replacedLower = replacedDash.replace(/a/g, "A");
                    const replacedA = replacedDash.replace(/style=/g, "className=");
                    const replacedAlign = replacedA.replace(/align/g, '');
                    const replacedColon = replacedAlign.replace(/:/g, "-");
                    const final = replacedColon.replace(/;/g, "");
                    setFinalResult(final);
                } }
                onBlur={ ( ev, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( ev, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
            <ResumeResult data={finalResult} />
        </div>
    );
};

export default ResumeEditor;