import React from 'react'

const ListPurchasePrint =  React.forwardRef((props,  ref) => { 

    const purchase = props.purchase
    
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
                    Stock Purchase List</h2>
                <div className='text-md font-semibold'>
                    <div className='pb-0 mb-0'> Date: { currentDate } </div>
                    <div className='pb-0 mb-0'> Count: {purchase.results?.length} </div>
                </div>
            </div>
            {/* ---------------------------------------- */}
            <div className='w-full flex justify-start border border-slate-300 py-2'>
                <div className='w-[25%] border-r border-slate-300 font-semibold px-3'> REF </div>
                <div className='w-[30%] border-r border-slate-300 font-semibold px-3'> SUPPLIER </div>
                <div className='w-[25%] border-r border-slate-300 font-semibold px-3'> TOTAL </div>
                <div className='w-[20%] border-r border-slate-300 font-semibold px-3'> CREATED </div>
            </div>
            {/* ---------------------------------------- */}
            { purchase.results && 
                purchase.results.map((item, i) => (
                    <div key={i} className='w-full border border-slate-300 bg-white py-2 flex justify-center items-center'>
                        <div className='w-[25%] border-r border-slate-300 px-3'> 
                            {item.purchase_ref} </div>
                        <div className='w-[30%] border-r border-slate-300 px-3'>
                            {item.supplier_name} </div>
                        <div className='w-[25%] border-r border-slate-300 px-3'>
                            [{item.currency}] ${((item.purchase_total / 100)).toFixed(2)}</div>
                        <div className='w-[20%] border-r border-slate-300 px-3'>
                            {item.created_at} </div>  
                    </div>
                ))
            }
        </section>
    </div>

    
  )
})

export default ListPurchasePrint