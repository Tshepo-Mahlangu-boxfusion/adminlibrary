import {createContext} from 'react';


export interface IConfig{ 
  id:number
  name?:string;
  welcomeMessage?:string;
  address?:string; 
  primaryColor?:string;
  secondaryColor?:string; 
  EmailAddress?:string;
  Contact?:string;
  aboutMessage?:string;
  }

export const INITIAL_STATE:IConfigStateContext={};

export interface IConfigStateContext{
     CreateConfig?:IConfig;
     FetchConfig?:IConfig;
}

export interface IConfigActionStateContext{
    createConfig?:(payload:IConfig)=>void;
    fetchConfig?:()=>void
}

const ConfigContext = createContext<IConfigStateContext>(INITIAL_STATE);

const ConfigActionContext = createContext<IConfigActionStateContext>({});

export{ConfigContext,ConfigActionContext};