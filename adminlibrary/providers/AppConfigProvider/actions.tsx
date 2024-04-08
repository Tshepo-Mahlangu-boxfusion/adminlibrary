import { createAction } from "redux-actions";
import { IConfig, IConfigStateContext } from "./context";

export enum ConfigActionEnums{
    Config="CONFIG",
    FetchConfig="FETCHCONFIG"

}

export const ConfigAction=createAction<IConfigStateContext,IConfig>(ConfigActionEnums.Config,(CreateConfig)=>({CreateConfig}))

export const fetchConfigAction=createAction<IConfigStateContext,IConfig>(ConfigActionEnums.Config,(FetchConfig)=>({FetchConfig}))