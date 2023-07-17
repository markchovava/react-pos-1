import React, {useEffect} from 'react'
import PosLeftContent from '../../components/PosLeftContent'
import { MdCalendarMonth } from 'react-icons/md'
import { FaCalendarDay } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { MainContextState } from '../../contexts/MainContextProvider'
import LogoutBtn from '../../components/LogoutBtn'
import CurrentUser from '../../components/CurrentUser'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserSalesPage() {
  /* CHECK AUTHENTICATION */
  const {getToken} = MainContextState()
  const navigate = useNavigate();
  const token = getToken();
  useEffect(() => {
     if(!token){
       return navigate('/login');
     }
   },[token])


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
                        <h1 className='font-bold text-lg'> User Sales Page </h1>
                      </div>
                      <div className='flex gap-2 items-center'>
                           <CurrentUser />
                          <LogoutBtn />
                    </div>
                  </div>
                </div>
            </section>
            {/* CONTENT AREA */}
            <section className='w-[89vw] h-[90vh] top-[10vh] text-black fixed overflow-y-auto scroll__width pb-8 '>
               <div className='w-full h-[100%]'>
                  <section className='w-[96%] h-[80vh] my-[5vh] mx-auto'>
                     <div className='grid grid-cols-5'>
                       
                        <Link to=''>
                           <div className='border-t border-b border-l border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600 cursor-pointer transition flex flex-col items-center justify-center gap-3 py-8'> 
                              <FaCalendarDay className='text-[5rem]' />
                              <div className='text-md font-semibold p-2 mx-auto text-center'>
                                 Product Daily Sales
                              </div>
                           </div>
                        </Link>

                        <Link to=''>
                           <div className='border-y border-x border-pink-500 hover:border-pink-600 text-pink-500 hover:text-pink-600 cursor-pointer transition flex flex-col items-center justify-center gap-3 py-8'> 
                              <MdCalendarMonth className='text-[5rem]' />
                              <div className='text-md font-semibold p-2 mx-auto text-center'>
                                Product Monthly Sales
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

export default UserSalesPage