import React, { useEffect, useState } from 'react'
import AxiosClient from '../../../axios/axiosClient';

const ProductsSalesByDayPrint = React.forwardRef((props,  ref) => { 
 
const allSales = props.allSales
console.log(props.allSales)

  return (
   <div ref={ref}>
      <section className='px-[2rem] py-[2.5rem]'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-3xl font-bold'>Product Sales on: {props.created_at}</h2>
                <div className='text-md font-semibold'>
                    <div className='pb-0 mb-0'> Currency: { props.currency } </div>
                    <div className='pb-0 mb-0'> Count: {allSales.length} </div>
                </div>
            </div>
            <div className='w-full flex justify-start border border-slate-300 py-2'>
                <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>PRODUCT NAME </div>
                <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>QUANTITY </div>
                <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>TOTAL PRICE </div>
                <div className='w-[15%] border-r border-slate-300 font-semibold px-3'>CURRENCY</div>
                <div className='w-[15%] font-semibold px-3'>DATE </div>
            </div>

           
            { allSales &&
                allSales.map((item, i) => (
                <div key={i} className='w-full flex justify-start border border-slate-300 py-1'>
                    <div className='w-[25%] border-r border-slate-300 px-3'> {item.product_name} </div>
                    <div className='w-[20%] border-r border-slate-300 px-3'> {item.quantity_sold ? item.quantity_sold : 0} </div>
                    <div className='w-[25%] border-r border-slate-300 px-3'> ${(item.total_price / 100).toFixed(2)} </div>
                    <div className='w-[15%] border-r border-slate-300 px-3'> {item.currency} </div>
                    <div className='w-[15%] px-3'> {item.created_at} </div>
                </div>
                ))
            }
 
        </section>
    </div>
  )
});

export default ProductsSalesByDayPrint