import React, { useState, useEffect, useRef } from 'react';
import '../scss/voice.scss';
import closedBox from '../images/closed-box.svg';
import openBox from '../images/open-box.svg';
const Voice = () => {
    const [recognition, setRecognition] = useState();
    const [transcript, setTranscript] = useState();
    const [canTalk, setCanTalk] = useState(false);
    const imgRef = useRef();
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
            if (transcript === 'open') {
                imgRef.current.src = openBox;
            }
            else
                if (transcript === 'close') {
                    imgRef.current.src = closedBox;

                }
            setTranscript(transcript);
            setCanTalk(false);
        }
    }, [])
    const startTalk = () => {
        recognition.start();
    }
    return (<div className="voice">
        <button className="talk-btn" disabled={canTalk} onClick={startTalk}>
            {canTalk ? 'im listening' : 'press to talk'}
        </button>


        <img ref={imgRef} className="box" src={closedBox} alt="" />
    </div>);
}

export default Voice;