import React from 'react'
import { ImCancelCircle } from 'react-icons/im'

function PosMainContentProductTitle() {
  return (
    <div className='w-full h-[7vh] bg-white flex justify-center items-center shadow-lg'>
      <div className='w-[96%] h-[100%] flex items-center justify-start text-lg'>
          <div className='w-[35%] border-r border-slate-900 font-semibold px-3'>NAME</div>
          <div className='w-[20%] border-r border-slate-900 font-semibold px-3'>UNIT PRICE</div>
          <div className='w-[20%] border-r border-slate-900 font-semibold px-3'>QUANTITY</div>
          <div className='w-[20%] border-r border-slate-900 font-semibold px-3'>TOTAL PRICE</div>
          <div className='w-[5%] font-semibold px-3'> <ImCancelCircle /></div>
      </div>
    </div>
  )
}

export default PosMainContentProductTitle