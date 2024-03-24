import { BookActionEnum } from "./actions";
import { IBookStateContext } from "./context";

export function BookReducer(incomingState: IBookStateContext, action: ReduxActions.Action<IBookStateContext>): IBookStateContext {

    const { type, payload } = action;

    switch (type) { 
        
        case BookActionEnum.createShelfRequest:
            return { ...incomingState, ...payload }
        default:
            return incomingState;
    }
}