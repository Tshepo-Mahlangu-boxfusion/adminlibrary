import {createContext} from 'react';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
 
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
  export interface IBook{
    id?:string;
    isbn: string;
    title: string;
    description: string;
    authors: string[];
    quantity: number;
    url: string;
    file:string;
    image:string
    categoryId: string;
  }
  
export const INITIAL_STATE: IBookStateContext={}

export interface IBookStateContext {
  //shelf
    readonly CreateShelf? : IShelf; 
    readonly BookShelf?:IShelf[];
    readonly DeleteShelf?:string;
    readonly UpdateShelf?:IShelf;
    readonly CountBooks?:ICountBook;
    //category
    readonly CreateCategory?:ICategory;
     readonly BookCategory?:ICategory[];
     readonly DeleteCategory?:ICategory;
     readonly UpdateCategory?:ICategory;

     //Book
     readonly CreateBook?:IBook;
     readonly FetchBook?:IBook[];
     readonly DeleteBook?:string;
     readonly UpdateBook?:IBook;

     
}


export interface IBookActionContext{
 //Shelf
  createShelf?:(payload:IShelf) => void;
  fetchShelf?:()=>void;
  deleteShelf?:(id:string)=>void;
  updateShelf?:(payload:IShelf)=>void;
  countBooks?:()=>void;
  //category
  createCategory?:(payload:ICategory)=>void;
  fetchCategory?:()=>void;
  deleteCategory?:(id:string)=>void;
  updateCategory?:(payload:ICategory)=>void;

  //book
  createBook:(payload:IBook)=>void;
  fetchBooks?:()=>void;
  deleteBook?:(payload:string)=>void;
  updateBook?:(Payload:IBook)=>void;
}
const BookContext = createContext<IBookStateContext>(INITIAL_STATE);

const BookActionContext = createContext<IBookActionContext>(undefined);

export {BookContext,BookActionContext};