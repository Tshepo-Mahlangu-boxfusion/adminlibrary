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
import { createShelfRequestAction } from "./actions";
import { message } from "antd";

const BookProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(BookReducer, INITIAL_STATE);

  const createShelf = async (payload: IShelf) => {
    console.log("payload::", payload);
    try {
      const response = await axios.post(
        `https://localhost:44311/api/services/app/Shelf/Create`,
        payload
      );
      console.log("response::", response);
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

  return (
    <BookContext.Provider value={state}>
      <BookActionContext.Provider value={{ createShelf }}>
        {children}
      </BookActionContext.Provider>
    </BookContext.Provider>
  );
};

const useBookState = (): IBookStateContext => {
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

