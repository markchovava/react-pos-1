import React, { useRef, useState } from 'react'
import { MainContextState } from '../../../contexts/MainContextProvider';


function PosRightContent() {
  const {posState, zwlRate, currencyState} = MainContextState()
  const [amount, setAmount] = useState(0)
  const amountRef = useRef()

    /* GRANDTOTAL */
    const calculateGrandTotal = () => {
      const calculateGrandTotal = posState.products.reduce((acc, item) => acc + item.total_price, 0);
      let grandtotal;
      if(currencyState.currency.name == 'ZWL'){
        grandtotal = (currencyState.currency.rate / 100) * calculateGrandTotal
      } else{
        grandtotal = calculateGrandTotal
      }
      return grandtotal;
    };
    /* SUBTOTAL */
    const calculateSubTotal = () => {
      const subtotal = calculateGrandTotal() - calculateTax();
      return subtotal;
    };
    /* TAX */
    const calculateTax = () => {
      const tax = (15 / 100) * calculateGrandTotal();
      return tax;
    }
    /* CHANGE */
    const calculateChange = () => {
      const change = (amount * 100) - calculateGrandTotal();
      return change;
    }
    /* OWING */
    const calculateOwing = () => {
      const owing = calculateGrandTotal() - (amount * 100);
      return owing;
    }
  
  


  return (
    <section className='w-[24vw] h-[100%] right-0 bg-slate-900 text-white fixed overflow-y-scroll scroll__width'>
      {/* PosRightTop */}
      <div className='w-full h-auto px-6 pt-6 pb-4'>
        <p className='text-sm font-semibold'>TOTAL:</p>
        <h3 className='text-3xl font-bold text-yellow-400'>${calculateGrandTotal() ? (calculateGrandTotal() / 100).toFixed(2) : '0.00'}</h3>
      </div>

      <div className='border-b border-slate-500 mx-6'></div>
      <div className='mb-1'></div>
      <div className='border-b border-slate-500 mx-6'></div>

      <div className='w-full h-auto px-6 py-5'>
        <div className='font-semibold'>
          <p className='text-sm mb-2'>Amount Paid</p>
          <input type="text" 
            ref={amountRef}
            name='amount'
            onChange={() => setAmount(amountRef.current.value)}
            className='text-2xl text-black font-semibold px-3 py-2 border-none outline-none rounded w-full'/>
        </div>
      </div>

      <div className='border-b border-slate-500 mx-6'></div>
      <div className='mb-1'></div>
      <div className='border-b border-slate-500 mx-6'></div>

      <div className='w-full h-auto px-6 py-4'>
        <div className='font-semibold'>
          <p className='text-sm'>Subtotal</p>
          <h3 className='text-2xl text-yellow-100'>${calculateSubTotal() ? (calculateSubTotal() / 100).toFixed(2) : '0.00'}</h3>
        </div>
        <div className='mb-3'></div>
        <div className='font-semibold'>
            <p className='text-sm '>Tax (15%) </p>
            <h3 className='text-2xl text-yellow-100'>${ calculateTax() ? (calculateTax() / 100).toFixed(2) : '0.00' }</h3>
        </div>
        <div className='mb-3'></div>
        <div className='flex items-center justify-start gap-2'>
          <div className='font-semibold w-[50%] text-green-300'>
              <p className='text-sm '>Change </p>
              <h3 className='text-2xl'>${ calculateChange() > 0 ? (calculateChange() / 100).toFixed(2) : '0.00'}</h3>
          </div>
          <div className='font-semibold w-[50%] text-red-300'>
              <p className='text-sm '>Owing </p>
              <h3 className='text-2xl'>${ calculateOwing() > 0 ? (calculateOwing() / 100).toFixed(2) : '0.00'}</h3>
          </div>
        </div>
      </div>

      <div className='border-b border-slate-500 mx-6'></div>
      <div className='mb-1'></div>
      <div className='border-b border-slate-500 mx-6'></div>


      <div className='w-full h-auto px-6 py-5'>
        <div className='font-semibold'>
          <p className='text-sm mb-3'>Method of Payment</p>
          <div className='flex justify-between gap-2'>
            <button className='px-4 py-3 border border-slate-400 hover:border-slate-500 transition rounded-lg'>Cash</button>
            <button className='px-4 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg'>EcoCash</button>
            <button className='px-4 py-3 bg-green-600 hover:bg-green-700 transition rounded-lg'>Swipe</button>
          </div>
        </div>
      </div>

      <div className='border-b border-slate-500 mx-6'></div>
      <div className='mb-1'></div>
      <div className='border-b border-slate-500 mx-6'></div>

      <div className='w-full h-auto px-6 py-5'>
        <div className='font-semibold'>
          <div className='flex justify-between gap-2'>
            <button className='w-full text-center py-3 border border-white hover:border-[#ff0000] bg-[#ff0000] hover:bg-white hover:text-[#ff0000] transition rounded-lg'>Proceed</button>
          </div>
        </div>
      </div>

    </section>
  
  )
}

export default PosRightContent