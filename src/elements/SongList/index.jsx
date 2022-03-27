import { ListGroup,ListGroupItem,Button } from "react-bootstrap";
import "./songlist.css";
import React from "react";
import { Heart, Trash } from "react-bootstrap-icons";
function SongList({songs}) {
    return ( 
        <ListGroup className="songListWrapper">
        {
            songs.map((song)=>(
                <ListGroupItem action as="li"
                className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        {song.TITLE}
                    </div>
                    <Button variant="link"><Heart/></Button>
                    <Button variant="link"><Trash/></Button>
                </ListGroupItem>
            ))
        }
        </ListGroup>
     );
}

export default SongList;