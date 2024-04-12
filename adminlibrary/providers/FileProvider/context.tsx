import {createContext} from 'react';


export interface IFile{ 
    
  }

export const INITIAL_STATE:IFileContextState={};

export interface IFileContextState{
    
}

export interface IFileActionState{
    
}

const FileContext = createContext<IFileContextState>(INITIAL_STATE);

const FileActionContext= createContext<IFileActionState>({});

export{FileContext,FileActionContext};