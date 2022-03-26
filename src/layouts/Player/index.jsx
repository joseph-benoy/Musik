import { Col, Row ,Button, Container,Form} from "react-bootstrap";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./player.css"
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pause, play } from "../../store/slices/player";
function Player() {
    const state = useSelector((state)=>state.player)
    const dispatch = useDispatch();
    const [progress,setProgress] = useState(0);
    const audioRef = useRef();
    const toggleAudio = ()=>{
        if(state.play){
            audioRef.current.pause();
            dispatch(pause());
        }
        else{
            dispatch(play());
            audioRef.current.play();
        }
    }
    const updateBar = ()=>{
        setProgress(Math.floor(audioRef.current.currentTime));
    }
    const resetControl = ()=>{
        dispatch(pause());
    }
    const seekAudio = (e)=>{
        setProgress(e.target.value);
        audioRef.current.currentTime = progress;
    }
    const pauseAudioSeeking = ()=>{
        audioRef.current.pause();
    }
    const playAudioSeeking = ()=>{
        audioRef.current.play();
    }
    return (
        <>
            <Container fluid className="playerWrapper">
                <Row>
                    <Col>
                        <h6>{state.audio.title}</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <AudioPlayer
                    src={state.audio.url}
                    onPlay={e => console.log("onPlay")}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Player;