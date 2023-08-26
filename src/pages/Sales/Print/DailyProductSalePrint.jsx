import React from 'react'

const DailyProductSalePrint = React.forwardRef((props,  ref) => { 
    
    const sales = props.sales

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() <= 9 ? '0' + date.getMonth() : date.getMonth()
    let year = date.getFullYear()
    let currentDate = `${day} / ${month} / ${year}`
  return (
    <div ref={ref}>
        <section className='px-[2rem] py-[2.5rem]'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-3xl font-bold'>Daily Product Sales: {props.currency}</h2>
                <div className='text-md font-semibold'>
                    <div className='pb-0 mb-0'> Date: { currentDate } </div>
                    <div className='pb-0 mb-0'> Count: {sales.results?.length} </div>
                </div>
            </div>
            <div className='w-full flex justify-start border border-slate-300 py-2'>
                <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>PRODUCT NAME </div>
                <div className='w-[15%] border-r border-slate-300 font-semibold px-3'>DATE </div>
                <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>QUANTITY </div>
                <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>TOTAL PRICE </div>
                <div className='w-[15%] font-semibold px-3'>CURRENCY</div>
            </div>
            
            { sales?.results &&
                sales?.results.map((item, i) => (
                <div key={i} className='w-full flex justify-start border border-slate-300 py-1'>
                    <div className='w-[25%] border-r border-slate-300 px-3'> {item.product_name} </div>
                    <div className='w-[15%] border-r border-slate-300 px-3'> {item.created_at} </div>
                    <div className='w-[20%] border-r border-slate-300 px-3'> {item.quantity_sold ? item.quantity_sold : 0} </div>
                    <div className='w-[25%] border-r border-slate-300 px-3'> ${(item.total_price / 100).toFixed(2)} </div>
                    <div className='w-[15%] px-3'> {item.currency} </div>
                </div>
                )
            )}

        </section>
    </div>
  )
});

export default DailyProductSalePrint