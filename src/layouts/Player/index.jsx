import { Col, Row ,Container} from "react-bootstrap";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./player.css"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextAll, nextFav, resetAllCount, resetFavCount} from "../../store/slices/player";
import { toggleLoading ,setAllCount,setFavCount} from "../../store/slices/player";
import { load } from "../../store/slices/player";


const youtubedl = window.require('youtube-dl-exec');


function Player() {
    const state = useSelector((state)=>state.player)
    const songs = useSelector((state)=>state.songs)
    const dispatch = useDispatch();
    let song;
    var fav = false;
    const nextSong = ()=>{
        if(state.counter.all!==-1){
            dispatch(nextAll());
            song = songs.allSongs[state.counter.all+1];
        }
        else{
            fav=true;
            dispatch(nextFav());
            song = songs.fav[state.counter.fav+1];
        }
        dispatch(toggleLoading());
        try{
            youtubedl(song.URL, {
                dumpSingleJson: true,
                noWarnings: true,
                noCallHome: true,
                noCheckCertificate: true,
                preferFreeFormats: true,
                youtubeSkipDashManifest: true,
                referer: 'https://www.youtube.com/watch?v=6xKWiCMKKJg'
                }).then((output)=>{
    
                    let audioObjects = output.requested_formats.filter((item)=>(item.format.includes("audio only")))
                    const audioData = {
                        title:output.title,
                        duration:output.duration,
                        thumbnail:output.thumbnail,
                        url:audioObjects[0].url
                    }
                    dispatch(load(audioData))
                    dispatch(toggleLoading());
                })
                .catch((e)=>{
                    alert("Couldn't find the song!");
                })
        }
        catch(e){
            let temp;
            if(fav){
                dispatch(setFavCount(0));
                temp = songs.fav[0];
            }
            else{
                dispatch(setAllCount(0));
                temp = songs.allSongs[0];
            }
            if(state.repeat){            
                youtubedl(temp.URL, {
                dumpSingleJson: true,
                noWarnings: true,
                noCallHome: true,
                noCheckCertificate: true,
                preferFreeFormats: true,
                youtubeSkipDashManifest: true,
                referer: 'https://www.youtube.com/watch?v=6xKWiCMKKJg'
                }).then((output)=>{
    
                    let audioObjects = output.requested_formats.filter((item)=>(item.format.includes("audio only")))
                    const audioData = {
                        title:output.title,
                        duration:output.duration,
                        thumbnail:output.thumbnail,
                        url:audioObjects[0].url
                    }
                    dispatch(load(audioData))
                    dispatch(toggleLoading());
                })
                .catch((e)=>{
                    alert("Couldn't find the song!");
                })
            }
        }
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
                    showJumpControls
                    src={state.audio.url}
                    onEnded={nextSong}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Player;