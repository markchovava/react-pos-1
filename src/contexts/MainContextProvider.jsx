import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { redirect, useParams } from "react-router-dom";
import AxiosClient from '../axios/axiosClient';
import { productInitialState, productReducer} from '../reducers/ProductReducer';
import { posInitialState, posReducer, posInit, currencyInitialState, currencyReducer, 
   paymentInitialSate, paymentReducer} 
       from '../reducers/PosReducer';
import { salesInitialState, salesReducer } from '../reducers/SalesReducer';
import { salesItemInitialState, salesItemReducer } from '../reducers/SalesItemReducer';
import { userInitialState, userReducer } from '../reducers/UserReducer';
import { recieptReducer, recieptInitialState } from '../reducers/RecieptReducer';
import { stockInitialState, stockReducer } from '../reducers/StockReducer';
import { supplierInitialState, supplierReducer } from '../reducers/SupplierReducer';




export const MainContext = createContext()

function MainContextProvider({ children }) {
   const [authUser, setAuthUser] = useState({})
   const [userState, userDispatch] = useReducer(userReducer, userInitialState)
   const [productState, productDispatch] = useReducer(productReducer, productInitialState)
   const [posState, posDispatch ] = useReducer(posReducer, posInitialState, posInit)
   const [currencyState, currencyDispatch ] = useReducer(currencyReducer, currencyInitialState)
   const [paymentState, paymentDispatch] = useReducer(paymentReducer, paymentInitialSate)
   const [salesState, salesDispatch] = useReducer(salesReducer, salesInitialState)
   const [salesItemState, salesItemDispatch] = useReducer(salesItemReducer, salesItemInitialState)
   const [zwlRate, setZwlRate] = useState('')
   const [recieptState, recieptDispatch] = useReducer(recieptReducer, recieptInitialState)
   const [stockState, stockDispatch] = useReducer(stockReducer, stockInitialState)
   const [supplierState, supplierDispatch] = useReducer(supplierReducer, supplierInitialState)

  const setToken = (token) => {
    localStorage.setItem('POS_ACCESS_TOKEN', token);
  }
  
  const getToken = () => {
    const token = localStorage.getItem('POS_ACCESS_TOKEN');
    return token;
  }
  const _token = getToken()

  const removeToken = () => {
    localStorage.removeItem('POS_ACCESS_TOKEN');
  }
   
  
   return (
      <MainContext.Provider value={{ 
        recieptState, 
        recieptDispatch,
         userState, 
         userDispatch,
         _token,
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
         stockDispatch,
         supplierState, 
         supplierDispatch,
      }}>
      { children }
      </MainContext.Provider>
    )
}


export const MainContextState = () => {
   return useContext(MainContext)
 }

export default MainContextProvider
