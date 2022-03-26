import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name:"player",
    initialState:{
        play:false,
        loaded:false,
        audio:{
            url:"",
            title:"No song",
            duration:0,
            thumbnail:""
        }
    },
    reducers:{
        load:(state,action)=>{
            state.loaded = true;
            state.audio.url = action.payload.url;
            state.audio.title = action.payload.title;
            state.audio.duration = action.payload.duration;
            state.audio.thumbnail = action.payload.thumbnail;
        },
        play:(state)=>{
            state.play = true;
        },
        pause:(state)=>{
            state.play = false;
        }
    }
});

export const {load,play,pause} = playerSlice.actions;
export default playerSlice.reducer;