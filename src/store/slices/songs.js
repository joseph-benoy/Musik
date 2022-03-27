import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
    name:"songs",
    initialState:{
            allSongs:[],
            fav:[]
    },
    reducers:{
        setAllSongs:(state,action)=>{
            state.allSongs = action.payload;
        },
        setFav:(state,action)=>{
            state.fav = [...action.payload]
        }
    }
});

export const {setAllSongs,setFav} = songSlice.actions;
export default songSlice.reducer;