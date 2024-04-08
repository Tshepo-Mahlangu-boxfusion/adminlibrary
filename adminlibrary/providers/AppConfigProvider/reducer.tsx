import {  IConfigStateContext } from "./context";
import { ConfigActionEnums } from "./actions";

export function ConfigReducer(incomingState:IConfigStateContext,action:ReduxActions.Action<IConfigStateContext>):IConfigStateContext{
     const {type,payload}= action;
   
    switch(type){ 
        
        case ConfigActionEnums.Config:
                return {
                    ...incomingState,...action.payload
                }
        case ConfigActionEnums.FetchConfig:
                return {
                    ...incomingState,...action.payload
                }         
        default:
            return incomingState;
    }
}