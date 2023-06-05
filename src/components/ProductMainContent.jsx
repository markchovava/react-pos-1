import React from 'react'
import ProductHeader from './ProductHeader'


function ProductMainContent() {

  return (
   <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
      {/* ProductHeader */}
      <section className='w-[90vw] h-[25vh] left-[10vw] bg-slate-100 fixed'>
         {/* Title and User Name */}
         <div className='w-full h-[10vh] bg-white border-b border-slate-400 flex items-center justify-center shadow-lg pr-[1rem]'>
            <div className='w-[96%] flex justify-between items-center'>
               <div className=''>
                  <h1 className='font-bold text-xl'> Product Details Page</h1>
               </div>
               <div className=''>
                     <h2 className='font-semibold text-xl'>User: Mark Chovava</h2>
               </div>
            </div>
         </div>
         {/* Title */}
         <div className='w-full h-[15vh]  shadow-lg flex justify-center items-end pr-[1rem]'>
            <div className='w-full h-[10vh] bg-white flex justify-center'>
               <div className='w-[96%] flex justify-between items-end pb-2'>
                  <h1 className='text-4xl font-bold'> Product Details </h1>
                  <button className='px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>View All</button>
               </div>
            </div>    
         </div>
         </section>
      {/* ProductDetails */}
      <section className='w-[90vw] h-[75vh] top-[25vh] left-[10vw] border-t border-slate-200 bg-white fixed overflow-y-auto scroll__width pb-8'>

         <div className='w-[96%] h-auto mx-auto'>
            <div className='py-8'>
               <div className='flex items-center justify-start mb-7'>
                  <label className='w-[20%] font-semibold text-slate-900'>Product Name:</label>
                  <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                     Mazowe Orange Crush
                  </div>
               </div>
               <div className='flex items-center justify-start mb-7'>
                  <label className='w-[20%] font-semibold text-slate-900'>Bar Code:</label>
                  <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                     1212121212121212
                  </div>
               </div>
               <div className='flex items-center justify-start mb-7'>
                  <label className='w-[20%] font-semibold text-slate-900'>Unit Price:</label>
                  <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                     $3.50
                  </div>
               </div>
               <div className='flex items-center justify-start mb-7'>
                  <label className='w-[20%] font-semibold text-slate-900'>Stock:</label>
                  <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                     34
                  </div>
               </div>
               <div className='flex items-center justify-start mb-7'>
                  <label className='w-[20%] font-semibold text-slate-900'>Brand:</label>
                  <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                     Shweppes
                  </div>
               </div>
               <div className='flex items-center justify-start mb-7'>
                  <label className='w-[20%] font-semibold text-slate-900'>Category:</label>
                  <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                     Drink, Grocery, Hydrates
                  </div>
               </div>
            </div>
         </div>
   
      </section>
   </section>
  )
}

export default ProductMainContent