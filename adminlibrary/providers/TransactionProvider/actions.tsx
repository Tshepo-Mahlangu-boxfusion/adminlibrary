import { createAction } from "redux-actions";
import { ICount, ITransaction,ITransactionStateContext } from "./context";

export enum TransactionActionEnum{
   
    FetchTransactionRequest="FETCH",
    Count="COUNT"
    
}

export const FetchTransactionRequestAction= createAction<ITransactionStateContext, ITransaction[]>(TransactionActionEnum.FetchTransactionRequest, (items) => ({items}));
export const TransactionCountRequestAction = createAction<ITransactionStateContext, ICount>(TransactionActionEnum.Count,(CountTransaction)=>({CountTransaction}))
