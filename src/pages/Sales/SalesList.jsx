import { useEffect, useState, useRef } from 'react'
import PosLeftContent from '../../components/PosLeftContent'
import { AiFillEye, AiFillDelete, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MainContextState } from '../../contexts/MainContextProvider'
import LogoutBtn from '../../components/LogoutBtn'
import CurrentUser from '../../components/CurrentUser'
import AxiosClient from '../../axios/axiosClient'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SalesList() {
   const baseURL = 'sales/'
   const {getToken, authUser} = MainContextState()
   const navigate = useNavigate();
   const token = getToken();
   useEffect(()=>{
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
 
   const searchRef = useRef(null)
   const [sales, setSales] = useState({});
   const [searchName, setSearchName] = useState('')
   const [isSubmit, setIsSubmit] = useState(false)
   const [isDelete, setIsDelete] = useState(false)
   const [deleteId, setDeleteId] = useState(null)
 
   /* PAGINATION */
   const [nextURL, setNextURL] = useState()
   const [prevURL, setPrevURL] = useState()
 
   async function paginationHandler(url) {
      try{
         const result = await axios.get(url)
         .then((response) => {
            setSales(response.data)
            setPrevURL(response.data.previous)
            setNextURL(response.data.next)
         })
      } catch (error) {
         console.error(`Error: ${error}`)
      }     
   }
   /* END OF PAGINATION LOGIC */
 
   /* FETCH ALL SALES */
   async function fetchSales() {
      try{
         const result = await AxiosClient.get(baseURL)
         .then((response) => {
               setSales(response.data)  
               setPrevURL(response.data.previous)
               setNextURL(response.data.next)
          })
      } catch (error) {
         console.error(`Error: ${error}`)
      }   
    } 
   useEffect(() => {    
      
      fetchSales()
   }, []);
    
   const handleDelete = async () => {
     let a = confirm(`Are you sure?`)
     if( a ){
       const result = await AxiosClient.delete(`sales/${deleteId}`)
       .then((response) => {
         console.log(response.data)
         fetchSales()
       })
       alert('Deleted successful...')   
     }
   }
   useEffect( () => {
     if(isDelete == true){
       handleDelete()
       setIsDelete(false)
       setDeleteId(null) 
     }
   }, [deleteId])
 
   const handleSearch = async () => {
     console.log(searchName)
     const result = await AxiosClient.get(`sales/?search=${searchName}`)
       .then((response) => {
         setSales(response.data)
         setPrevURL(response.data.previous)
         setNextURL(response.data.next)
         setIsSubmit(false)
       })   
   }
   useEffect( () => {
     if( isSubmit == true){ 
       handleSearch()  
     }
   }, [isSubmit]);
 
 
   console.log(sales)

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
                          <h1 className='font-bold text-xl'> All Sales Page </h1>
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
                       <div className='w-[100%]'>
                           <form className='w-[40%]' onSubmit={(e) => {
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
                              placeholder='Search Ref No...' 
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
                       <div className='w-[16%] border-r border-slate-300 font-semibold px-3'>REF NO </div>
                       <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>USER </div>
                       <div className='w-[16%] border-r border-slate-300 font-semibold px-3'>GRANDTOTAL </div>
                       <div className='w-[16%] border-r border-slate-300 font-semibold px-3'>CURRENCY </div>
                       <div className='w-[16%] border-r border-slate-300 font-semibold px-3'>CREATED AT </div>
                       <div className='w-[16%] border-r border-slate-300 font-semibold px-3'>ACTION</div>
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
                          <div className='w-[16%] border-r border-slate-300 px-3'>
                              {item?.ref_no}
                          </div>
                          <div className='w-[20%] border-r border-slate-300 px-3'> {`${item.user ? item.user?.first_name : '' } ${item.user ? item.user?.last_name : ''}`} </div>
                          <div className='w-[16%] border-r border-slate-300 px-3'>${(item.grandtotal / 100).toFixed(2)} </div>
                          <div className='w-[16%] border-r border-slate-300 px-3'> {item.currency}</div>
                          <div className='w-[16%] border-r border-slate-300 px-3'>
                            {item.created_at}
                          </div>
                          <div className='w-[16%] border-r border-slate-300 px-3'> 
                          <div className='flex items-center gap-2'>
                            <Link to={`/sales/view/${item.id}`}>
                              <AiFillEye className='text-xl transition text-slate-800 hover:text-blue-600 hover:scale-110'/>
                            </Link>
                            <button 
                              onClick={() => {
                                 setIsDelete(true)
                                 setDeleteId(item.id) 
                              }}>
                              <AiFillDelete className='text-xl transition text-slate-800 hover:text-red-600 hover:scale-110'/>
                            </button>
                          </div>
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

export default SalesList