import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { redirect, useParams } from "react-router-dom";
import AxiosClient from '../axios/axiosClient';
import { productInitialState, productReducer} from '../reducers/ProductReducer';
import { posInitialState, posReducer, posInit} from '../reducers/PosReducer';




export const MainContext = createContext()

function MainContextProvider({ children }) {

   const [productState, productDispatch] = useReducer(productReducer, productInitialState)
   const [ posState, posDispatch ] = useReducer(posReducer, posInitialState, posInit)
   
   useEffect(() => {
      async function fetchProducts() {
         try{
            const result = await AxiosClient.get('product/')
            .then((response) => {
                 productDispatch({
                  type: 'FETCH_PRODUCT',
                  payload: response.data,
                  })    
             })
         } catch (error) {
            console.error(`Error: ${error}`)
         }   
      }
      fetchProducts()
  }, []);

   

   return (
      <MainContext.Provider value={{ 
         productState, 
         productDispatch,
         posState, 
         posDispatch
      }}>
      { children }
      </MainContext.Provider>
    )
}


export const MainContextState = () => {
   return useContext(MainContext)
 }

export default MainContextProvider
