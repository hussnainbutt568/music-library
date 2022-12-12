import { combineReducers } from "@reduxjs/toolkit";
import { SongsData } from "./Songdata";

const rootReducer = combineReducers ({

    songDataStore: SongsData,

})
export default rootReducer
