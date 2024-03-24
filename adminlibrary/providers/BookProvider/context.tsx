import {createContext} from 'react';
 
  export interface IShelf {
    name: string;
  }

export const INITIAL_STATE: IBookStateContext={}

export interface IBookStateContext {
    readonly CreateShelf? : IShelf; 
}


export interface IBookActionContext{
 
  createShelf?:(payload:IShelf) => void;
 
}
const BookContext = createContext<IBookStateContext>(INITIAL_STATE);

const BookActionContext = createContext<IBookActionContext>({});

export {BookContext,BookActionContext};