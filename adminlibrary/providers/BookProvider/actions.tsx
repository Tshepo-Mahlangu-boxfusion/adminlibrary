import { createAction} from 'redux-actions';
import { IShelf,IBookStateContext, ICountBook, ICategory, IBook } from "./context";

export enum BookActionEnum{
   
    createShelfRequest="CREATE",
    Shelf="SHELF",
    deleteShelf="DELETESHELF",
    updateShelf="UPDATESHELF",

    Count="COUNT",
    CreateCategoryRequest="CREATECATEGORY",
    Category="CATEGORY",
    deleteCategory="DELETESHELF",
    UpdateCategory="UPDATECATEGORY",

    CreateBook="CREATEBOOK",
    FetchBook="FETCHBOOK",
    DeleteBook="DELETEBOOK",
    UpdateBook="UPDATEBOOK"
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
export const UpdateCategoryAction = createAction<IBookStateContext, ICategory>(BookActionEnum.UpdateCategory,(UpdateCategory)=>({UpdateCategory}))
export const createCategoryRequestAction=createAction<IBookStateContext,ICategory>(BookActionEnum.CreateCategoryRequest,(CreateCategory)=>({CreateCategory}));

//book
export const createBookRequestAction=createAction<IBookStateContext,IBook>(BookActionEnum.CreateBook,(CreateBook)=>({CreateBook}));
export const FetchBookAction = createAction<IBookStateContext,IBook[]>(BookActionEnum.CreateCategoryRequest,(FetchBook)=>({FetchBook}));
export const DeleteBookAction= createAction<IBookStateContext,string>(BookActionEnum.DeleteBook,(DeleteBook)=>({DeleteBook}));
export const updateBookAction= createAction<IBookStateContext,IBook>(BookActionEnum.UpdateBook,(UpdateBook)=>({UpdateBook}))