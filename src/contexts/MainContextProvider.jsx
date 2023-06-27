import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { redirect, useParams } from "react-router-dom";
import AxiosClient from '../axios/axiosClient';
import { productInitialState, productReducer} from '../reducers/ProductReducer';
import { posInitialState, posReducer, posInit, currencyInitialState, currencyReducer, 
   paymentInitialSate, paymentReducer} 
       from '../reducers/PosReducer';
import { salesInitialState, salesReducer } from '../reducers/SalesReducer';
import { salesItemInitialState, salesItemReducer } from '../reducers/SalesItemReducer';




export const MainContext = createContext()

function MainContextProvider({ children }) {

   const [productState, productDispatch] = useReducer(productReducer, productInitialState)
   const [ posState, posDispatch ] = useReducer(posReducer, posInitialState, posInit)
   const [ currencyState, currencyDispatch ] = useReducer(currencyReducer, currencyInitialState)
   const [paymentState, paymentDispatch] = useReducer(paymentReducer, paymentInitialSate)
   const [salesState, salesDispatch] = useReducer(salesReducer, salesInitialState)
   const [salesItemState, salesItemDispatch] = useReducer(salesItemReducer, salesItemInitialState)
   const [zwlRate, setZwlRate] = useState('')
  
   
   /* FETCH ALL PRODUCTS */
   /* async function fetchProducts() {
      try{
         const result = await AxiosClient.get('product/')
         .then((response) => {
              productDispatch({
               type: 'FETCH_PRODUCT',
               payload: response.data,
               })  
               console.log('PRODUCTS:') 
               console.log(response.data)  
          })
      } catch (error) {
         console.error(`Error: ${error}`)
      }   
   } */
   /* GET ZWL RATE */
   async function getZwlRate() {
      try{
         const result = await AxiosClient.get('currency/1/')
         .then((response) => {
            setZwlRate(response.data.rate)   
            console.log('ZWL RATE:')
            console.log(response.data)
         })
      } catch (error) {
         console.error(`Error: ${error}`)
      }   
   }
   
   /* SIDE EFFECTS */
   useEffect(() => {     
      //fetchProducts()
      getZwlRate()
  }, []);



   return (
      <MainContext.Provider value={{ 
         productState, 
         productDispatch,
         posState, 
         posDispatch,
         zwlRate,
         setZwlRate,
         currencyState, 
         currencyDispatch,
         paymentState, 
         paymentDispatch,
         salesState, 
         salesDispatch,
         salesItemState, 
         salesItemDispatch
      }}>
      { children }
      </MainContext.Provider>
    )
}


export const MainContextState = () => {
   return useContext(MainContext)
 }

export default MainContextProvider
