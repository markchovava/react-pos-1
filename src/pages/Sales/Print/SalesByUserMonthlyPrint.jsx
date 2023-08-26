import React from 'react'

const SalesByUserMonthlyPrint = React.forwardRef((props,  ref) => { 

    const sales = props.sales
    const user = props.user

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() <= 9 ? '0' + date.getMonth() : date.getMonth()
    let year = date.getFullYear()
    let currentDate = `${day} / ${month} / ${year}`

  return (
    <div ref={ref}>
      <section className='px-[2rem] py-[2.5rem]'>
          <div className='flex items-center justify-between mb-4'>
              <h2 className='text-3xl font-bold'>
                Monthly Sales by: 
                <span className='text-green-800'> {`${user.first_name} ${user.last_name}`}</span> 
              </h2>
              <div className='text-md font-semibold'>
                  <div className='pb-0 mb-0'> Date: { currentDate } </div>
                  <div className='pb-0 mb-0'> Count: {sales.results?.length} </div>
              </div>
          </div>
          <div className='w-full flex justify-start border border-slate-300 py-2'>
              <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>MONTH </div>
              <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>QUANTITY </div>
              <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>TOTAL PRICE </div>
              <div className='w-[25%] font-semibold px-3'>CURRENCY</div>
          </div>
          
          { sales?.results &&
              sales?.results.map((item, i) => (
              <div key={i} className='w-full flex justify-start border border-slate-300 py-1'>
                  <div className='w-[25%] border-r border-slate-300 px-3'> 
                        { item.month == 1 && 'January'}
                          { item.month == 2 && 'February'}
                          { item.month == 3 && 'March'}
                          { item.month == 4 && 'April'}
                          { item.month == 5 && 'May'}
                          { item.month == 6 && 'June'}
                          { item.month == 7 && 'July'}
                          { item.month == 8 && 'August'}
                          { item.month == 9 && 'September'}
                          { item.month == 10 && 'October'}
                          { item.month == 11 && 'November'}
                          { item.month == 12 && 'December'}
                          {` ${item.year}`}
                   </div>
                  <div className='w-[25%] border-r border-slate-300 px-3'> {item.quantity_total} </div>
                  <div className='w-[25%] border-r border-slate-300 px-3'> ${(item.grandtotal / 100).toFixed(2)} </div>
                  <div className='w-[25%] px-3'> { item.currency } </div>
              </div>
              )
          )}

      </section>
  </div>
  )
})

export default SalesByUserMonthlyPrint