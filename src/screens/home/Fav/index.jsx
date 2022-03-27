import { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { getAllSongs } from "../../../services/getAllSongs";
import "./fav.css";
import React from "react";
import db from "../../../services/db";
import SongList from "../../../elements/SongList";

function Fav() {
    const [songs,setSongs] = useState([]);
    useEffect(()=>{
        let songs = [];
        db.all("SELECT * FROM FAV",(error,rows)=>{
            if(!error){
                setSongs(rows);
            }
        })
    },[])
    return ( 
        <>
            <Container fluid>
                <Row>
                    <Col>
                            <SongList songs={songs} fav/>
                    </Col>
                </Row>
            </Container>
        </>
     );
}

export default React.memo(Fav);