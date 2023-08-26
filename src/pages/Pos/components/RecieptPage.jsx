import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { MainContextState } from '../../../contexts/MainContextProvider';



const RecieptPage = React.forwardRef((props,  ref) => { 
  const {recieptState} = MainContextState();
  const {recieptData, app_info, user_info} = props;
  const items = recieptState.items;
 
  console.log(recieptState.items)
  
 

  return (

      <div ref={ref}>
      { recieptData != undefined ? 
        <section className='w-[320px] px-2 py-3 '>
            <div className='text-center font-bold text-lg pb-2'>RECEIPT</div>
            <div className='text-sm font-semibold'>
              <div>Ref: {recieptData.ref_no} / {recieptData.id}</div>
              <div>Shop: {app_info.name}, {app_info.address}, {app_info.phone_number}</div>
              <div className='flex justify-between items-center'>
                <div>User: {user_info.first_name}</div>
                <div>Date: {recieptData.created_at}</div>
              </div> 
              <div>Currency: {recieptData.currency}</div>
            </div> 
            <div className='text-center'>
              ---------------------
            </div>
            
            <div className='text-sm'>
              <div className='py-1 flex justify-between font-semibold'>
                <div>PRODUCT</div>
                <div>QUANTITY</div>
                <div>TOTAL PRICE</div>
              </div>
              {items && items.map((item) => (
                  <div className='pt-2 pb-1 flex justify-between items-center'>
                    <div>
                      {item.product_name} <br /> 
                      {(item.unit_price / 100).toFixed(2)}
                    </div>
                    <div> 
                      x {item.quantity_sold}
                    </div>
                    <div>
                      ${(item.total_price / 100).toFixed(2)}
                    </div>
                  </div>
                ))} 
            </div>

            <div className='text-center'>
              ---------------------
            </div>

            <div className='font-semibold text-sm'>
              <div className='pt-2 pb-1 flex justify-between'>
                <div>TOTAL QUANTITY</div>
                <div>
                  {recieptData.quantity_total && recieptData.quantity_total}
                </div>
              </div>
              {/* <div className='pt-2 pb-1 flex justify-between'>
                <div>SUBTOTAL</div>
                <div>
                  ${recieptData?.subtotal && (recieptData.subtotal / 100).toFixed(2)}
                </div>
              </div> */}
             
              {/* <div className='pt-2 pb-1 flex justify-between'>
                <div>TAX</div>
                <div>
                  ${recieptData?.tax && (recieptData.tax / 100).toFixed(2)}
                </div>
              </div> */}

              <div className='pt-2 pb-1 flex justify-between'>
                <div>GRANDTOTAL</div>
                <div>
                  ${recieptData?.grandtotal && (recieptData.grandtotal / 100).toFixed(2)}
                </div>
              </div>
            </div> 

            <div className='text-center py-3'>Thank you.</div>
          </section> 
      : 
        'No data Available...'
      }
          
        </div>
  
  )
});

export default RecieptPage