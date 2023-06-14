import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import PosLeftContent from '../../components/PosLeftContent'
import { AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'


function ProductSale() {


  return (
    <section className='bg-slate-100 h-auto w-full overflow-hidden'>
      <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
        <PosLeftContent />
        <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
            <section className='w-[89vw] h-[32vh] fixed border-b border-black '>
              {/* Page Title and Username */}
              <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg pr-[0.5rem]'>
                  <div className='w-[96%] flex justify-between items-center'>
                    <div className=''>
                        <h1 className='font-bold text-xl'> Product Current Sales Page </h1>
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
                        <input type='text' placeholder='Search by Day...' 
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
                    
                    </div>
                  </div>
              </div>
              </div>
              {/* ListStockTableTitle */}
              <div className='w-full h-[7vh] bg-white flex items-end justify-center pr-[0.5rem]'>
                  {/* Table Row */}
                  <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                    <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>PRODUCT NAME </div>
                    <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>QUANTITY </div>
                    <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>TOTAL PRICE </div>
                    <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>PAYMENT METHOD</div>
                    <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>ACTION</div>
                  </div>
              </div>
            </section>
            <section className='w-[89vw] h-[68vh] top-[32vh] text-black fixed overflow-y-auto scroll__width pb-8'>
              {/* ListStockTable */}
              <div className='w-full bg-white flex flex-col items-center justify-center text-md'>
                  {/* Table Row */}
                  <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                    <div className='w-[20%] border-r border-slate-300 px-3'>Mango </div>
                    <div className='w-[20%] border-r border-slate-300 px-3'>100 </div>
                    <div className='w-[20%] border-r border-slate-300 px-3'>$200.00 </div>
                    <div className='w-[20%] border-r border-slate-300 px-3'> USD</div>
                    <div className='w-[20%] border-r border-slate-300 px-3'> 
                        <Link to=''>
                            <AiFillEye className='text-xl transition text-slate-800 hover:text-blue-600 hover:scale-110'/>
                        </Link>
                    </div>
                  </div>   
                  {/* Table Row */}
                  <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                    <div className='w-[20%] border-r border-slate-300 px-3'>Mango </div>
                    <div className='w-[20%] border-r border-slate-300 px-3'>100 </div>
                    <div className='w-[20%] border-r border-slate-300 px-3'>$200.00 </div>
                    <div className='w-[20%] border-r border-slate-300 px-3'> USD</div>
                    <div className='w-[20%] border-r border-slate-300 px-3'> 
                        <Link to=''>
                            <AiFillEye className='text-xl transition text-slate-800 hover:text-blue-600 hover:scale-110'/>
                        </Link>
                    </div>
                  </div>   
                
              </div>
              

            </section>
        </section>

      </div>
    </section>
  )
}

export default ProductSale