import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name:"player",
    initialState:{
        play:false,
        loaded:false,
        loading:false,
        audio:{
            url:"",
            title:"No song",
            duration:0,
            thumbnail:""
        },
        counter:{
            all:-1,
            fav:-1
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
        },
        nextAll:(state)=>{
            state.counter.all+=1;
        },
        prevAll:(state)=>{
            state.counter.all-=1;
        },
        nextFav:(state)=>{
            state.counter.fav+=1;
        },
        prevFav:(state)=>{
            state.counter.fav-=1;
        },
        resetAllCount:(state)=>{
            state.counter.all = -1;
        },
        resetFavCount:(state)=>{
            state.counter.fav = -1;
        },
        toggleLoading:(state)=>{
            const temp = state.loading;
            state.loading = !temp;
        },
        setAllCount:(state,action)=>{
            state.counter.all = action.payload;
        },
        setFavCount:(state,action)=>{
            state.counter.fav = action.payload;
        }
    }
});

export const {nextAll,prevAll,prevFav,nextFav,load,play,pause,toggleLoading,setAllCount,setFavCount,resetAllCount,resetFavCount} = playerSlice.actions;
export default playerSlice.reducer;