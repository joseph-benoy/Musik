import { useState } from "react";
import { Col, Container, Row,FormControl,InputGroup, Button} from "react-bootstrap";
import { Play, Search } from "react-bootstrap-icons";
import "./add.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { load } from "../../../store/slices/player";
import {FolderPlus} from "react-bootstrap-icons";
import { reload } from "../../../store/slices/songs";
import db from "../../../services/db";

const youtubedl = window.require('youtube-dl-exec');

function Add() {
    const [isLoading,setLoading] = useState(false);
    const [isLoaded,setLoaded] = useState(false);
    const [url,setUrl] = useState("https://www.youtube.com/watch?v=RDsxlv0z8vo");
    const dispatch = useDispatch();
    const state = useSelector((state)=>state.player);
    const loadAudio = ()=>{
        if(url.length>0){
            setLoading(true);
            youtubedl(url, {
                dumpSingleJson: true,
                noWarnings: true,
                noCallHome: true,
                noCheckCertificate: true,
                preferFreeFormats: true,
                youtubeSkipDashManifest: true,
                referer: 'https://www.youtube.com/watch?v=6xKWiCMKKJg'
                }).then((output)=>{
                    setLoading(false);
                    setLoaded(true);

                    let audioObjects = output.requested_formats.filter((item)=>(item.format.includes("audio only")))
                    const audioData = {
                        title:output.title,
                        duration:output.duration,
                        thumbnail:output.thumbnail,
                        url:audioObjects[0].url
                    }
                    dispatch(load(audioData))
                })
                .catch((e)=>{
                    setLoading(false);
                    setLoaded(false);
                    alert("Couldn't find the song!");
                })
        }
        else{
            alert("Invalid Youtube URL!");
        }
    }
    const AddToLib = (title,url)=>{
        let stmt = db.prepare('INSERT INTO ALL_SONGS(TITLE,URL) VALUES(?,?)');
        stmt.run(title,url,(error)=>{
            if(error){
                alert("Couldn't add song to the library!");
            }
            else{
                stmt.finalize();
                alert("Added "+title+" to the library");
                dispatch(reload());
            }
        })
    }
    return ( 
        <Container className="addWrapper">
            <Row>
                <Col>
                <InputGroup className="mb-3">
                    <FormControl value={url} type="url" placeholder="Valid Youtube URL" onChange={(e)=>setUrl(e.target.value)}/>
                    <Button variant="primary" onClick={loadAudio}>
                        <Play/>
                    </Button>
                </InputGroup>
                </Col>
            </Row>
            <Row>
                {
                    isLoading?<Col><img className="addSpinner" src="assets/spinners/spinner1.gif" alt="spinner"/></Col>:null
                }
                {
                    !isLoaded&&!isLoading?<Col>
                        <Search/>
                        <p>Search for a song</p>
                    </Col>:null
                }
                {
                    isLoaded?<>
                    <img className="thumbnail" src={state.audio.thumbnail} alt="youtube-thumbnail"/>
                </>:null
                }
            </Row>
            <Row>
                <Col>
                    {isLoaded?<Button onClick={()=>AddToLib(state.audio.title,url)} variant="primary" className="addToLib"><FolderPlus/>Add to library</Button>:null}
                </Col>
            </Row>
        </Container>
     );
}

export default Add;