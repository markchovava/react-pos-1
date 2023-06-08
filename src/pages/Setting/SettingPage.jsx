import React from 'react'
import PosLeftContent from '../../components/PosLeftContent'
import { BsCurrencyDollar } from 'react-icons/bs'
import { MdPermIdentity } from 'react-icons/md'
import { FaCalculator } from 'react-icons/fa'
import { Link } from 'react-router-dom'



function SettingPage() {
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
                        <h1 className='font-bold text-xl'> Settings List Page </h1>
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
                        <Link to='/settings/currency'>
                           <div className='bg-purple-600 hover:bg-purple-700 cursor-pointer transition flex flex-col items-center justify-center gap-3 py-8'> 
                              <BsCurrencyDollar className='text-[5rem] text-white' />
                              <div className='text-xl text-white font-semibold p-2 mx-auto text-center'>
                                 Currency Conversion
                              </div>
                           </div>
                        </Link>
                        <div className='bg-green-600 hover:bg-green-700 transition cursor-pointer flex flex-col items-center justify-center gap-3 py-8'>
                           <MdPermIdentity className='text-[5rem] text-white' />
                           <div className='text-xl text-white font-semibold p-2 mx-auto text-center'>Permissions and Roles</div>
                        </div>
                        <div className='bg-cyan-600 hover:bg-cyan-700 transition cursor-pointer flex flex-col items-center justify-center gap-3 py-8'>
                           <FaCalculator className='text-[5rem] text-white'/>
                           <div className='text-xl text-white font-semibold p-2 mx-auto text-center'>Calculations</div>
                        </div>
                     </div>
                  </section>
               </div>

            </section>
         </section>
     </div>
   </section>
  )
}

export default SettingPage