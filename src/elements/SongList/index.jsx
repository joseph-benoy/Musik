import { ListGroup,ListGroupItem,Button } from "react-bootstrap";
import "./songlist.css";
import React from "react";
import { Heart, Trash } from "react-bootstrap-icons";
import db from "../../services/db";
import { useDispatch} from "react-redux";
import { reload, setFav } from "../../store/slices/songs";
import { load, resetAllCount, resetFavCount, setAllCount, setFavCount, toggleLoading } from "../../store/slices/player";



const youtubedl = window.require('youtube-dl-exec');

function SongList({songs,fav}) {
    const dispatch = useDispatch();
    const deleteSong = (url)=>{
        const st = db.prepare("DELETE FROM ALL_SONGS WHERE URL=?");
        st.run(url,(error)=>{
            if(error){
                alert("Couldn't remove the song!");
            }
            else{
                const stf = db.prepare("DELETE FROM FAV WHERE URL=?");
                stf.run(url,(error)=>{
                    if(error){
                        alert("Couldn't remove the song!");
                    }
                    else{
                        alert("Removed the song!");
                        dispatch(reload());
                    }
                })
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
                dispatch(reload());
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
                dispatch(reload());
            }
        })
    }
    const playAudio = (index)=>{
        const song = songs[index];
        dispatch(toggleLoading());
        if(fav){
            dispatch(setFavCount(index));
            dispatch(resetAllCount());
        }
        else{
            dispatch(setAllCount(index));
            dispatch(resetFavCount());
        }
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
                dispatch(toggleLoading());
                dispatch(load(audioData));
            })
            .catch((e)=>{
                alert("Couldn't find the song!");
            })
    }
    return ( 
        <ListGroup className="songListWrapper">
        {
            songs.map((song,index)=>(
                <ListGroupItem action as="li"
                className="d-flex justify-content-between align-items-start"
                onClick={()=>playAudio(index)}
                >
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