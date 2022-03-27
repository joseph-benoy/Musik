import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
    name:"songs",
    initialState:{
            allSongs:[],
            fav:[],
            reload:false
    },
    reducers:{
        setAllSongs:(state,action)=>{
            state.allSongs = action.payload;
        },
        setFav:(state,action)=>{
            state.fav = [...action.payload]
        },
        reload:(state)=>{
            const temp = state.reload;
            state.reload = !temp;
        }
    }
});

export const {setAllSongs,setFav,reload} = songSlice.actions;
export default songSlice.reducer;