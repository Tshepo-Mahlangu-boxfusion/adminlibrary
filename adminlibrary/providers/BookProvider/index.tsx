'use client'

import React, { PropsWithChildren, FC, useReducer, useContext } from "react";
import axios from "axios";
import { BookReducer } from "./reducer";
import {
  BookActionContext,
  BookContext,
  IBookActionContext,
  IBookStateContext,
  INITIAL_STATE,
  IShelf,
} from "./context";
import { BookCountRequestAction, BookRequestAction, CategoryAction, ShelfDeleteAction, UpdateDeleteAction, createShelfRequestAction } from "./actions";
import { message } from "antd";
import { instance } from "../axiosInstance";

const BookProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(BookReducer, INITIAL_STATE);

  const createShelf = async (payload: IShelf) => {
    console.log("payload::", payload);
    try {
      const response = await axios.post(
        `https://localhost:44311/api/services/app/Shelf/Create`,
        payload
      );
      await fetchShelf;
      if (response.data.success) {
        message.success("Shelf successfully created");
        dispatch(createShelfRequestAction(response.data.result));
    } else {
        message.error("Failed to create shelf");
      }
    } catch (error) {
      console.error("Shelf creation error:", error);
      message.error("Error occurred while creating shelf");
    }
  };
  const fetchShelf = async () => {
    try {
        const response = await instance.get(`https://localhost:44311/api/services/app/Shelf/GetAll`);
        dispatch(BookRequestAction(response.data.result.items));
    } catch (error) {
        console.error(error);
    }
};
const deleteShelf = async (id:string) => {
  try {
      const response = await instance.delete(`https://localhost:44311/api/services/app/Shelf/Delete?Id=${id}`);
      await fetchShelf;
  } catch (error) {
      console.error(error);
  }
};
const updateShelf = async (payload:IShelf) => {
  try {
      const response = await instance.put(`https://localhost:44311/api/services/app/Shelf/Update`,payload);
      // dispatch(UpdateDeleteAction(response.data.result.items))
      await fetchShelf;
  } catch (error) {
      console.error(error);
  }
};
const countBooks = async () => {
  try {
      const response = await instance.get(`https://localhost:44311/api/services/app/Book/GetBooksCount`);
      dispatch(BookCountRequestAction(response.data.result));
      console.log(response)
  } catch (error) {
      console.error(error);
  }
};

//Category
const fetchCategory = async () => {

  try {
      const response = await instance.get(`https://localhost:44311/api/services/app/Category/GetAll`);
      dispatch(CategoryAction(response.data.result.items));

      
  } catch (error) {
      console.error(error);
  }
};
const deleteCategory = async (id:string) => {
  try {
      const response = await instance.delete(`https://localhost:44311/api/services/app/Category/Delete?Id=${id}`);
      await fetchCategory;
  } catch (error) {
      console.error(error);
  }
};


  return (
    <BookContext.Provider value={state}>
      <BookActionContext.Provider value={{ createShelf,fetchShelf,deleteShelf,updateShelf,countBooks,fetchCategory,deleteCategory}}>
        {children}
      </BookActionContext.Provider>
    </BookContext.Provider>
  );
};

export const useBookState = (): IBookStateContext => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookState must be used within a BookProvider");
  }
  return context;
};

const useBookActions = (): IBookActionContext => {
  const context = useContext(BookActionContext);
  if (!context) {
    throw new Error("useBookActions must be used within a BookProvider");
  }
  return context;
};

const useBook = (): IBookStateContext & IBookActionContext => {
  return {
    ...useBookState(),
    ...useBookActions(),
  };
};

export { BookProvider, useBook };

