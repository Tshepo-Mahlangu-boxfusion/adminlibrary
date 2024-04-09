import {  IConfigStateContext } from "./context";
import { ConfigActionEnums } from "./actions";

export function ConfigReducer(incomingState:IConfigStateContext,action:ReduxActions.Action<IConfigStateContext>):IConfigStateContext{
     const {type,payload}= action;
    console.log(payload,'data')
    switch(type){ 
        
        case ConfigActionEnums.Config:
                return {
                    ...incomingState,...payload
                }
        case ConfigActionEnums.FetchConfig:
                return {
                    ...payload
                }         
        default:
            return incomingState;
    }
}