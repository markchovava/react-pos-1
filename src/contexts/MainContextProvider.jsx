import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { redirect, useParams } from "react-router-dom";
import AxiosClient from '../axios/axiosClient';
import { productInitialState, productReducer} from '../reducers/ProductReducer';
import { posInitialState, posReducer, posInit, currencyInitialState, currencyReducer, 
   paymentInitialSate, paymentReducer} 
       from '../reducers/PosReducer';
import { salesInitialState, salesReducer } from '../reducers/SalesReducer';
import { salesItemInitialState, salesItemReducer } from '../reducers/SalesItemReducer';
import { stockInitialState, stockReducer } from '../reducers/StockReducer';
import { authInitialstate, authReducer } from '../reducers/AuthReducer';




export const MainContext = createContext()

function MainContextProvider({ children }) {
   const [authUser, setAuthUser] = useState({})
   const [productState, productDispatch] = useReducer(productReducer, productInitialState)
   const [posState, posDispatch ] = useReducer(posReducer, posInitialState, posInit)
   const [currencyState, currencyDispatch ] = useReducer(currencyReducer, currencyInitialState)
   const [paymentState, paymentDispatch] = useReducer(paymentReducer, paymentInitialSate)
   const [salesState, salesDispatch] = useReducer(salesReducer, salesInitialState)
   const [salesItemState, salesItemDispatch] = useReducer(salesItemReducer, salesItemInitialState)
   const [zwlRate, setZwlRate] = useState('')
   const [stockState, stockDispatch] = useReducer(stockReducer, stockInitialState)

  const setToken = (token) => {
      localStorage.setItem('POS_ACCESS_TOKEN', token);
      authDispatch({type: 'SET_TOKEN', payload: token}) 
  }
  
  const getToken = () => {
    const token = localStorage.getItem('POS_ACCESS_TOKEN');
    return token;
  }

  const removeToken = () => {
    localStorage.removeItem('POS_ACCESS_TOKEN');
    authDispatch({type: 'REMOVE_TOKEN'})
  }
   
  
   return (
      <MainContext.Provider value={{ 
         setToken,
         getToken,
         removeToken,
         authUser, 
         setAuthUser,
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
         salesItemDispatch,
         stockState, 
         stockDispatch
      }}>
      { children }
      </MainContext.Provider>
    )
}


export const MainContextState = () => {
   return useContext(MainContext)
 }

export default MainContextProvider
