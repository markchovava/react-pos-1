import React from 'react'
import PosLeftContent from '../../components/PosLeftContent'
import { BiTimeFive } from 'react-icons/bi'
import { TbBrandProducthunt } from 'react-icons/tb'
import { MdCalendarMonth, MdPermIdentity } from 'react-icons/md'
import { FaRegUser, FaCalendarDay, FaProductHunt } from 'react-icons/fa'
import { Link } from 'react-router-dom'



function SalesPage() {
  return (
   <section className='bg-slate-100 h-auto w-full overflow-hidden'>
      <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
         <PosLeftContent />
         {/*  */}
         <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
            {/* ProductListHeader */}
            <section className='w-[89vw] h-[10vh] fixed border-b border-black '>
               {/* Title and User Name */}
               <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg'>
                  <div className='w-[96%] flex justify-between items-center'>
                      <div className=''>
                        <h1 className='font-bold text-xl'> Sales List Page </h1>
                      </div>
                      <div className=''>
                            <h2 className='font-semibold text-xl'>User: Mark Chovava</h2>
                      </div>
                  </div>
                </div>
            </section>
            {/* CONTENT AREA */}
            <section className='w-[89vw] h-[90vh] top-[10vh] text-black fixed overflow-y-auto scroll__width pb-8 '>
               <div className='w-full h-[100%]'>
                  <section className='w-[96%] h-[80vh] my-[5vh] mx-auto'>
                     <div className='grid grid-cols-5'>
                        <Link to='/sales/product'>
                           <div className='border-x border-y border-green-500 hover:border-green-600 text-green-500 hover:text-green-600 cursor-pointer transition flex flex-col items-center justify-center gap-3 py-8'> 
                              <TbBrandProducthunt className='text-[5rem]' />
                              <div className='text-xl font-semibold p-2 mx-auto text-center'>
                                Product Sales
                              </div>
                           </div>
                        </Link>
                       
                        <Link to='/sales/daily/usd'>
                           <div className='border-t border-b border-r border-pink-500 hover:border-pink-600 text-pink-500 hover:text-pink-600 cursor-pointer transition flex flex-col items-center justify-center gap-3 py-8'> 
                              <FaCalendarDay className='text-[5rem]' />
                              <div className='text-xl font-semibold p-2 mx-auto text-center'>
                                 Daily USD Sales
                              </div>
                           </div>
                        </Link>
                        <Link to='/sales/daily/zwl'>
                           <div className='border-t border-b border-r border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600 cursor-pointer transition flex flex-col items-center justify-center gap-3 py-8'> 
                              <FaCalendarDay className='text-[5rem]' />
                              <div className='text-xl font-semibold p-2 mx-auto text-center'>
                                 Daily ZWL Sales
                              </div>
                           </div>
                        </Link>
                        <Link to='/sales/monthly/usd'>
                          <div className='border-t border-b border-r border-violet-600 hover:border-violet-700 text-violet-500 hover:text-violet-600 transition cursor-pointer flex flex-col items-center justify-center gap-3 py-8'>
                            <MdCalendarMonth className='text-[5rem]' />
                            <div className='text-xl font-semibold p-2 mx-auto text-center'>
                              Monthly USD Sales
                            </div>
                          </div>
                        </Link>
                        <Link to='/sales/monthly/zwl'>
                          <div className='border-t border-b border-r border-gray-600 hover:border-gray-700 text-gray-500 hover:text-gray-600 transition cursor-pointer flex flex-col items-center justify-center gap-3 py-8'>
                            <MdCalendarMonth className='text-[5rem]' />
                            <div className='text-xl font-semibold p-2 mx-auto text-center'>
                              Monthly ZWL Sales
                            </div>
                          </div>
                        </Link>
                        <Link to='/sales/user'>
                          <div className='border-t border-b border-r border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 transition cursor-pointer flex flex-col items-center justify-center gap-3 py-8'>
                            <FaRegUser className='text-[5rem] '/>
                            <div className='text-xl font-semibold p-2 mx-auto text-center'>
                              User Sales
                            </div>
                          </div>
                        </Link>
                     </div>
                  </section>
               </div>

            </section>
         </section>
     </div>
   </section>
  )
}

export default SalesPage