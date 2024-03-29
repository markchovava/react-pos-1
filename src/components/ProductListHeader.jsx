import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'

function ProductListHeader() {
  return (
   <section className='w-[89vw] h-[32vh] fixed border-b border-black '>
      {/* Title and User Name */}
      <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg'>
         <div className='w-[96%] flex justify-between items-center'>
            <div className=''>
               <h1 className='font-bold text-xl'> Product List Page </h1>
            </div>
            <div className=''>
                  <h2 className='font-semibold text-xl'>User: Mark Chovava</h2>
            </div>
         </div>
      </div>
      {/* Search and Add */}
      <div className='w-full h-[15vh] flex items-end justify-center shadow-lg'>
      <div className='w-[100%] bg-white pt-4 pb-2 flex justify-center items-center pr-[0.5rem]'>
         <div className='w-[96%] flex justify-between items-center'>
            <div className='w-[40%]'>
               <input type='text' placeholder='Search Product...' 
                  className='w-full rounded-md px-3 py-2 text-slate-500 border border-slate-300 outline-none'/>
            </div>
            <div className='flex items-center justify-between gap-4'>
               <div className='flex items-center justify-between'>
                  <div className='py-2 px-2 hover:scale-125 cursor-pointer hover:text-blue-600'>
                  <BsChevronDoubleLeft />
                  </div>
                  <div className='py-2 px-2 font-semibold transition-all hover:scale-125 cursor-pointer hover:text-blue-600'>
                  1
                  </div>
                  <div className='py-2 px-2 font-semibold transition-all hover:scale-125 cursor-pointer hover:text-blue-600'>
                  2
                  </div>
                  <div className='py-2 px-2 transition-all hover:scale-125 cursor-pointer hover:text-blue-600'>
                  <BsChevronDoubleRight />
                  </div>
               </div>
               <button 
                  className='bg-blue-500 hover:bg-blue-600 duration py-2 px-3 rounded-md text-white'>
                  Add Product
               </button>
            </div>
         </div>
      </div>
      </div>
      {/* ProductMainContentTitle */}
      <div className='w-full h-[7vh] bg-white flex items-end justify-center pr-[0.5rem]'>
         <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
            <div className='w-[30%] border-r border-slate-300 font-semibold px-3'>NAME</div>
            <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>BARCODE</div>
            <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>QUANTITY</div>
            <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>UNIT PRICE</div>
            <div className='w-[10%] font-semibold px-3'>ACTIONS </div>
         </div>
      </div>
   </section>
  )
}

export default ProductListHeader