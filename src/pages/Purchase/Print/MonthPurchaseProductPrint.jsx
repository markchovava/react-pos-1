import React from 'react'

const MonthPurchaseProductPrint = React.forwardRef((props,  ref) => {

    const purchase = props.purchase

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() <= 9 ? '0' + date.getMonth() : date.getMonth();
    let year = date.getFullYear();
    let currentDate = `${day} / ${month} / ${year}`;

  return (
    <div ref={ref}>
        <section className='px-[2rem] py-[2.5rem]'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-3xl font-bold'>Daily Stock Purchase: {props.currency}</h2>
                <div className='text-md font-semibold'>
                    <div className='pb-0 mb-0'> Date: { currentDate } </div>
                    <div className='pb-0 mb-0'> Count: {purchase.results?.length} </div>
                </div>
            </div>
            <div className='w-full flex justify-start border border-slate-300 py-2'>
                <div className='w-[30%] border-r border-slate-300 font-semibold px-3'>PRODUCT NAME </div>
                <div className='w-[15%] border-r border-slate-300 font-semibold px-3'>QUANTITY </div>
                <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>TOTAL COST </div>
                <div className='w-[15%] border-r border-slate-300 font-semibold px-3'>CURRENCY</div>
                <div className='w-[20%] font-semibold px-3'>DATE </div>
            </div>
            
            {/* Table Row */}
            { purchase?.results &&
                purchase?.results.map((item, i) => (
                    <div key={item.id} className='w-full bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                      <div className='w-[30%] border-r border-slate-300 px-3'>{item.product_name} </div>
                      <div className='w-[15%] border-r border-slate-300 px-3'>
                            {item.quantity_bought ? item.quantity_bought : 0} </div>
                      <div className='w-[20%] border-r border-slate-300 px-3'>
                            ${(item.total_cost / 100).toFixed(2)} </div>
                      <div className='w-[15%] border-r border-slate-300 px-3'> 
                            {item.currency} </div>
                      <div className='w-[20%] border-r border-slate-300 px-3'>
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
                    </div>   
                ))
            }

        </section>
    </div>
  )
})

export default MonthPurchaseProductPrint