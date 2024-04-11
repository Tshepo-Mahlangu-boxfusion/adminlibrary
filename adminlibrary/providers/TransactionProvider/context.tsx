import { createContext } from "react";
import { IUser } from "../LoginProviders/context";

export interface IBook{
    id:string;
    isbn: string;
    title: string;
    description: string;
    authors: string[];
    quantity: number;
    url: string;
    categoryId: string;
  }
  export interface ICount{
    count?:number;
  }
  
export interface ITransaction{
    id:string
    checkOutDate?:string;
    dueDate?:string;
    returnedDate?:string | null;
    bookId?:string | undefined;
    UserId?:string;
    book?:IBook;
    ref?:string;
    user?:IUser;
    status?:number;
}


export const INITIAL_STATE:ITransactionStateContext={};

export interface ITransactionStateContext{
    items?: ITransaction[];
    readonly CountTransaction?:ICount;
    readonly UpdateTransaction?:ICount;
    readonly DeleteTransaction?:void;
}

export interface ITransactionActionContext{
    fetchtransaction?:() =>void;
    countTransaction?:()=>void;
    updateTransaction?:(payload:ITransaction)=>void;
    deleteTransaction?:(payload:string)=>void;
}

const TransactionContext = createContext<ITransactionStateContext>(INITIAL_STATE);

const TransactionActionContext = createContext<ITransactionActionContext>({});

export {TransactionContext,TransactionActionContext};