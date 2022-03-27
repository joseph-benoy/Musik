import { useEffect, useState } from "react";
import { Col, Container,Row } from "react-bootstrap";
import "./all.css";
import React from "react";
import db from "../../../services/db";
import SongList from "../../../elements/SongList";
import { useDispatch, useSelector } from "react-redux";
import { setAllSongs } from "../../../store/slices/songs";

function All() {
    const songs = useSelector((state)=>state.songs);
    const dispatch = useDispatch();
    useEffect(()=>{
        db.all("SELECT * FROM ALL_SONGS",(error,rows)=>{
            if(!error){
                dispatch(setAllSongs(rows))
            }
        })
    },[songs.reload]);
    return ( 
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <SongList songs={songs.allSongs}/>
                    </Col>
                </Row>
            </Container>
        </>
     );
}

export default All;