import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { redirect, useParams } from "react-router-dom";
import AxiosClient from '../axios/axiosClient';
import { productInitialState, productReducer} from '../reducers/ProductReducer';
import { posInitialState, posReducer, posInit, currencyInitialState, currencyReducer, 
   paymentInitialSate, paymentReducer} 
       from '../reducers/PosReducer';
import { salesInitialState, salesReducer } from '../reducers/SalesReducer';




export const MainContext = createContext()

function MainContextProvider({ children }) {

   const [productState, productDispatch] = useReducer(productReducer, productInitialState)
   const [ posState, posDispatch ] = useReducer(posReducer, posInitialState, posInit)
   const [ currencyState, currencyDispatch ] = useReducer(currencyReducer, currencyInitialState)
   const [paymentState, paymentDispatch] = useReducer(paymentReducer, paymentInitialSate)
   const [salesState, salesDispatch] = useReducer(salesReducer, salesInitialState)
   const [zwlRate, setZwlRate] = useState('')
  
   
   /* PRODUCTS */
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

  useEffect(() => {
   async function fetchSales() {
      try{
         const result = await AxiosClient.get('sales/')
         .then((response) => {
              salesDispatch({
               type: 'FETCH_SALES',
               payload: response.data,
               })  
               //console.log(response.data) 
          })
      } catch (error) {
         console.error(`Error: ${error}`)
      }   
   }
   fetchSales()
}, []);


  /* GET ZWL RATE */
   useEffect(() => {
      async function getZwlRate() {
         try{
            const result = await AxiosClient.get('currency/1/')
            .then((response) => {
               console.log(response.data.rate)
               setZwlRate(response.data.rate)   
            })
         } catch (error) {
            console.error(`Error: ${error}`)
         }   
      }
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
         salesDispatch
      }}>
      { children }
      </MainContext.Provider>
    )
}


export const MainContextState = () => {
   return useContext(MainContext)
 }

export default MainContextProvider
