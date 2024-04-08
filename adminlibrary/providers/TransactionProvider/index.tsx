import { FC, PropsWithChildren, useContext, useReducer } from "react";
import { instance } from "../axiosInstance";
import { INITIAL_STATE, ITransaction, ITransactionActionContext, ITransactionStateContext, TransactionActionContext, TransactionContext } from "./context";
import { TransactionReducer } from "./reducer";
import { FetchTransactionRequestAction, TransactionCountRequestAction } from "./actions";
import { message } from "antd";

const TransactionProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [status, dispatch] = useReducer(TransactionReducer, INITIAL_STATE);

    
    const fetchtransaction = async () =>{
        try{
            const response = await instance.get(`https://localhost:44311/api/services/app/Transaction/GetAllTransactionsIncluding`)
            if (response.data.success) {
                message.success("Fetched successfully");
                dispatch(FetchTransactionRequestAction(response.data.result));
                console.log(response.data.result)
                console.log(status)
            } else {
                message.error("Failed");
            }
        }
        catch(error:any){
            message.error(error.data.error.message)
        }
    }
    const countTransaction = async () => {
        try {
            const response = await instance.get(`https://localhost:44311/api/services/app/Transaction/GetTranCount`);
            dispatch(TransactionCountRequestAction(response.data.result));
            console.log(response.data.result)
        } catch (error) {
            console.error(error);
        }
      };

    return (
        <TransactionContext.Provider value={status}>
            <TransactionActionContext.Provider value={{fetchtransaction,countTransaction}}>
                {children}
            </TransactionActionContext.Provider>
        </TransactionContext.Provider>
    );
};

const useTransactionState = (): ITransactionStateContext => {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error("useTransactionState must be used within a TransactionProvider");
    }
    return context;
};

const useTransactionActions = (): ITransactionActionContext => {
    const context = useContext(TransactionActionContext);
    if (!context) {
        throw new Error("useTransactionActions must be used within a TransactionProvider");
    }
    return context;
};

const useTransaction = (): ITransactionStateContext & ITransactionActionContext => {
    return {
        ...useTransactionState(),
        ...useTransactionActions()
    };
};

export { TransactionProvider, useTransaction, useTransactionState, useTransactionActions };
