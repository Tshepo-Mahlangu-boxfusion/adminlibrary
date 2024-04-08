import { useContext, useReducer, FC, PropsWithChildren} from "react"
import { ConfigReducer } from "./reducer";
import { IConfig, IConfigActionStateContext, IConfigStateContext, INITIAL_STATE } from "./context";
import { ConfigAction } from "./actions";
import { ConfigActionContext,ConfigContext } from "./context";
import { instance } from "../axiosInstance";




//Provider that will be wrapped around the children on the layout page
const ConfigProvider :FC<PropsWithChildren<{}>> = ({ children }) => {
    const [states, dispatch] = useReducer(ConfigReducer, INITIAL_STATE);
    
    const createConfig = async (payload:IConfig) => {
        try {
            const response = await instance.put(`https://localhost:44311/api/services/app/AppConfiguration/Update`,payload);
           
        } catch (error) {
            console.error(error);
        }
      };
    return(
     <ConfigContext.Provider value={states}>
        <ConfigActionContext.Provider value={{createConfig}}>
            {children}
        </ConfigActionContext.Provider>
     </ConfigContext.Provider>
    )
}

export const useConfigState = (): IConfigStateContext => {
    const context = useContext(ConfigContext);
    if (!context) {
      throw new Error("useLoginState must be used within a UserProvider");
    }
    return context;
  };
  
export const useConfigAction = (): IConfigActionStateContext=> {
    const context = useContext(ConfigActionContext);
    if (context==undefined) {
      throw new Error("useBookActions must be used within a BookProvider");
    }
    return context;
  };
  
  export const useConfig = (): IConfigStateContext & IConfigActionStateContext => {
    return {
      ...useConfigState(),
      ...useConfigAction()
    };
  };

  export default ConfigProvider;