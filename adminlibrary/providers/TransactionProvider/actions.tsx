import { createAction } from "redux-actions";
import { ICount, ITransaction,ITransactionStateContext } from "./context";

export enum TransactionActionEnum{
   
    FetchTransactionRequest="FETCH",
    Count="COUNT",
    Update="UPDATE",
    Delete="DELETE"
    
}

export const FetchTransactionRequestAction= createAction<ITransactionStateContext, ITransaction[]>(TransactionActionEnum.FetchTransactionRequest, (items) => ({items}));
export const TransactionCountRequestAction = createAction<ITransactionStateContext, ICount>(TransactionActionEnum.Count,(CountTransaction)=>({CountTransaction}))
export const UpdateTransactionAction =createAction<ITransactionStateContext,ICount>(TransactionActionEnum.Update,(UpdateTransaction)=>({UpdateTransaction}));
export const DeleteTransactionAction=createAction<ITransactionStateContext,void>(TransactionActionEnum.Delete,(DeleteTransaction)=>({DeleteTransaction}))