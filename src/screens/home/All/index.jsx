import { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { getAllSongs } from "../../../services/getAllSongs";
import "./all.css";
import React from "react";
import db from "../../../services/db";

function All() {
    const [songs,setSongs] = useState([]);
    useEffect(()=>{
        let songs = [];
        db.all("SELECT * FROM ALL_SONGS",(error,rows)=>{
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
                        <ListGroup>
                            {
                                songs.map((song)=>(
                                    <ListGroupItem>{song.TITLE}</ListGroupItem>
                                ))
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
     );
}

export default All;