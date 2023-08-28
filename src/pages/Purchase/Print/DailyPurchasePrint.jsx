import React from 'react'

const DailyPurchasePrint =  React.forwardRef((props,  ref) => { 

    const purchase = props.purchases
    
    /* CURRENT DATE */
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() <= 9 ? '0' + date.getMonth() : date.getMonth();
    let year = date.getFullYear();
    let currentDate = `${day} / ${month} / ${year}`;

  return (
    <div ref={ref}>
        <section className='px-[2rem] py-[2.5rem]'>
            {/* ---------------------------------------- */}
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-3xl font-bold'>
                    Stock Purchase List: {props.currency}</h2>
                <div className='text-md font-semibold'>
                    <div className='pb-0 mb-0'> Date: { currentDate } </div>
                    <div className='pb-0 mb-0'> Count: {purchase.results?.length} </div>
                </div>
            </div>
            {/* ---------------------------------------- */}
            <div className='w-full flex justify-start border border-slate-300 py-2'>
                <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>DATE </div>
                <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>QUANTITY </div>
                <div className='w-[35%] border-r border-slate-300 font-semibold px-3'>PURCHASE TOTAL </div>
                <div className='w-[15%] border-r border-slate-300 font-semibold px-3'>CURRENCY </div>
            </div>
            {/* ---------------------------------------- */}
            { purchase.results && 
                purchase.results.map((item, i) => (
                    <div key={i} className='w-full border border-slate-300 bg-white py-2 flex justify-center items-center'>
                        <div className='w-[25%] border-r border-slate-300 px-3'> { item.created_at }</div>
                        <div className='w-[25%] border-r border-slate-300 px-3'> {item.quantity_total} </div>
                        <div className='w-[35%] border-r border-slate-300 px-3'> ${(item.purchase_total / 100).toFixed(2)} </div>
                        <div className='w-[15%] border-r border-slate-300 px-3'> { item.currency } </div>
                    </div>
                ))
            }
        </section>
    </div>

    
  )
})

export default DailyPurchasePrint