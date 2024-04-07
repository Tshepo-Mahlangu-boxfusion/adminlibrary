import { createAction} from 'redux-actions';
import { IShelf,IBookStateContext, ICountBook, ICategory } from "./context";

export enum BookActionEnum{
   
    createShelfRequest="CREATE",
    Shelf="SHELF",
    deleteShelf="DELETESHELF",
    updateShelf="UPDATESHELF",
    Count="COUNT",
    Category="CATEGORY",
    deleteCategory="DELETESHELF"
}

//shelf
export const createShelfRequestAction=createAction<IBookStateContext,IShelf>(BookActionEnum.createShelfRequest,(CreateShelf)=>({CreateShelf}));
export const BookRequestAction = createAction<IBookStateContext, IShelf[]>(BookActionEnum.Shelf,(BookShelf)=>({BookShelf}))
export const ShelfDeleteAction = createAction<IBookStateContext, string>(BookActionEnum.Shelf,(DeleteShelf)=>({DeleteShelf}))
export const UpdateDeleteAction = createAction<IBookStateContext, IShelf>(BookActionEnum.updateShelf,(UpdateShelf)=>({UpdateShelf}))
export const BookCountRequestAction = createAction<IBookStateContext, ICountBook>(BookActionEnum.Count,(CountBooks)=>({CountBooks}))

//Category
export const CategoryAction=createAction<IBookStateContext,ICategory[]>(BookActionEnum.Category,(BookCategory)=>({BookCategory}))
export const UpdateDeleteCategoryAction = createAction<IBookStateContext, ICategory>(BookActionEnum.deleteCategory,(DeleteCategory)=>({DeleteCategory}))
