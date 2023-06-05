import React from 'react'

function ProductAddForm() {
  return (
    <section className='w-[96%] h-auto mx-auto'>
      <form className='py-8'>
        <div className='flex items-center justify-start mb-6'>
          <label className='w-[25%] font-semibold text-slate-900'>Product Name:</label>
          <input type="text"
          className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
          placeholder='Write Product Name...'/>
        </div>
        <div className='flex items-center justify-start mb-6'>
          <label className='w-[25%] font-semibold text-slate-900'>
            Barcode:
          </label>
          <input type="number"
          className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
          placeholder='Enter Barcode here...'/>
        </div>
        <div className='flex items-center justify-start mb-6'>
          <label className='w-[25%] font-semibold text-slate-900'>
            Product Stock:
          </label>
          <input type="number"
          className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
          placeholder='Enter Quantity Here...'/>
        </div>
        <div className='flex items-center justify-start mb-6'>
          <label className='w-[25%] font-semibold text-slate-900'>
            Unit Price:
          </label>
          <input type="number"
          className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
          placeholder='Enter Unit Price Here...'/>
        </div>
        <div className='flex items-center justify-start mb-6'>
          <div className='w-[70%] ml-[25%]'>
            <button type='submit' 
              className='py-3 w-full rounded-md border border-white transition text-white bg-blue-600 hover:bg-blue-700'>
              Submit
            </button>
          </div>
          
        </div>
      </form>
    </section>
  )
}

export default ProductAddForm