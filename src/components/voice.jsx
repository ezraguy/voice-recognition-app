import React, { useState, useEffect } from 'react';
const Voice = () => {
    const [recognition, setRecognition] = useState();
    const [transcript, setTranscript] = useState();
    const [canTalk, setCanTalk] = useState(false);
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        setRecognition(recognition);
        recognition.onstart = (e) => {
            setCanTalk(true);
        }
        recognition.onresult = (e) => {
            const current = e.resultIndex;
            const transcript = e.results[current][0].transcript;
            setTranscript(transcript);
            setCanTalk(false);
        }
    }, [])
    const startTalk = () => {
        recognition.start();
    }
    return (<div className="Voice">
        <button disabled={canTalk} onClick={startTalk}>Talk</button>
        <h3>{transcript}</h3>
    </div>);
}

export default Voice;