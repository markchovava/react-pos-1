import React from 'react'

function PosRightContent() {
  return (
    <section className='w-[24vw] h-[100%] right-0 bg-slate-900 text-white fixed overflow-y-scroll scroll__width'>
      {/* PosRightTop */}
      <div className='w-full h-auto px-6 pt-8 pb-6'>
        <p className='text-sm font-semibold'>TOTAL:</p>
        <h3 className='text-4xl font-bold text-orange-400'>$ 1000 000.00</h3>
      </div>

      <div className='border-b border-slate-500 mx-6'></div>
      <div className='mb-1'></div>
      <div className='border-b border-slate-500 mx-6'></div>

      <div className='w-full h-auto px-6 py-6'>
        <div className='font-semibold'>
          <p className='text-sm mb-2'>Amount Paid</p>
          <input type="text" className='text-2xl text-black font-semibold px-3 py-2 border-none outline-none rounded w-full'/>
        </div>
      </div>

      <div className='border-b border-slate-500 mx-6'></div>
      <div className='mb-1'></div>
      <div className='border-b border-slate-500 mx-6'></div>

      <div className='w-full h-auto px-6 py-6'>
        <div className='font-semibold'>
          <p className='text-sm'>Subtotal</p>
          <h3 className='text-3xl text-yellow-100'>$23 000.00</h3>
        </div>
        <div className='mb-4'></div>
        <div className='font-semibold'>
            <p className='text-sm '>Tax (15%) </p>
            <h3 className='text-3xl text-yellow-100'>$23 000.00</h3>
        </div>
      </div>
      <div className='border-b border-slate-500 mx-6'></div>
      <div className='mb-1'></div>
      <div className='border-b border-slate-500 mx-6'></div>


      <div className='w-full h-auto px-6 py-6'>
        <div className='font-semibold'>
          <p className='text-sm mb-3'>Method of Payment</p>
          <div className='flex justify-between gap-2'>
            <button className='px-4 py-3 border border-slate-400 rounded-lg'>Cash</button>
            <button className='px-4 py-3 bg-blue-600 rounded-lg'>EcoCash</button>
            <button className='px-4 py-3 bg-green-600 rounded-lg'>Swipe</button>
          </div>
        </div>
      </div>

      <div className='border-b border-slate-500 mx-6'></div>
      <div className='mb-1'></div>
      <div className='border-b border-slate-500 mx-6'></div>

      <div className='w-full h-auto px-6 py-6'>
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