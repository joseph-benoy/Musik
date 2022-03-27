import { configureStore } from "@reduxjs/toolkit";
import  playerReducer  from "./slices/player";
import songReducer from "./slices/songs";
const store = configureStore({
    reducer:{
        player:playerReducer,
        song:songReducer
    }
});

export default store;