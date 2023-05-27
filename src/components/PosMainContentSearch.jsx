import React from 'react'

function PosMainContentSearch() {
  return (
    <div className='w-full h-[20vh] flex justify-center items-center'>
      {/* Barcode */}
      <form className='h-[12vh] w-full flex justify-center'>
        <div className='bg-white w-[96%] shadow-lg flex justify-center items-center'>
          <input type='text' placeholder='Scan Code...'
          className='shadow appearance-none border rounded w-[94%] text-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>   
      </form>
    </div>
  )
}

export default PosMainContentSearch