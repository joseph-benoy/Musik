import db from "./db";
export const AddToLib = (title,url)=>{
    let stmt = db.prepare('INSERT INTO ALL_SONGS(TITLE,URL) VALUES(?,?)');
    stmt.run(title,url,(error)=>{
        if(error){
            alert("Couldn't add song to the library!");
        }
        else{
            stmt.finalize();
            alert("Added "+title+" to the library");
        }
    })
}