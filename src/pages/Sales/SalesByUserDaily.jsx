import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiFillEye, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import PosLeftContent from '../../components/PosLeftContent'
import { MainContextState } from '../../contexts/MainContextProvider'
import LogoutBtn from '../../components/LogoutBtn'
import CurrentUser from '../../components/CurrentUser'
import AxiosClient from '../../axios/axiosClient'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SalesByUserDaily() {
   const { id } = useParams();
   const baseURL = `sales/daily/byuser/?user_id=${id}`;
   const [sales, setSales] = useState({})
   const [user, setUser] = useState({})
   const {getToken, authUser} = MainContextState();
   const navigate = useNavigate();
   const token = getToken();
   useEffect(() => {
      if(!token){
        return navigate('/login');
      }
    },[token])
    /* ACCESS CONTROL */
   const accessLevel = parseInt(authUser?.access_level)
   useEffect(() => {
     if(accessLevel >= 3){
       return navigate('/sales', 
          toast.success('You are not allowed.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
     }
   }, [])
  
   /* PAGINATION */
   const [nextURL, setNextURL] = useState()
   const [prevURL, setPrevURL] = useState()
   async function paginationHandler(url) {
      try{
         const result = await axios.get(url)
         .then((response) => {
            console.log(response.data)
            console.log('Prev: ' + response.data.previous)
            console.log('Next: ' + response.data.next)
            setSales(response.data)
            setPrevURL(response.data.previous)
            setNextURL(response.data.next)
         })
      } catch (error) {
         console.error(`Error: ${error}`)
      }     
   }
   /* END OF PAGINATION LOGIC */

   async function fetchSales() {
      try{
         const result = await AxiosClient.get(baseURL)
         .then((response) => {
               console.log(response.data)
               console.log('Prev: ' + response.data.previous)
               console.log('Next: ' + response.data.next)
               setSales(response.data)
               setPrevURL(response.data.previous)
               setNextURL(response.data.next)
            })
         } catch (error) {
         console.error(`Error: ${error}`)
         }     
   }

   async function getUser() {
      try{
         const result = await AxiosClient.get(`users/${id}/`)
         .then((response) => {
               console.log(response.data)
               setUser(response.data)
            })
         } catch (error) {
         console.error(`Error: ${error}`)
         }     
   }

   /* GET SALES */
   useEffect(() => { 
      getUser()
      fetchSales()
   }, []);


   return (
   <section className='bg-slate-100 h-auto w-full overflow-hidden'>
       <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
          {/* LEFT */}
          <PosLeftContent />
          {/* RIGHT */}
          <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
             {/* RIGHT TOP */}
             <section className='w-[89vw] h-[32vh] fixed border-b border-black '>
                {/* Page Title and Username */}
                <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg pr-[0.5rem]'>
                   <div className='w-[96%] flex justify-between items-center'>
                      <div className=''>
                        <h1 className='font-bold text-xl'> 
                           Daily User Sales Page for: 
                           <span className='text-blue-800'> {`${user.first_name} ${user.last_name}`}</span> 
                        </h1>
                      </div>
                      <div className='flex gap-2 items-center'>
                         <CurrentUser />
                         <LogoutBtn />
                      </div>
                   </div>
                </div>
                {/* Search and Add */}
                <div className='w-full h-[15vh] flex items-end justify-center shadow-lg'>
                <div className='w-[100%] bg-white pt-4 pb-2 flex justify-center items-center pr-[0.5rem]'>
                   <div className='w-[96%] flex justify-between items-center'>
                      <div className='w-[40%]'>
                        {/* 
                           <input type='text' placeholder='Search by Day...' 
                           className='w-full rounded-md px-3 py-2 text-slate-500 border border-slate-300 outline-none'/> 
                        */}
                      </div>
                      <div className='flex items-center justify-between gap-4'>
                         <div className='flex items-center justify-between'>
                            {prevURL &&
                               <div className='py-2 px-2 transition-all hover:scale-110 cursor-pointer hover:text-blue-600'>
                                  <button id={prevURL} onClick={() => paginationHandler(prevURL)} className='flex gap-2 items-center'>
                                     <AiOutlineArrowLeft /> Previous
                                  </button>
                               </div>
                            }
                            {nextURL &&
                               <div className='py-2 px-2 transition-all hover:scale-110 cursor-pointer hover:text-blue-600'>
                                  <button id={nextURL} onClick={() => paginationHandler(nextURL)} className='flex gap-2 items-center'>
                                     Next <AiOutlineArrowRight />
                                  </button>
                               </div>
                            }
                         </div>
                      </div>
                   </div>
                </div>
                </div>
                {/* ListStockTableTitle */}
                <div className='w-full h-[7vh] bg-white flex items-end justify-center pr-[0.5rem]'>
                   {/* Table Row */}
                   <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                      <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>DAY </div>
                      <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>QUANTITY </div>
                      <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>TOTAL PRICE </div>
                      <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>CURRENCY </div>
                   </div>
                </div>
             </section>
             {/* RIGHT TABLE LIST */}
             <section className='w-[89vw] h-[68vh] top-[32vh] text-black fixed overflow-y-auto scroll__width pb-8'>
               {/* ListStockTable */}
               <div className='w-full bg-white flex flex-col items-center justify-center text-md'>
                  {/* Table Row */}  
                  { sales?.results &&
                     sales?.results.map((item, i) => (
                     <div key={i} className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                        <div className='w-[25%] border-r border-slate-300 px-3'>
                           { item.created_at.slice(0, 10) }
                        </div>
                        <div className='w-[25%] border-r border-slate-300 px-3'>
                           {item.quantity_total} 
                        </div>
                        <div className='w-[25%] border-r border-slate-300 px-3'>
                           ${(item.grandtotal / 100).toFixed(2)}
                        </div>
                        <div className='w-[25%] border-r border-slate-300 px-3'>
                           { item.currency } 
                        </div>                  
                  </div>   
                  ))}     
               </div>          
 
             </section>
          </section>
       </div>
   </section>
 )
}

export default SalesByUserDaily