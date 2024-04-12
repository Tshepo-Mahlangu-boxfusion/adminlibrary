'use client'
import React, { PropsWithChildren, FC, useReducer, useContext } from "react";
import axios from "axios";
import { BookReducer } from "./reducer";
import {BookActionContext,BookContext,IBook,IBookActionContext, IBookStateContext,ICategory,INITIAL_STATE,IShelf,} from "./context";
import { BookCountRequestAction, BookRequestAction, CategoryAction, FetchBookAction, ShelfDeleteAction, UpdateDeleteAction, createBookRequestAction, createShelfRequestAction } from "./actions";
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
const createCategory = async (payload: ICategory) => {
  console.log("payload::", payload);
  try {
    const response = await axios.post(
      `https://localhost:44311/api/services/app/Category/Create`,
      payload
    );
    await fetchCategory;
    if (response.data.success) {
      message.success("category successfully created");
      dispatch(createShelfRequestAction(response.data.result));
  } else {
      message.error("Failed to create category");
    }
  } catch (error) {
    console.error("category creation error:", error);
    message.error("Error occurred while creating category");
  }
};
const fetchCategory = async () => {
  try {
      const response = await instance.get(`https://localhost:44311/api/services/app/Category/GetAllCategories`);
      dispatch(CategoryAction(response.data.result));  
      
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
const updateCategory = async (payload:ICategory) => {
  try {
    console.log(payload)
      const response = await instance.put(`https://localhost:44311/api/services/app/Category/Update`,payload);
      await fetchCategory;
      
  } catch (error) {
      console.error(error);
  }
};
const fetchBooks =async ()=>{
  try{
    const response=await instance.post('https://localhost:44311/api/services/app/Book/CustomGetAll')
    if(response.data.success){
      message.success("Books Fetched Successfully")
      dispatch(FetchBookAction(response.data.result))
      console.log('Inn')
    }
    
  }catch(error){
    console.error(error)
  }
}
const deleteBook = async (id:string) => {
  try {
      const response = await instance.delete(`https://localhost:44311/api/services/app/Book/Delete?Id=${id}`);
      await fetchBooks();
  } catch (error) {
      console.error(error);
  }
};
const updateBook = async (payload:IBook) => {
  try {
    console.log(payload)
      const response = await instance.put(`https://localhost:44311/api/services/app/Book/Update`,payload);
      await fetchBooks();
      
  } catch (error) {
      console.error(error);
  }
};
const createBook = async (payload: IBook) => {
  try {
    const formData = new FormData();
    formData.append('categoryId',payload.categoryId)
    formData.append('title', payload.title);
    // formData.append('quantity', payload.quantity);
    formData.append('author', payload.authors.join(', ')); 
    formData.append('isbn', payload.isbn);
    formData.append('description', payload.description);
    formData.append('file', payload.file);
    const response = await instance.post('https://localhost:44311/api/services/app/Book/createBook', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.data.success) {
      message.success("Book successfully created");
      dispatch(createBookRequestAction(response.data.result));
    }
  } catch (error) {
    console.error(error);
    // message.error(error.);
  }
}
  return (
    <BookContext.Provider value={state}>
      <BookActionContext.Provider value={{ createShelf,fetchShelf,deleteShelf,updateShelf,countBooks,
        createCategory,fetchCategory,deleteCategory,updateCategory,createBook,fetchBooks,deleteBook,updateBook}}>
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

