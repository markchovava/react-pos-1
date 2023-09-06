import React from 'react'



const PriceListPrint = React.forwardRef((props,  ref) => { 

    const products = props.products
  
      let date = new Date()
      let day = date.getDate()
      let month = date.getMonth() <= 9 ? '0' + date.getMonth() : date.getMonth()
      let year = date.getFullYear()
      let currentDate = `${day} / ${month} / ${year}`
  
    return (
      <div ref={ref}>
        <section className='px-[2rem] py-[2.5rem]'>
          <div className='flex items-center justify-between mb-4'>
              <h2 className='text-3xl font-bold'>Prices Report</h2>
              <div className='text-md font-semibold'>
                  <div className='pb-0 mb-0'> Date: { currentDate } </div>
                  <div className='pb-0 mb-0'> Count: {products.results?.length} </div>
              </div>
          </div>
          <div className='w-full flex justify-start border border-slate-300 py-2'>
              <div className='w-[40%] border-r border-slate-300 font-semibold px-3'>PRODUCT NAME </div>
              <div className='w-[30%] border-r border-slate-300 font-semibold px-3'>UNIT PRICE </div>
              <div className='w-[30%] border-r border-slate-300 font-semibold px-3'>LAST UPDATED </div>
          </div>
          
          { products?.results &&
              products?.results.map((item, i) => (
              <div key={i} className='w-full flex justify-start border border-slate-300 py-1'>
                  <div className='w-[40%] border-r border-slate-300 px-3'> {item.name} </div>
                  <div className='w-[30%] border-r border-slate-300 px-3'> ${(item.unit_price / 100).toFixed(2)} </div>
                  <div className='w-[30%] border-r border-slate-300 px-3'> {item.updated_at} </div>
              </div>
              )
          )}
  
        </section>
      </div>
    )
  })
  
  export default PriceListPrint