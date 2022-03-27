import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { getAllSongs } from "../../../services/getAllSongs";
import "./all.css";
import React from "react";

function All() {
    const [songs,setSongs] = useState([]);
    useEffect(()=>{
        getAllSongs();
    },[])
    return ( 
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <ListGroup>
                            {

                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
     );
}

export default All;