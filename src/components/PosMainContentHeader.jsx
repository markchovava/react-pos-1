import React from 'react'

function PosMainContentHeader() {
  return (
    <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg'>
        <div className='w-[96%] flex justify-between items-center'>
            <div className=''>
            <h1 className='font-bold text-xl'>POS PAGE </h1></div>
            <div className=''>
                <h2 className='font-semibold text-xl'>Operator: Mark Chovava</h2>
            </div>
            <div className='flex items-center justify-between gap-3'>
                <select className='text-lg border-none outline-none'>
                    <option>USD</option>
                    <option>ZWL</option>
                </select>
                {/* Button */}
                <select className='text-lg border-none outline-none'>
                    <option>Scan Mode</option>
                    <option>Search Mode</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default PosMainContentHeader