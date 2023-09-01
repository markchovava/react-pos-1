import React, { useRef, useState, useEffect } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { AiFillDelete } from 'react-icons/ai'
import PosLeftContent from '../../components/PosLeftContent'
import { MainContextState } from '../../contexts/MainContextProvider'
import AxiosClient from '../../axios/axiosClient'
import { Link, useNavigate } from 'react-router-dom'
import  { useReactToPrint } from 'react-to-print';
import { ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutBtn from '../../components/LogoutBtn'
import CurrentUser from '../../components/CurrentUser'
import Loading from '../../components/Loading'





function PriceAdd() {
  const [loading, setLoading] = useState(false)
  const { getToken, priceState, priceDispatch } = MainContextState()
  const navigate = useNavigate();
  const token = getToken();
  useEffect(()=>{
    if(!token){
      return navigate('/login');
    }
  },[token])


 
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef()
  const scanRef = useRef()

  const [inputData, setInputData] = useState(0);
  const [scanInput, setScanInput] = useState()
  const [isSubmit, setIsSubmit] = useState(false)
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`
  };
  


  /* --------------------- */
 




  const setInputUnique = (itemId, value) => {
    const newList = priceState.products.map((item) => {
      if (item.id === itemId) {
        item.value = value;
      }
      return item;
    });
    setInputData(newList)
  };

  /* CHANGING MODE */
  const handleMode = (mode) => {
    priceDispatch({type: 'CHANGE_MODE', payload: mode})
  }
 
  /* SEARCH PRODUCT USING NAME */
  const getProductBySearch = async (search) => {
    if(search){
      try{
        const result = await AxiosClient.get(`product/?search=${search}`)
          .then((response) => {
            setSearchResults( () => response.data.results )
          })
      } catch (error){
        console.error(`Error: ${error}`)
        console.error(`Error: ${error.response}`)
      }
    }else if(!search){
      setSearchResults([])
    } 
  }
  
  /* SEARCH PRODUCT USING BARCODE */
  const getProductByBarcode = async (search) => {
    console.log(search)
    if(search){
      try{
        const result = await AxiosClient.get(`product/?search=${search}`)
          .then((response) => {
            //console.log(response.data.results)
            const result = response.data.results[0]
            if(response.data.results[0]){
                priceDispatch({
                    type: 'ADD_PRODUCT', 
                    payload: {
                      id: result.id,
                      product_id: result.id,
                      product_name: result.name,
                      quantity: result.quantity,
                      currency: 'USD',
                      unit_price: result.unit_price,
                      total_price: result.unit_price,
                      barcode: result.barcode
                    }
                })
              scanRef.current.value = '' 
              setScanInput('')
            }else{
              alert('Not found.')
              scanRef.current.value = ''
            }
          })
      } catch (error){
        console.error(`Error: ${error}`)
        console.error(`Error: ${error.response}`)
      }
    }else if(!search){
      alert('The input is empty...')
    } 
  }


   
  return (
    <>
        <section className='bg-slate-100 h-auto w-full overflow-hidden'>
            <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
              <PosLeftContent />
              {/* PosMainContent */}
              <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
                  {/* PosMainContentTop */}
                  <section className='fixed z-10 w-[90vw] h-[37vh] border-b border-black '>
                    {/* PosMainContentHeader */}
                    <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg'>
                        <div className='w-[96%] flex justify-between items-center'>
                            <div className=''>
                              <h1 className='font-bold text-xl'>PRICE PAGE </h1>
                            </div>
                       
                            {/* ---------------------------------------- */}
                            <div className='flex justify-end gap-4'>
                                {/*  */}
                                <select 
                                  name='mode'
                                  onChange={(e) => handleMode(e.target.value)}
                                  className='text-lg border-none outline-none'>
                                    {/*  */}
                                    {priceState.mode == 'SearchByBarcode' ?
                                        <option value='SearchByBarcode' selected="selected"> 
                                            Scan Mode </option>
                                    :
                                        <option value='SearchByBarcode'> 
                                            Scan Mode </option>
                                     }
                                     {/* s */}
                                    { priceState.mode == 'SearchByName' ?
                                        <option value='SearchByName' selected="selected"> 
                                            Search Mode </option>
                                    : 
                                        <option value='SearchByName'> 
                                            Search Mode </option>
                                    }
                                    
                                </select>
                                
                                <h2 className='font-semibold text-xl'>
                                    <CurrentUser />
                                </h2>
                                <LogoutBtn />
                            </div>

                        </div>
                    </div>
                    {/* PosMainContentSearch */}
                    <div className='w-full h-[20vh] flex justify-start items-center'>
                        {/*  */}
                        <section className='m-0 p-0 w-[80%] flex justify-start items-center'>
                            {/* SEARCHBYNAME */}
                            { priceState.mode == 'SearchByName' && (
                                <form onSubmit={(e) => e.preventDefault()} className='h-[12vh] w-full flex justify-center'>
                                <div className='relative bg-white w-[96%] shadow-lg flex flex-col justify-center items-center'>
                                    <input type='text' 
                                    name='searchname'
                                    ref={searchRef}
                                    onChange={(e) => getProductBySearch(e.target.value)} 
                                    placeholder='Search by name...'
                                    autoFocus={priceState.mode == 'SearchByName' && true}
                                    className='shadow appearance-none border rounded w-[94%] text-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                                    <div className={`${searchResults.length == 0 ? 'hidden' : 'absolute top-[110%] w-[100%] z-20 bg-slate-50 shadow-md'} `}>
                                    { searchResults.length > 0 &&
                                        searchResults.map((item, i) => (
                                        <div className='w-[94%] z-20 mx-auto py-3 px-2 my-1 cursor-pointer hover:bg-slate-100 hover:text-black text-slate-800' 
                                            key={i}
                                            onClick={() => {
                                            priceDispatch({
                                                type: 'ADD_PRODUCT', 
                                                payload: {
                                                id: item.id,
                                                product_id: item.id,
                                                product_name: item.name,
                                                quantity: item.quantity,
                                                currency: 'USD',
                                                unit_price: item.unit_price,
                                                total_price: item.unit_price,
                                                barcode: item.barcode
                                                }
                                            })
                                            searchRef.current.value = ''
                                            setSearchResults([])  
                                            }}>
                                            {item.name}
                                        </div>
                                    ))}
                                    </div>
                                </div>   
                                </form>
                            )}
                            {/* SEARCHBYBARCODE */}
                            { priceState.mode == 'SearchByBarcode' && (
                                <form className='h-[12vh] w-full flex justify-center' 
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    getProductByBarcode(scanInput)
                                    }}>
                                <div className='bg-white w-[96%] shadow-lg flex justify-center items-center'>
                                    <input type='number' 
                                    name='scanmode'
                                    value={scanInput}
                                    onChange={(e) => setScanInput(e.target.value)} 
                                    autoFocus={priceState.mode == 'SearchByBarcode' && true}
                                    ref={scanRef}
                                    placeholder='Search by Code...'
                                    className='shadow appearance-none border rounded w-[94%] text-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                                </div>   
                                </form>
                            )}
                        </section>
                        {/*  */}
                        <section className='w-[20%] h-[12vh]  flex items-center justify-center pr-8'>
                            <button className='w-full h-[100%] border border-white text-lg text-white transition bg-green-500 hover:bg-green-600 rounded-lg '>
                                Submit</button>
                        </section>

                      
                    </div>
                    {/* PosMainContentProductTitle */}
                    <div className='w-full h-[7vh] bg-white flex justify-center items-center shadow-lg '>
                      <div className='w-[96%] h-[100%] flex items-center justify-start text-lg mr-2'>
                          <div className='w-[30%] border-r border-slate-900 font-semibold px-3'>NAME</div>
                          <div className='w-[30%] border-r border-slate-900 font-semibold px-3'>BARCODE</div>
                          <div className='w-[30%] border-r border-slate-900 font-semibold px-3'>UNIT PRICE</div>
                          <div className='w-[10%] font-semibold px-3'> <ImCancelCircle /></div>
                      </div>
                    </div>
                  </section>
                  {/* PosMainContentBottom */}
                  <section className='w-[90vw] top-[37vh] h-[63vh] fixed z-0 overflow-y-auto scroll__width py-3'>
                    {/* PosMainContentTable */}  
                    <div className='w-full bg-white flex flex-col items-center justify-center text-md '>
                        {priceState.products && 
                            priceState.products?.map((item, i) => (
                            <div key={i} className='w-[96%] h-[100%] border-b border-slate-400 flex items-center justify-start py-2 mb-2 mr-2'>
                                <div className='w-[30%] border-r border-slate-400 px-3 py-2'>{item.product_name}</div>
                                <div className='w-[30%] border-r border-slate-400 px-3 py-2'>{item.barcode}</div>
                                <div className='w-[30%] border-r border-slate-400 px-3 py-2'>
                                    <input 
                                    type="number"
                                    value={item.unit_price}
                                    name='unit_price'
                                    onChange={(e) => {
                                      priceDispatch({
                                        type: 'SINGLE_PRODUCT_PRICE', 
                                        payload:{
                                          id: item.id, 
                                          unit_price: e.target.value, 
                                        }})
                                      setInputUnique(item.id, e.target.value)
                                      }}
                                    min={1} 
                                    className='w-[80%] border-none outline-none py-3 px-2 mr-2 outline-1 outline-slate-400'/>cents
                                </div>
                                <div className='w-[10%] font-semibold px-3'> 
                                    <AiFillDelete 
                                        onClick={() => priceDispatch({type: 'DELETE_PRODUCT', payload: {id: item.product_id }})}
                                        className='hover:text-red-500 transition text-lg' />
                                </div>
                            </div>
                        ))}
                    </div>
                  </section>
              </section>
              
            </div>
        </section>
    </>
  )
}

export default PriceAdd