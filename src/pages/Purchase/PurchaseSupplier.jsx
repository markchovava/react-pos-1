import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import PosLeftContent from '../../components/PosLeftContent'
import CurrentUser from '../../components/CurrentUser'
import LogoutBtn from '../../components/LogoutBtn'
import { MainContextState } from '../../contexts/MainContextProvider'
import AxiosClient from '../../axios/axiosClient'
import { AiFillEye } from 'react-icons/ai';


function PurchaseSupplier() {
   const baseURL = 'supplier/'
   const {getToken, userState, userDispatch, authUser} = MainContextState()
   const [supplier, setSupplier] = useState({})
   const navigate = useNavigate();
   const token = getToken();
   useEffect(()=>{
      if(!token){
         return navigate('/login');
      }
   },[token])

     /* ACCESS CONTROL */
     const access_Level = parseInt(authUser?.access_level)
     useEffect(() => {
        if(access_Level >= 3){
          return navigate('/pos', 
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

   const searchRef = useRef(null)
   const [searchName, setSearchName] = useState('')
   const [isSubmit, setIsSubmit] = useState(false)

    /* PAGINATION */
  const [nextURL, setNextURL] = useState()
  const [prevURL, setPrevURL] = useState()

  async function paginationHandler(url) {
     try{
        const result = await axios.get(url)
        .then((response) => {
            setSupplier(() => response.data.results)
            setPrevURL(() => response.data.previous)
            setNextURL(() => response.data.next)
        })
     } catch (error) {
        console.error(`Error: ${error}`)
     }     
  }
  /* END OF PAGINATION LOGIC */

  /* FETCH ALL USERS */
  useEffect(() => {    
   async function fetchSupplier() {
      try{
         const result = await AxiosClient.get(baseURL)
         .then((response) => {
            setSupplier(() => response.data.results)
            //console.log(response.data.results)
            setPrevURL(() => response.data.previous)
            setNextURL(() => response.data.next)
          })
      } catch (error) {
         console.error(`Error: ${error}`)
      }   
   }
   fetchSupplier()
  }, []);


 const handleSearch = async () => {
   console.log(searchName)
   const result = await AxiosClient.get(`supplier/?search=${searchName}`)
     .then((response) => {
        setSupplier(() => response.data.results)
        setPrevURL(() => response.data.previous)
        setNextURL(() => response.data.next)
        setIsSubmit(false)
     })   
 }
 useEffect( () => {
   if( isSubmit == true){ 
     handleSearch()  
   }
 }, [isSubmit]);


 console.log(supplier)


  return (
   <section className='bg-slate-100 h-auto w-full overflow-hidden'>
   <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
      <PosLeftContent />
      <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
         <section className='w-[89vw] h-[32vh] fixed border-b border-black '>
            {/* Page Title and Username */}
            <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg pr-[0.5rem]'>
               <div className='w-[96%] flex justify-between items-center'>
                  <CurrentUser />
                  <LogoutBtn />
               </div>
            </div>
            {/* Search and Add */}
            <div className='w-full h-[15vh] flex items-end justify-center shadow-lg'>
            <div className='w-[100%] bg-white pt-4 pb-2 flex justify-center items-center pr-[0.5rem]'>
               <div className='w-[96%] flex justify-between items-center'>
                  <div className='w-[40%]'>
                     <form className='w-[100%]' onSubmit={(e) => {
                        e.preventDefault()
                        setIsSubmit(true)
                        }}>
                        <input type='text' 
                        name='search'
                        ref={searchRef}
                        onChange={(e) => {
                           console.log(e.target.value)
                           setSearchName(e.target.value)
                           }}
                        placeholder='Search By Name...' 
                        className='w-full rounded-md px-3 py-2 text-slate-500 border border-slate-300 outline-none'/>
                     </form>
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
                  <div className='w-[80%] border-r border-slate-300 font-semibold px-3'>NAME </div>
                  <div className='w-[10%] border-r border-slate-300 font-semibold px-3'>DAILY</div>
                  <div className='w-[10%] border-r border-slate-300 font-semibold px-3'>MONTHLY</div>
               </div>
            </div>
         </section>
         <section className='w-[89vw] h-[68vh] top-[32vh] text-black fixed overflow-y-auto scroll__width pb-8'>
            {/* ListStockTable */}
            <div className='w-full bg-white flex flex-col items-center justify-center text-md'>
               {/* Table Row */}
               {!supplier != {} && supplier.map((item) => (
                  <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                     <div className='w-[80%] border-r border-slate-300 font-semibold px-3'>
                        {item.name}
                    </div>
                     <div className='w-[10%] border-r border-slate-300 font-semibold px-3'>
                        <Link to={`/purchase/supplier/daily/${item.id}`}>
                           <AiFillEye className='text-xl transition text-slate-800 hover:text-blue-600 hover:scale-110'/>
                        </Link>
                     </div>
                     <div className='w-[10%] border-r border-slate-300 font-semibold px-3'>
                        <Link to={`/purchase/supplier/monthly/${item.id}`}>
                           <AiFillEye className='text-xl transition text-slate-800 hover:text-blue-600 hover:scale-110'/>
                        </Link>
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

export default PurchaseSupplier