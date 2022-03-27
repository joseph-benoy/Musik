import db from "./db";
export const AddToLib = (title,url)=>{
    let stmt = db.prepare('INSERT INTO ALL_SONGS(URL) VALUES(?)');
    stmt.run(url,(error)=>{
        if(error){
            alert("Error occured : "+JSON.stringify(error));
        }
        else{
            stmt.finalize();
            alert("Added "+title+" to the library");
        }
    })
}