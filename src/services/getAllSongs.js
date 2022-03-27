import db from "./db";

export const getAllSongs = ()=>{
    let songs = [];
    db.all("SELECT * FROM ALL_SONGS",(error,rows)=>{
        if(!error){
            alert(JSON.stringify(rows));
            songs = [...rows];
        }
    })
    return songs;
}