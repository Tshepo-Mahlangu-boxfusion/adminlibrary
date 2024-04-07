import {createContext} from 'react';
 
  export interface IShelf {
    id?:string;
    name: string;
  }
  export interface ICategory{
    id:string;
    name:string;
    shelfId:string;
}
  export interface ICountBook{
    count?:number;
  }

export const INITIAL_STATE: IBookStateContext={}

export interface IBookStateContext {
  //shelf
    readonly CreateShelf? : IShelf; 
    BookShelf?:IShelf[];
    readonly DeleteShelf?:string;
    readonly UpdateShelf?:IShelf;
    readonly CountBooks?:ICountBook;
    //category
     BookCategory?:ICategory[];
     readonly DeleteCategory?:ICategory;
}


export interface IBookActionContext{
 //Shelf
  createShelf?:(payload:IShelf) => void;
  fetchShelf?:()=>void;
  deleteShelf?:(id:string)=>void;
  updateShelf?:(payload:IShelf)=>void;
  countBooks?:()=>void;
  //category
  fetchCategory?:()=>void;
  deleteCategory?:(id:string)=>void;
}
const BookContext = createContext<IBookStateContext>(INITIAL_STATE);

const BookActionContext = createContext<IBookActionContext>({});

export {BookContext,BookActionContext};