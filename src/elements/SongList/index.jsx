import { ListGroup,ListGroupItem,Button } from "react-bootstrap";
import "./songlist.css";
import React from "react";
import { Heart, Trash } from "react-bootstrap-icons";
import db from "../../services/db";
function SongList({songs,fav,reload}) {
    const deleteSong = (url)=>{
        const st = db.prepare("DELETE FROM ALL_SONGS WHERE URL=?");
        st.run(url,(error)=>{
            if(error){
                alert("Couldn't remove the song!");
            }
            else{
                alert("Removed the song!");
                reload();
            }
        })
    }
    const addFav = (title,url)=>{
        const st = db.prepare("INSERT INTO FAV(TITLE,URL) VALUES(?,?)");
        st.run(title,url,(error)=>{
            if(error){
                alert("Couldn't add the song!");
            }
            else{
                alert("Added "+title+" to favourates!");
                reload();
            }
        })
    }
    const removeFav = (url)=>{
        const st = db.prepare("DELETE FROM FAV WHERE URL=?");
        st.run(url,(error)=>{
            if(error){
                alert("Couldn't remove the song!");
            }
            else{
                alert("Removed the song from favourates!");
                reload();
            }
        })
    }
    return ( 
        <ListGroup className="songListWrapper">
        {
            songs.map((song)=>(
                <ListGroupItem action as="li"
                className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        {song.TITLE}
                    </div>
                    {!fav?<Button variant="link" onClick={()=>addFav(song.TITLE,song.URL)}><Heart/></Button>:null}
                    <Button variant="link" onClick={fav?()=>removeFav(song.URL):()=>deleteSong(song.URL)}><Trash/></Button>
                </ListGroupItem>
            ))
        }
        </ListGroup>
     );
}

export default SongList;