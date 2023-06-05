import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { redirect } from "react-router-dom";
import AxiosClient from '../axios/axiosClient';
import { ACTION, initialState, productReducer } from '../reducers/ProductReducer';




export const MainContext = createContext()

function MainContextProvider({ children }) {

   const [productState, productDispatch] = useReducer(productReducer, initialState)

   useEffect(() => {
      async function fetchProducts() {
         try{
            const result = await AxiosClient.get('product/')
            .then((response) => {
                 productDispatch({
                  type: ACTION.FETCH_PRODUCT,
                  payload: response.data,
                  })
                  // console.log(response.data)
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
         productDispatch }}>
      { children }
      </MainContext.Provider>
    )
}


export const MainContextState = () => {
   return useContext(MainContext)
 }

export default MainContextProvider
