import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import PosLeftContent from '../../components/PosLeftContent'
import { MainContextState } from '../../contexts/MainContextProvider'
import LogoutBtn from '../../components/LogoutBtn'
import CurrentUser from '../../components/CurrentUser'
import AxiosClient from '../../axios/axiosClient'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MonthPurchaseProductUSD() {
  const baseURL = 'purchase-item-monthly/usd/';
  /* CHECK AUTHENTICATION */
  const {getToken, authUser} = MainContextState()
  const [productName, setProductName] = useState('')
  const [isSearch, setIsSearch] = useState(false)
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
    if(accessLevel >= 2){
      return navigate('/stock', 
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

  
  const [purchase, setPurchase] = useState({})
  /* PAGINATION */
  const [nextURL, setNextURL] = useState()
  const [prevURL, setPrevURL] = useState()
  async function paginationHandler(url) {
     try{
        const result = await axios.get(url)
        .then((response) => {
           setPurchase(response.data)
           setPrevURL(response.data.previous)
           setNextURL(response.data.next)
        })
     } catch (error) {
        console.error(`Error: ${error}`)
     }     
  }
  /* END OF PAGINATION LOGIC */
  
  /* FETCH ALL SALES */
  useEffect(() => { 
    async function fetchPurchase() {
      try{
        const result = await AxiosClient.get(baseURL)
        .then((response) => {
          setPurchase(() => response.data)
          console.log(response.data)
          setPrevURL(() => response.data.previous)
          setNextURL(() => response.data.next)
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
    }
     fetchPurchase()
  }, []);


  /* GET SINGLE PURCHASE PRODUCT */
  async function getPurchaseProduct() {
    try{
      const result = await AxiosClient.get(`${baseURL}?search=${productName}`)
      .then((response) => {
        setPurchase(() => response.data)
        console.log(response.data)
        setPrevURL(() => response.data.previous)
        setNextURL(() => response.data.next)
        setIsSearch(false)
      })
    } catch (error) {
      console.error(`Error: ${error}`)
    }   
  }

  useEffect(() => {
      if(isSearch == true){
          getPurchaseProduct()
      }
  }, [isSearch])
  
  


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
                        <h1 className='font-bold text-lg'> 
                          <Link 
                            to='/stock'
                            className='text-blue-800 hover:text-black'>
                            Stock
                          </Link> / <span className=''>Monthly Stock Purchase Page: USD</span>
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
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            setIsSearch(true) 
                            }}>
                            <input type='text' 
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder='Search by Name...' 
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
                    <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>PRODUCT NAME </div>
                    <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>DATE </div>
                    <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>QUANTITY </div>
                    <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>TOTAL COST </div>
                    <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>CURRENCY</div>
                  </div>
              </div>
            </section>
            <section className='w-[89vw] h-[68vh] top-[32vh] text-black fixed overflow-y-auto scroll__width pb-8'>
              {/* ListStockTable */}
              <div className='w-full bg-white flex flex-col items-center justify-center text-md'>
                  {/* Table Row */}
                  { purchase?.results &&
                    purchase?.results.map((item, i) => (
                    <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                      <div className='w-[20%] border-r border-slate-300 px-3'>{item.product_name} </div>
                      <div className='w-[20%] border-r border-slate-300 px-3'>
                        {`${item.year} - ${item.month}`} 
                      </div>
                      <div className='w-[20%] border-r border-slate-300 px-3'>{item.quantity_bought ? item.quantity_bought : 0} </div>
                      <div className='w-[20%] border-r border-slate-300 px-3'>
                        ${(item.total_cost / 100).toFixed(2)} 
                      </div>
                      <div className='w-[20%] border-r border-slate-300 px-3'> {item.currency} </div>
                    </div>   
                  ))}
              </div>
              

            </section>
        </section>

      </div>
    </section>
  )
}

export default MonthPurchaseProductUSD