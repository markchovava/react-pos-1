import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiFillEdit, AiFillEye, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import PosLeftContent from '../../components/PosLeftContent'


function ListStock() {
   const baseURL = 'http://127.0.0.1:8000/product/'
   const [products, setProducts] = useState({})
   const [isSearch, setIsSearch] = useState(false)
   const searchRef = useRef(null)
   const [searchName, setSearchName] = useState('')
   
   /* PAGINATION */
   const [nextURL, setNextURL] = useState()
   const [prevURL, setPrevURL] = useState()
   async function paginationHandler(url) {
      try{
         const result = await axios.get(url)
         .then((response) => {
            setProducts(response.data)
            setPrevURL(response.data.previous)
            setNextURL(response.data.next)
         })
      } catch (error) {
         console.error(`Error: ${error}`)
      }     
   }
   /* END OF PAGINATION LOGIC */

   /* FETCH ALL PRODUCTS */
   useEffect(() => { 
      async function fetchProducts() {
         try{
            const result = await axios.get(baseURL)
            .then((response) => {
               setProducts(response.data)
               setPrevURL(response.data.previous)
               setNextURL(response.data.next) 
            })
         } catch (error) {
            console.error(`Error: ${error}`)
         }   
      }    
      fetchProducts()
   }, []);


   const handleSearch = async () => {
      console.log(searchName)
      const result = await axios.get(`http://127.0.0.1:8000/product/?search=${searchName}`)
        .then((response) => {
          /* productDispatch({
            type: 'FETCH_PRODUCT',
            payload: response.data.results,
          })  */
          setProducts(response.data) 
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
                        <h1 className='font-bold text-xl'> Product Stock Page </h1>
                     </div>
                     <div className=''>
                           <h2 className='font-semibold text-xl'>User: </h2>
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
                          placeholder='Search Product...' 
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
                     <div className='w-[30%] border-r border-slate-300 font-semibold px-3'> PRODUCT NAME </div>
                     <div className='w-[20%] border-r border-slate-300 font-semibold px-3'> STOCK </div>
                     <div className='w-[20%] border-r border-slate-300 font-semibold px-3'> STOCK PRICE </div>
                     <div className='w-[20%] border-r border-slate-300 font-semibold px-3'> AUTHOR </div>
                     <div className='w-[10%] font-semibold px-3'> ACTIONS </div>
                  </div>
               </div>
            </section>
            <section className='w-[89vw] h-[68vh] top-[32vh] text-black fixed overflow-y-auto scroll__width pb-8'>
               {/* ListStockTable */}
               <div className='w-full bg-white flex flex-col items-center justify-center text-md'>
                  {/* Table Row */}
                  { products.results && 
                     products.results.map((item, i) => (
                     <div key={i} className='w-[96%] border border-slate-300 bg-white py-2 flex justify-center items-center'>
                        <div className='w-[30%] border-r border-slate-300 px-3'> 
                           {item.name}
                        </div>
                        <div className='w-[20%] border-r border-slate-300 px-3'>
                           {item.quantity}
                        </div>
                        <div className='w-[20%] border-r border-slate-300 px-3'>
                           ${((item.unit_price / 100) * item.quantity).toFixed(2)}
                        </div>
                        <div className='w-[20%] border-r border-slate-300 px-3'>Username</div>
                        <div className='w-[10%] border-r border-slate-300 font-semibold px-3'>
                           <div className='flex justify-center items-center gap-2'>
                              <Link to={`/stock/edit/${item.id}`}>
                                 <AiFillEdit className='text-xl transition text-slate-500 hover:text-green-600 hover:scale-110'/> 
                              </Link>
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

export default ListStock