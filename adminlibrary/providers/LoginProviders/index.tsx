'use client'
import React, { FC, PropsWithChildren, useContext, useReducer } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { UserReducer } from './reducer';
import { ILogin, INITIAL_STATE, IUser, IUserActionContext, IUserStateContext, UserActionContext, UserContext } from './context';
import { createUserRequestAction, logOutUserRequestAction, getUserIdDetailsRequestAction, loginUserRequestAction, setCurrentUserRequestAction, UserCountRequestAction } from './actions';
import { instance } from '../axiosInstance';

const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const { push } = useRouter();

 
  const loginUser = async (payload: ILogin) => {
    try {
      const response = await instance.post(`${process.env.NEXT_PUBLIC_PASS}/TokenAuth/Authenticate`, payload);
      if (response.data.success) {
        localStorage.setItem('Token', response.data.result.accessToken);
        dispatch(loginUserRequestAction(response.data.result));
        console.log(response.data.result.currentUser?.roleNames)
        dispatch(getUserIdDetailsRequestAction(response.data.result.userId.user));
        
        await getUserDetails();
        console.log(state)
        if (state.currentUser?.roleNames.includes("Admin.Roles")||state.currentUser?.roleNames.includes("Super.Roles")) {
          push("/Navigation/dashboard");
          console.log(response.data.result);
          message.success('Login successful');
        } else {
          // push("/dashboard");
         console.log(state.currentUser?.roleNames)
          // message.success('Login successful');
        }
      } else {
        message.error('Invalid username or password');
      }
    } catch (error) {
      console.log(error);
      message.error('Login failed');
    }
  };

  const createUser = async (payload: IUser) => {
    try {
      const response = await instance.post(`${process.env.NEXT_PUBLIC_PASS}/services/app/Person/Create`, payload);
      console.log("response::", response);
      if (response.data.success) {
        message.success("User successfully created");
        dispatch(createUserRequestAction(response.data.result));
        push("/login");
      } else {
        message.error("Failed to create user");
      }
    } catch (error) {
      console.error("User creation error:", error);
      message.error("username or name already in use");
    }
  }
  const getUserDetails = async ()=> {
    const Token = localStorage.getItem("Token");
    try {
      await instance.get(`${process.env.NEXT_PUBLIC_PASS}/services/app/Person/GetCurrentPerson`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${Token}`
        },
      }).then(data=>{
        console.log(data)
        dispatch(setCurrentUserRequestAction(data.data.result))
      });
      //const user = response.data.result.user;
      
      //dispatch(getUserIdDetailsRequestAction(response.data.result));
//return user; // Return the user details
    } catch (error) {
      message.error("User not logged");
      throw error; // Re-throw the error to be handled by the caller
    }
  };
  const countUser = async () => {
    try {
        const response = await instance.get(`https://localhost:44311/api/services/app/Person/GetUserCount`);
        dispatch(UserCountRequestAction(response.data.result));
        console.log(response)
    } catch (error) {
        console.error(error);
    }
  };

  const logOutUser = () => {
    dispatch(logOutUserRequestAction());
    localStorage.removeItem('Token');
    push('/');
  };

  return (
    <UserContext.Provider value={state}>
      <UserActionContext.Provider value={{ loginUser, createUser, getUserDetails, countUser,logOutUser }}>
        {children}
      </UserActionContext.Provider>
    </UserContext.Provider>
  );
};

const useLoginState = (): IUserStateContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useLoginState must be used within a UserProvider");
  }
  return context;
};

const useLoginActions = (): IUserActionContext => {
  const context = useContext(UserActionContext);
  if (!context) {
    throw new Error("useLoginActions must be used within a UserProvider");
  }
  return context;
};

const useUser:any = (): IUserStateContext & IUserActionContext => {
  return {
    ...useLoginState(),
    ...useLoginActions()
  };
};

export { UserProvider, useUser,useLoginState,useLoginActions };
