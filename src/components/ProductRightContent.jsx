import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'

function ProductRightContent() {
  return (
   <section 
    className='w-[24vw] h-[100%] right-0 bg-slate-900 text-white fixed overflow-y-scroll scroll__width '>
   
      <div className='w-full pt-8'>
          <div className='border-b border-slate-500 mx-6 h-[2rem]'></div>
          <div className='mb-1'></div>
          <div className='border-b border-slate-500 mx-6'></div>
          {/*  */}
          <div className='w-full h-auto px-6 py-8'>
            <div className='font-semibold'>
              <p className='text-sm mb-2'>Category Name:</p>
              <div className='flex items-center justify-between'>
                <input type="text" placeholder='Add Category Name...'
                className='w-[85%] text-black px-3 py-2 border-none outline-none rounded-md'/>
                <button className='w-[15%] flex justify-center items-center'>
                  <IoMdAddCircleOutline className='text-2xl transition-all hover:scale-110' />
                </button>
              </div>
              
            </div>
          </div>
          <div className='border-b border-slate-500 mx-6 h-[.5rem]'></div>
          <div className='mb-1'></div>
          <div className='border-b border-slate-500 mx-6'></div>
          {/*  */}
          <div className='w-full h-auto px-6 my-8'>
            <div className='font-semibold'>
              <p className='text-sm mb-2'>Brand Name:</p>
              <div className='flex items-center justify-between'>
                <input type="text" placeholder='Add Brand Name...'
                className='w-[85%] text-black px-3 py-2 border-none outline-none rounded-md'/>
                <button className='w-[15%] flex justify-center items-center'>
                  <IoMdAddCircleOutline className='text-2xl transition-all hover:scale-110' />
                </button>
              </div>
              
            </div>
          </div>
          <div className='border-b border-slate-500 mx-6'></div>
          <div className='mb-1'></div>
          <div className='border-b border-slate-500 mx-6'></div>
      </div>
  
   </section>

  )
}

export default ProductRightContent