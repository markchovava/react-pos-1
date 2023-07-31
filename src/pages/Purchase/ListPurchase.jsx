import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillDelete, AiFillEye, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import PosLeftContent from '../../components/PosLeftContent'
import { MainContextState } from '../../contexts/MainContextProvider'
import LogoutBtn from '../../components/LogoutBtn'
import CurrentUser from '../../components/CurrentUser'
import AxiosClient from '../../axios/axiosClient'


function ListPurchase() {
   const baseURL = 'purchase/';
   /* CHECK AUTHENTICATION */
   const {getToken} = MainContextState()
   const navigate = useNavigate();
   const token = getToken();
   
   useEffect(() => {
      if(!token){
         return navigate('/login');
      }
   }, [token])

   const [purchases, setPurchases] = useState({})
   const [isSearch, setIsSearch] = useState(false)
   const searchRef = useRef(null)
   const [searchName, setSearchName] = useState('')
   const [isDelete, setIsDelete] = useState(false)
   const [deleteId, setDeleteId] = useState(null)
   
   /* PAGINATION */
   const [nextURL, setNextURL] = useState()
   const [prevURL, setPrevURL] = useState()
   async function paginationHandler(url) {
      try{
         const result = await axios.get(url)
         .then((response) => {
            setPurchases(response.data)
            setPrevURL(response.data.previous)
            setNextURL(response.data.next)
         })
      } catch (error) {
         console.error(`Error: ${error}`)
      }     
   }
   /* END OF PAGINATION LOGIC */

   /* FETCH ALL PRODUCTS */
   async function fetchPurchases() {
      try{
         const result = await AxiosClient.get(baseURL)
         .then((response) => {
            setPurchases(response.data)
            setPrevURL(response.data.previous)
            setNextURL(response.data.next) 
         })
      } catch (error) {
         console.error(`Error: ${error}`)
      }   
   }
   useEffect(() => {     
      fetchPurchases()
   }, []);


   const handleSearch = async () => {
      console.log(searchName)
      const result = await AxiosClient.get(`purchase/?search=${searchName}`)
        .then((response) => {
          setPurchases(response.data) 
          setPrevURL(response.data.previous)
          setNextURL(response.data.next)
          setIsSearch(false)
        })   
    }
    useEffect( () => {
      if( isSearch == true){ 
        handleSearch()  
      }
    }, [isSearch]);

    const handleDelete = async () => {
      let a = confirm(`Are you sure?`)
      if( a ){
        const result = await AxiosClient.delete(`purchase/${deleteId}`)
        .then((response) => {
          console.log(response.data)
          fetchPurchases()
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
   
 
   
  return (
   <section className='bg-slate-100 h-auto w-full overflow-hidden'>
      <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
         <PosLeftContent />
         <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
            <section className='w-[89vw] h-[32vh] fixed border-b border-black '>
               {/* Page Title and Username */}
               <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg'>
                  <div className='w-[96%] flex justify-between items-center'>
                     <div className=''>
                        <h1 className='font-bold text-xl'> Purchase Stock Page </h1>
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
                     <form className='w-[40%]' onSubmit={(e) => {
                        e.preventDefault()
                        setIsSearch(true)
                        }}>
                        <input type='text' 
                          name='search'
                          ref={searchRef}
                          onChange={(e) => {
                            console.log(e.target.value)
                            setSearchName(e.target.value)
                            }}
                          placeholder='Search Purchase...' 
                          className='w-full rounded-md px-3 py-2 text-slate-500 border border-slate-300 outline-none'/>
                      </form>
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
                  <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                     <div className='w-[30%] border-r border-slate-300 font-semibold px-3'> REF </div>
                     <div className='w-[20%] border-r border-slate-300 font-semibold px-3'> SUPPLIER </div>
                     <div className='w-[20%] border-r border-slate-300 font-semibold px-3'> TOTAL </div>
                     <div className='w-[20%] border-r border-slate-300 font-semibold px-3'> CREATED </div>
                     <div className='w-[10%] font-semibold px-3'> ACTIONS </div>
                  </div>
               </div>
            </section>
            <section className='w-[89vw] h-[68vh] top-[32vh] text-black fixed overflow-y-auto scroll__width pb-8'>
               {/* ListStockTable */}
               <div className='w-full bg-white flex flex-col items-center justify-center text-md'>
                  {/* Table Row */}
                  { purchases.results && 
                     purchases.results.map((item, i) => (
                     <div key={i} className='w-[96%] border border-slate-300 bg-white py-2 flex justify-center items-center'>
                        <div className='w-[30%] border-r border-slate-300 px-3'> 
                           {item.purchase_ref}
                        </div>
                        <div className='w-[20%] border-r border-slate-300 px-3'>
                           {item.supplier_name}
                        </div>
                        <div className='w-[20%] border-r border-slate-300 px-3'>
                           [{item.currency}] ${((item.purchase_total / 100)).toFixed(2)}
                        </div>
                        <div className='w-[20%] border-r border-slate-300 px-3'>
                           {item.created_at}
                        </div>
                        <div className='w-[10%] border-r border-slate-300 font-semibold px-3'>
                           <div className='flex justify-center items-center gap-2'>
                              <Link to={`/purchase/view/${item.id}`}>
                                 <AiFillEye className='text-xl transition text-slate-500 hover:text-green-600 hover:scale-110'/> 
                              </Link>
                              <button >
                                 <AiFillDelete 
                                 onClick={() => {
                                    setIsDelete(true)
                                    setDeleteId(item.id) 
                                 }}
                                 className='text-xl transition text-slate-800 hover:text-red-600 hover:scale-110'/>
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

export default ListPurchase