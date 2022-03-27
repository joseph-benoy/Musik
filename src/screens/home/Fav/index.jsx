import { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { getAllSongs } from "../../../services/getAllSongs";
import "./fav.css";
import React from "react";
import db from "../../../services/db";
import SongList from "../../../elements/SongList";
import { useDispatch,useSelector } from "react-redux";
import { setFav } from "../../../store/slices/songs";

function Fav() {
    const [reload,setReload] = useState(false);
    const songs = useSelector((state)=>state.songs);
    const dispatch = useDispatch();
    useEffect(()=>{
        db.all("SELECT * FROM FAV",(error,rows)=>{
            if(!error){
                dispatch(setFav(rows));
            }
        })
    },[songs.reload])
    return ( 
        <>
            <Container fluid>
                <Row>
                    <Col>
                            <SongList songs={songs.fav} fav/>
                    </Col>
                </Row>
            </Container>
        </>
     );
}

export default React.memo(Fav);