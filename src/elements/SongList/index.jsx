import { ListGroup,ListGroupItem } from "react-bootstrap";
import "./songlist.css";
import React from "react";
function SongList({songs}) {
    return ( 
        <ListGroup className="songListWrapper">
        {
            songs.map((song)=>(
                <ListGroupItem>{song.TITLE}</ListGroupItem>
            ))
        }
        </ListGroup>
     );
}

export default SongList;