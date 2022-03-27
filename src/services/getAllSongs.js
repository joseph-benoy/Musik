import db from "./db";

export const getAllSongs = ()=>{
    db.all("SELECT * FROM ALL_SONGS",(error,rows)=>{
        if(error){
            alert("Error : "+JSON.stringify(error));
        }
        else{
            alert(JSON.stringify(rows))
        }
    })
}