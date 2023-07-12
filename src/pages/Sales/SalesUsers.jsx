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


function SalesUsers() {
   const baseURL = 'users/'
   const {getToken, userState, userDispatch, authUser} = MainContextState()
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
          return navigate('/', 
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
          userDispatch({
            type: 'FETCH_USERS',
            payload: response.data.results,
          }) 
           setPrevURL(response.data.previous)
           setNextURL(response.data.next)
        })
     } catch (error) {
        console.error(`Error: ${error}`)
     }     
  }
  /* END OF PAGINATION LOGIC */

  /* FETCH ALL USERS */
  useEffect(() => {    
   async function fetchUsers() {
      try{
         const result = await AxiosClient.get(baseURL)
         .then((response) => {
              userDispatch({
               type: 'FETCH_USERS',
               payload: response.data.results,
               })  
               setPrevURL(response.data.previous)
               setNextURL(response.data.next)
          })
      } catch (error) {
         console.error(`Error: ${error}`)
      }   
   }
   fetchUsers()
  }, []);


 const handleSearch = async () => {
   console.log(searchName)
   const result = await AxiosClient.get(`users/?search=${searchName}`)
     .then((response) => {
       userDispatch({
         type: 'FETCH_USERS',
         payload: response.data.results,
       })  
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

 console.log(userState)
 const users = userState.users;

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
                     <input type='text' placeholder='Search by User...' 
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
                  <div className='w-[50%] border-r border-slate-300 font-semibold px-3'>NAME </div>
                  <div className='w-[30%] border-r border-slate-300 font-semibold px-3'>PHONE </div>
                  <div className='w-[10%] border-r border-slate-300 font-semibold px-3'>DAILY</div>
                  <div className='w-[10%] border-r border-slate-300 font-semibold px-3'>MONTHLY</div>
               </div>
            </div>
         </section>
         <section className='w-[89vw] h-[68vh] top-[32vh] text-black fixed overflow-y-auto scroll__width pb-8'>
            {/* ListStockTable */}
            <div className='w-full bg-white flex flex-col items-center justify-center text-md'>
               {/* Table Row */}
               {users && users.map((item) => (
                  <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                     <div className='w-[50%] border-r border-slate-300 font-semibold px-3'>{item.first_name} </div>
                     <div className='w-[30%] border-r border-slate-300 font-semibold px-3'>{item.phone_number} </div>
                     <div className='w-[10%] border-r border-slate-300 font-semibold px-3'>
                        <Link to={`/sales/users/daily/${item.id}`}>
                           <AiFillEye className='text-xl transition text-slate-800 hover:text-blue-600 hover:scale-110'/>
                        </Link>
                     </div>
                     <div className='w-[10%] border-r border-slate-300 font-semibold px-3'>
                        <Link to={`/sales/users/monthly/${item.id}`}>
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

export default SalesUsers