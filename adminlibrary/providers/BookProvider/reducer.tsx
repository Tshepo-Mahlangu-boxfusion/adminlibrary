import { BookActionEnum } from "./actions";
import { IBookStateContext } from "./context";

export function BookReducer(incomingState: IBookStateContext, action: ReduxActions.Action<IBookStateContext>): IBookStateContext {

    const { type, payload } = action;

    switch (type) { 
        //shelf
        case BookActionEnum.createShelfRequest:
            return { ...incomingState, ...payload }
        case BookActionEnum.Shelf:
            return { ...incomingState, ...payload }
        case BookActionEnum.deleteShelf:
            return { ...incomingState, ...payload }
        case BookActionEnum.updateShelf:
            return { ...incomingState, ...payload } 
       //category
        case BookActionEnum.CreateCategoryRequest:
            return { ...incomingState, ...payload}
        case BookActionEnum.Category:
            return {...incomingState, ...payload}
        case BookActionEnum.deleteCategory:
            return { ...incomingState, ...payload }
        case BookActionEnum.UpdateCategory:
            return {...incomingState,...payload}
        //book
        case BookActionEnum.CreateBook:
            return {...payload}
        case BookActionEnum.Count:
            return { ...payload } 
        case BookActionEnum.FetchBook:
            return{...incomingState,...payload}
        case BookActionEnum.DeleteBook:
            return{...incomingState,...payload}
        case BookActionEnum.UpdateBook:
            return {...incomingState,...payload}
        default:
            return incomingState;
    }
}