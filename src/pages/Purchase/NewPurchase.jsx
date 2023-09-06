import React, { useRef, useState, useEffect } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { AiFillDelete } from 'react-icons/ai'
import PosLeftContent from '../../components/PosLeftContent'
import { MainContextState } from '../../contexts/MainContextProvider'
import AxiosClient from '../../axios/axiosClient'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutBtn from '../../components/LogoutBtn'
import CurrentUser from '../../components/CurrentUser'
import Loading from '../../components/Loading'
import RandomNumber from '../../__utils/RandomNumber'



function NewPurchase() {
    const productURL = 'product/';
    const [loading, setLoading] = useState(false)
    const {getToken, productState, productDispatch, zwlRate, 
      setZwlRate, currencyState, currencyDispatch, paymentState, 
      paymentDispatch, authUser, stockState, stockDispatch} = MainContextState()
    const user_id = authUser?.id;
    const [scanInput, setScanInput] = useState()
    const [isProductSearch, setIsProductSearch] = useState(false)
    const [productSearch, setProductSearch] = useState('')
    const [productSearchResults, setProductSearchResults] = useState([])
    const searchProductRef = useRef()
    const currencyRef = useRef()
    const [searchResults, setSearchResults] = useState([])
    const searchRef = useRef()
    const scanRef = useRef()
    const navigate = useNavigate();
    const token = getToken();
    /*  */
    useEffect(()=>{
      if(!token){
        return navigate('/');
      }
    },[token])

    
    /* SUPPLIER */
    const [isSupplierSearch, setIsSupplierSearch] = useState(false)
    const [supplierSearch, setSupplierSearch] = useState('')
    const [supplierSearchResults, setSupplierSearchResults] = useState([])
    const searchSupplierRef = useRef()
    /*  */
    const quantityRef = useRef()
    const [inputData, setInputData] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false)
    const [amountPaid, setAmountPaid] = useState(0)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    };
    
   
    /* --------------------- */
    /* GET SITE INFO */
    const [appInfo, setAppInfo] = useState({})
     async function getAppInfo() {
      try{
         const result = await AxiosClient.get('app-info/', {headers})
         .then((response) => {
              setAppInfo(() => response.data[0]) 
          })
      } catch (error) {
         console.error(`Error: ${error}`)
         console.error(`Error: ${error.response}`)
      }   
    }
    /* GET ZWL RATE */
    async function getZwlRate() {
      try{
         const result = await AxiosClient.get('currency/1/', {headers})
         .then((response) => {
            setZwlRate(response.data.rate)  
         })
      } catch (error) {
         console.error(`Error: ${error}`)
      }   
   }
    /* SIDE EFFECTS */
    useEffect(() => { 
      getZwlRate()
      /*  */
      getAppInfo()
      //getLatest()
      /*  */
      setLoading(true)
    }, []);
  
  
    const setInputUnique = (itemId, value) => {
      const newList = stockState.products.map((item) => {
        if (item.id === itemId) {
          item.value = value;
        }
        return item;
      });
      setInputData(newList)
    };
    /* --------------------- CHANGE CURRENCY --------------------- */
    const handleCurrency = (currency) => {
      let rate;
      if(currency == 'ZWL'){
        rate = zwlRate
      } else if(currency == 'USD'){
        rate = 1
      }
      currencyDispatch({type: 'CHANGE_CURRENCY', payload: {name: currency , rate: rate}})
     
    }

   /* SEARCH PRODUCT USING NAME */
  const getProductBySearch = async (search) => {
    if(search){
      try{
        const result = await AxiosClient.get(`${productURL}?search=${search}`)
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

    useEffect( () => {
      if( isProductSearch == true ){ 
        getProductBySearch()  
      }
    }, [isProductSearch]);
    /* ------------------------------------------ */

    /* SEARCH PRODUCT USING BARCODE */
  const getProductByBarcode = async (search) => {
    if(search){
      try{
        const result = await AxiosClient.get(`${productURL}?search=${search}`)
          .then((response) => {
            const result = response.data.results[0]
            if(response.data.results[0]){
                stockDispatch({
                    type: 'ADD_PRODUCT', 
                    payload: {
                      id: result.id,
                      product_id: result.id,
                      product_name: result.name,
                      product_stock: result.quantity + 1,
                      quantity: result.quantity,
                      quantity_bought: 1,
                      unit_cost: 0,
                      total_cost: 0,
                     }
                })
                console.log(stockState.products)
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

     /* HANDLE PRODUCT SEARCH USING NAME --------------------- */
   const handleSupplierSearch = (input) => {
    console.log(input)
    setSupplierSearch(input)
    setIsSupplierSearch(() => true)
  }
  const getSupplierBySearch = async () => {
    try{
      const result = await AxiosClient.get(`supplier/?search=${supplierSearch}`)
        .then((response) => {
          setSupplierSearchResults( () => response.data.results )
          console.log('supplierSearchResults')
          console.log(supplierSearchResults)
          setIsSupplierSearch(() => false)
        })
    } catch (error){
      console.error(`Error: ${error}`)
      console.error(`Error: ${error.response}`)
    }
       
  }
  useEffect( () => {
    if( isSupplierSearch == true ){ 
      getSupplierBySearch()  
    }
  }, [isSupplierSearch]);
  /* ------------------------------------------ */

    /* GRANDTOTAL */
    const calculateGrandTotal = () => {
      const calculateGrandTotal = stockState.products.reduce((acc, item) => acc + item.total_cost, 0);
      let grandtotal;
      if(currencyState.currency.name == 'ZWL'){
        grandtotal = (currencyState.currency.rate / 100) * calculateGrandTotal
      } else{
        grandtotal = calculateGrandTotal
      }
      return grandtotal;
    };
    /* GRANDQUANTITY */
    const calculateQuantity = () => {
      const quantity = stockState.products.reduce((acc, item) => acc + item.quantity_bought, 0);
      return quantity;
    };   
    /* OWING */
    const calculateOwing = () => {
      const owing = calculateGrandTotal() - (amountPaid * 100);
      return owing;
    }
    /* CHANGE */
    const calculateChange = () => {
      const change = (amountPaid * 100) - calculateGrandTotal();
      return change;
    }
    /* PROCESS TRANSACTIONS */
    const processPos =  async () => {
      let allItems = stockState.products;
      console.log(allItems)
      let items;
      if(allItems && allItems.length > 1) {
        items = stockState.products.map((item) => ({
          product_id: parseInt(item.id),
          product_name: item.product_name,
          currency: currencyRef.current.value,
          quantity_bought: parseInt(item.quantity_bought),
          unit_cost: currencyRef.current.value == 'ZWL' 
                      ? (parseInt(item.unit_cost) * parseInt(currencyState.currency.rate)) / 100
                      : parseInt(item.unit_cost),
          total_cost: currencyRef.current.value == 'ZWL' 
                      ? (parseInt(item.total_cost) * parseInt(currencyState.currency.rate)) / 100
                      : parseInt(item.total_cost),
          user_id: parseInt(user_id),
        }))  
      } else if(!allItems == []) {
        items = [{
          product_id: parseInt(allItems[0].id),
          product_name: allItems[0].product_name,
          currency: currencyRef.current.value,
          quantity_bought:  parseInt(allItems[0].quantity_bought),
          unit_cost: currencyRef.current.value == 'ZWL' 
                      ? (parseInt(allItems[0].unit_cost) * parseInt(currencyState.currency.rate)) / 100
                      : parseInt(allItems[0].unit_cost),
          total_cost: currencyRef.current.value == 'ZWL' 
                      ? (parseInt(allItems[0].total_cost) * parseInt(currencyState.currency.rate)) / 100
                      : parseInt(allItems[0].total_cost),
          user_id: parseInt(user_id)
        }]
      } else{
        alert('Please add products to the Purchase.')
        return null
      }
      const purchase_items = items;
      const purchase = {
        user_id: parseInt(user_id),
        purchase_ref: 'PU' + RandomNumber(),
        supplier_id: stockState.supplier.supplier_id,
        supplier_ref: stockState.supplier.supplier_ref,
        supplier_name: stockState.supplier.supplier_name,
        quantity_total: parseInt(calculateQuantity()),
        purchase_total: parseInt(calculateGrandTotal()),
        amount_paid: parseInt(amountPaid * 100),
        change: parseInt(calculateChange()),
        owing: calculateOwing() < 1 ? null : parseInt(calculateOwing()),
        currency: currencyRef.current.value,
        payment_method: paymentState.method,
        purchase_items: purchase_items
      }
      if( paymentState.method ) {
        if(currencyRef.current.value != ''){
          if(!purchase.supplier_id == ''){
            console.log(purchase)
            const result = await AxiosClient.post('purchase/', purchase)
            .then((response) => {
              try{
                stockDispatch({type: 'REMOVE_PRODUCT'})
                stockDispatch({type: 'REMOVE_SUPPLIER'})
                alert('Processing was successful.')
              } catch(error){
                console.error(`Error: ${error}`)
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            }) 
          } else{
            alert('Please add Supplier...')
          }
        } else{
          confirm('Please Select Currency.')
        }
        
      } else {
        confirm('Select Payment Method')
      }
    }
   
 

  return (
    <>
      { loading == false ?
        <Loading />
        :
        <section className='bg-slate-100 h-auto w-full overflow-hidden'>
            <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
              <PosLeftContent />
              {/* PosMainContent */}
              <section className='w-[65vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
                  {/* PosMainContentTop */}
                  <section className='fixed z-10 w-[65vw] h-[37vh] border-b border-black '>
                    {/* PosMainContentHeader */}
                    <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg'>
                        <div className='w-[96%] flex justify-between items-center'>
                            <div className=''>
                              <h1 className='font-bold text-lg'> 
                                <Link 
                                    to='/stock'
                                    className='text-blue-800 hover:text-black'>
                                    Stock
                                </Link> / <span className=''>New Stock </span>
                              </h1>
                            </div>
                            <div className=''>
                                <h2 className='font-semibold text-lg'>
                                  <CurrentUser />
                                </h2>
                            </div>
                            <div className='text-lg font-semibold'>
                              Rate:
                              <span className='ml-2 text-blue-800'>
                              1 : {(zwlRate / 100).toFixed(2)}</span>
                            </div>
                            <div className='flex items-center justify-between gap-3'>
                                
                                {/*  */}
                                <select 
                                  name='mode'
                                  onChange={(e) => stockDispatch({type: 'CHANGE_MODE', payload: e.target.value})}
                                  className='text-lg border-none outline-none'>
                                    {/*  */}
                                    {stockDispatch.mode == 'SearchByBarcode' ?
                                        <option value='SearchByBarcode' selected="selected"> 
                                            Scan Mode </option>
                                    :
                                        <option value='SearchByBarcode'> 
                                            Scan Mode </option>
                                     }
                                     {/* s */}
                                    { stockDispatch.mode == 'SearchByName' ?
                                        <option value='SearchByName' selected="selected"> 
                                            Search Mode </option>
                                    : 
                                        <option value='SearchByName'> 
                                            Search Mode </option>
                                    }
                                    
                                </select>
                                
                                <select 
                                name='currency'
                                ref={currencyRef}
                                  onChange={(e) => handleCurrency(e.target.value)}
                                  className='text-lg border-none outline-none'>
                                    <option value=''>Currency</option>
                                    <option value='USD'>USD</option>
                                    <option value='ZWL'>ZWL</option>
                                </select>
                                
                            </div>
                            <LogoutBtn />
                        </div>
                    </div>
                    {/* PosMainContentSearch */}
                    <div className='w-full h-[20vh] flex justify-center items-center'>
                      
                      {/* SEARCHBYNAME */}
                      { stockState.mode == 'SearchByName' && (
                          <form onSubmit={(e) => e.preventDefault()} className='h-[12vh] w-full flex justify-center'>
                          <div className='relative bg-white w-[96%] shadow-lg flex flex-col justify-center items-center'>
                              <input type='text' 
                              name='searchname'
                              ref={searchRef}
                              onChange={(e) => {
                                getProductBySearch(e.target.value)}} 
                              placeholder='Search by name...'
                              autoFocus={stockState.mode == 'SearchByName' && true}
                              className='shadow appearance-none border rounded w-[94%] text-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                              <div className={`${searchResults.length == 0 ? 'hidden' : 'absolute top-[110%] w-[100%] z-20 bg-slate-50 shadow-md'} `}>
                              { searchResults.length > 0 &&
                                  searchResults.map((item, i) => (
                                  <div className='w-[94%] z-20 mx-auto py-3 px-2 my-1 cursor-pointer hover:bg-slate-100 hover:text-black text-slate-800' 
                                      key={i}
                                      onClick={() => {
                                        stockDispatch({
                                          type: 'ADD_PRODUCT', 
                                          payload: {
                                            id: item.id,
                                            product_id: item.id,
                                            product_name: item.name,
                                            product_stock: item.quantity + 1,
                                            quantity: item.quantity,
                                            quantity_bought: 1,
                                            unit_cost: 0,
                                            total_cost: 0,
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
                      { stockState.mode == 'SearchByBarcode' && (
                          <form className='h-[12vh] w-full flex justify-center' 
                          onSubmit={(e) => {
                              e.preventDefault()
                              console.log(scanInput)
                              getProductByBarcode(scanInput)
                              }}>
                          <div className='bg-white w-[96%] shadow-lg flex justify-center items-center'>
                              <input type='number' 
                              name='scanmode'
                              value={scanInput}
                              onChange={(e) => {
                                setScanInput(e.target.value)}} 
                              autoFocus={stockState.mode == 'SearchByBarcode' && true}
                              ref={scanRef}
                              placeholder='Search by Code...'
                              className='shadow appearance-none border rounded w-[94%] text-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                          </div>   
                          </form>
                      )}


                    </div>
                    {/* PosMainContentProductTitle */}
                    <div className='w-full h-[7vh] bg-white flex justify-center items-center shadow-lg'>
                      <div className='w-[96%] h-[100%] flex items-center justify-start text-lg'>
                          <div className='w-[35%] border-r border-slate-900 font-semibold px-3'>NAME</div>
                          <div className='w-[20%] border-r border-slate-900 font-semibold px-3'>UNIT COST</div>
                          <div className='w-[20%] border-r border-slate-900 font-semibold px-3'>QUANTITY</div>
                          <div className='w-[20%] border-r border-slate-900 font-semibold px-3'>TOTAL COST</div>
                          <div className='w-[5%] font-semibold px-3'> <ImCancelCircle /></div>
                      </div>
                    </div>
                  </section>
                  {/* PosMainContentBottom */}
                  <section className='w-[65vw] top-[37vh] h-[63vh] fixed z-0 overflow-y-auto scroll__width py-3'>
                    {/* PosMainContentTable */}  
                    <div className='w-full h-auto '>
                      <div className='flex flex-col justify-center items-center'>
                      {stockState.products.length > 0 && (

                        stockState.products.map((item, i) => (
                          <div key={i} className='w-[96%] h-[100%] flex items-center justify-start  border-y border-slate-400 py-2 text-md'>
                            <div className='w-[35%] border-r border-slate-900 px-3'>
                              {item.product_name}
                              <small className='block font-semibold text-red-600'>
                                  Stock: {item.product_stock}</small>
                            </div>
                            <div className='w-[20%] border-r border-slate-900 px-3'> 
                              { currencyState.currency.name == 'ZWL' ?
                                <>
                                    <input 
                                        name='unit_cost'
                                        className='w-[80%] border-none outline-none p-2' 
                                        value={((currencyState.currency.rate / 100) * item.unit_cost) / 100} />c
                                </>
                                : 
                                    <>
                                        <input 
                                            type='number'
                                            name='unit_cost' 
                                            className='w-[80%] border-none outline-none p-2'
                                            onChange={(e) => {
                                                stockDispatch({
                                                    type: 'SINGLE_PRODUCT_COST', 
                                                    payload:{
                                                      id: item.id, 
                                                      unit_cost: Number(e.target.value),
                                                    }})
                                                  setInputUnique(item.id, e.target.value)
                                            }}
                                            value={item.unit_cost} />c
                                    </>
                                } 
                            </div>
                            <div className='w-[20%] border-r border-slate-900 px-3'>
                                <input 
                                    type="number"
                                    ref={quantityRef}
                                    value={item.quantity_bought}
                                    name='quantity_bought'
                                    onChange={(e) => {
                                      stockDispatch({
                                        type: 'SINGLE_PRODUCT_QUANTITY', 
                                        payload:{
                                          id: item.id, 
                                          quantity_bought: e.target.value,
                                        }})
                                      setInputUnique(item.id, e.target.value)
                                      if(isSubmit == true){
                                        productDispatch({
                                          type: 'UPDATE_PRODUCT_QUANTITY',
                                          payload: {id: item.id, stock: item.stock}
                                        })
                                        setIsSubmit(false)
                                      }}
                                    }
                                    min={1} 
                                    className='w-[80%] border-none outline-none p-2'/>
                            </div>
                            <div className='w-[20%] border-r border-slate-900 px-3'>
                              ${ currencyState.currency.name == 'ZWL' ?
                                (((currencyState.currency.rate / 100) * item?.total_cost) / 100).toFixed(2)
                                : 
                                (item?.total_cost / 100).toFixed(2)
                                }
                            </div>
                            <div className='w-[5%] font-semibold px-3'> 
                              <AiFillDelete 
                                onClick={() => stockDispatch({type: 'DELETE_PRODUCT', payload: {id: item.id }})}
                                className='hover:text-red-500 transition text-lg' />
                            </div>
                        </div>

                        ))
                      )}
                        
                      </div>
                    </div>
                  </section>
              </section>
              {/* PosRightContent */}
              <section className='w-[24vw] h-[100%] right-0 bg-slate-900 text-white fixed overflow-y-scroll scroll__width'>
                {/* PosRightTop */}
                <div className='w-full h-auto px-6 pt-6 pb-4'>
                  <p className='text-sm font-semibold'>TOTAL:</p>
                  <h3 className='text-2xl font-bold text-yellow-400'>
                    ${calculateGrandTotal() ? (calculateGrandTotal() / 100).toFixed(2) : '0.00'}
                  </h3>
                </div>

                <div className='border-b border-slate-500 mx-6'></div>
                <div className='mb-1'></div>
                <div className='border-b border-slate-500 mx-6'></div>

                <div className='w-full h-auto px-6 py-5'>
                  <div className='font-semibold relative'>
                    <p className='text-sm mb-2'>Supplier</p>
                    <input type="text" 
                      ref={searchSupplierRef}
                      name='supplier_name'
                      placeholder='Enter Supplier name...'
                      onChange={(e) => handleSupplierSearch(e.target.value)}
                      className='text-lg text-black font-normal px-2 py-1 border-none outline-none rounded w-full'/>
                    <div 
                      className={`${supplierSearchResults.length == 0 ? 'hidden' : 'absolute top-[110%] w-[100%] z-20 bg-slate-50 shadow-md'} `}>
                         { supplierSearchResults.length > 0 &&
                                  supplierSearchResults.map((item, i) => (
                                  <div className='w-[94%] z-20 mx-auto py-3 px-2 my-1 cursor-pointer hover:bg-slate-100 hover:text-black text-slate-800' 
                                    key={i}
                                    onClick={() => {
                                      stockDispatch({
                                        type: 'ADD_SUPPLIER', 
                                        payload: {
                                          supplier_id: item.id,
                                          supplier_name: item.name,
                                          supplier_ref: item.supplier_ref,
                                        }
                                      })
                                      searchSupplierRef.current.value = ''
                                      setSupplierSearchResults([])  
                                    }}>
                                    {item.name}
                                  </div>
                          ))}
                    </div>   
                  </div>
                  <div className='mt-3 ml-3 flex flex-col gap-1'>
                      <div className=''>
                        Supplier Id:
                        <span className='font-bold text-yellow-100'> {stockState.supplier.supplier_ref}</span>
                      </div>
                      <div>
                        Supplier Name:
                        <span className='font-bold text-yellow-100'> {stockState.supplier.supplier_name}</span>
                      </div>
                    </div>
                </div>

                <div className='border-b border-slate-500 mx-6'></div>
                <div className='mb-1'></div>
                <div className='border-b border-slate-500 mx-6'></div>

                <div className='w-full h-auto px-6 py-5'>
                  <div className='font-semibold relative'>
                    <p className='text-sm mb-2'>Amount Paid <i>(in cents)</i></p>
                    <input type="number" 
                      min={0}
                      name='amount_paid'
                      placeholder='Enter Amount paid...'
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(() => e.target.value)}
                      className='text-xl text-black font-normal px-2 py-1 border-none outline-none rounded w-full'/>
                     
                  </div>
                 
                </div>

                <div className='border-b border-slate-500 mx-6'></div>
                <div className='mb-1'></div>
                <div className='border-b border-slate-500 mx-6'></div>

                <div className='w-full h-auto px-6 py-4'>
                  <div className='w-full flex items-center justify-start gap-2'>
                    <div className='font-semibold w-[50%]'>
                      <p className='text-sm'>Total Quantity</p>
                      <h3 className='text-lg text-yellow-100'>
                        {calculateQuantity() ? calculateQuantity() : '00'}
                      </h3>
                    </div>

                  </div>
                  
                  <div className='mb-3'></div>
                 
                  <div className='mb-3'></div>
                  <div className='flex items-center justify-start gap-2'>
                    <div className='font-semibold w-[50%] text-green-300'>
                        <p className='text-sm '>Change </p>
                        <h3 className='text-lg'>
                          ${ calculateChange() > 0 ? (calculateChange() / 100).toFixed(2) : '0.00'}
                        </h3>
                    </div>
                    <div className='font-semibold w-[50%] text-red-300'>
                        <p className='text-sm '>Owing </p>
                        <h3 className='text-lg'>${ calculateOwing() > 0 ? (calculateOwing() / 100).toFixed(2) : '0.00'}</h3>
                    </div>
                  </div>
                </div>

                <div className='border-b border-slate-500 mx-6'></div>
                <div className='mb-1'></div>
                <div className='border-b border-slate-500 mx-6'></div>

                <div className='w-full h-auto px-6 py-5'>
                  <div className='font-semibold'>
                    <p className='text-sm mb-3'>
                    Method of Payment: <span className='float-right text-yellow-200'>{paymentState.method ? paymentState.method : ''}</span>
                    
                    </p>
                  
                      <div className='flex justify-between gap-2'>
                        <button 
                          onClick={() => {
                            paymentDispatch({type: 'PAYMENT_METHOD', payload: 'Cash'})
                          }}
                          className={`px-2 py-2 border border-slate-400 text-slate-400 hover:text-white hover:border-white  transition rounded-lg`}>
                            Cash
                        </button>
                        <button 
                          onClick={() => {
                            paymentDispatch({type: 'PAYMENT_METHOD', payload: 'EcoCash'})
                          }}
                          className={`px-2 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg`}>
                          EcoCash
                        </button>
                        <button 
                          onClick={() => {
                            paymentDispatch({type: 'PAYMENT_METHOD', payload: 'Swipe'})
                          }}
                          className={`px-2 py-2 bg-green-600 hover:bg-green-700 transition rounded-lg`}>
                          Swipe
                        </button>
                      </div>
                    
                  </div>
                </div>

                <div className='border-b border-slate-500 mx-6'></div>
                <div className='mb-1'></div>
                <div className='border-b border-slate-500 mx-6'></div>

                <div className='w-full h-auto px-6 py-5'>
                  <div className='font-semibold'>
                    <div className='flex justify-between gap-2'>
                      <button 
                        className='w-[100%] text-center py-3 border border-slate-100 hover:border-white bg-[#ff0000] hover:bg-slate-900 transition rounded-lg'
                        onClick={() => {
                          processPos()
                          setIsSubmit(true)
                        }}>
                        Proceed
                      </button>
                     {/*  <button 
                        className='w-[30%] text-center py-3 border border-slate-100 hover:border-white bg-slate-600 hover:bg-slate-900 transition rounded-lg'
                        >
                        Print
                      </button> */}
                    </div>
                  </div>
                </div>
              </section>
            </div>
           
            <ToastContainer />
        </section>
      }
    </>
  )
}

export default NewPurchase