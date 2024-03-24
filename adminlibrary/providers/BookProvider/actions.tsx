import { createAction} from 'redux-actions';
import { IShelf,IBookStateContext } from "./context";

export enum BookActionEnum{
   
    createShelfRequest="CREATE",
}

export const createShelfRequestAction=createAction<IBookStateContext,IShelf>(BookActionEnum.createShelfRequest,(CreateShelf)=>({CreateShelf}));
