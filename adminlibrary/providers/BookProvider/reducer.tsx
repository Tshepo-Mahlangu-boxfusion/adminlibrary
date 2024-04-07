import { BookActionEnum } from "./actions";
import { IBookStateContext } from "./context";

export function BookReducer(incomingState: IBookStateContext, action: ReduxActions.Action<IBookStateContext>): IBookStateContext {

    const { type, payload } = action;

    switch (type) { 
        
        case BookActionEnum.createShelfRequest:
            return { ...incomingState, ...payload }
        case BookActionEnum.Shelf:
            return { ...incomingState, ...payload }
        case BookActionEnum.deleteShelf:
            return { ...incomingState, ...payload }
        case BookActionEnum.updateShelf:
            return { ...incomingState, ...payload } 
        case BookActionEnum.Count:
            return { ...payload } 
        case BookActionEnum.Category:
            return {...incomingState, ...payload}
        case BookActionEnum.deleteCategory:
            return { ...incomingState, ...payload }
        default:
            return incomingState;
    }
}