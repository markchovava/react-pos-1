import React, { useRef, useState, useEffect } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { AiFillDelete } from 'react-icons/ai'
import PosLeftContent from '../../components/PosLeftContent'
import { MainContextState } from '../../contexts/MainContextProvider'
import AxiosClient from '../../axios/axiosClient'
import { Link } from 'react-router-dom'

function PosPage() {
  const {posState, posDispatch, productState, productDispatch, zwlRate, setZwlRate, currencyState, 
        salesDispatch, currencyDispatch, paymentState, paymentDispatch} = MainContextState()
  const [amount, setAmount] = useState(0)
  const amountRef = useRef()
  const currencyRef = useRef()
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef()
  const scanRef = useRef()
  const quantityRef = useRef()
  const [inputData, setInputData] = useState(0);
  const [scanInput, setScanInput] = useState()
  const [isSubmit, setIsSubmit] = useState(false)

  /* FETCH ALL PRODUCTS */
  async function fetchProducts() {
    try{
       const result = await AxiosClient.get('product/')
       .then((response) => {
            productDispatch({
             type: 'FETCH_PRODUCT',
             payload: response.data,
             })  
             console.log('PRODUCTS:') 
             console.log(response.data)  
        })
    } catch (error) {
       console.error(`Error: ${error}`)
    }   
  }
  /* GET ZWL RATE */
  async function getZwlRate() {
    try{
       const result = await AxiosClient.get('currency/1/')
       .then((response) => {
          setZwlRate(response.data.rate)   
          //console.log('ZWL RATE:')
          //console.log(response.data)
       })
    } catch (error) {
       console.error(`Error: ${error}`)
    }   
 }
  /* SIDE EFFECTS */
  useEffect(() => {     
    fetchProducts()
    getZwlRate()
  }, []);


  const setInputUnique = (itemId, value) => {
    const newList = posState.products.map((item) => {
      if (item.id === itemId) {
        item.value = value;
      }
      return item;
    });
    setInputData(newList)
  };
  /* CHANGING MODE */
  const handleMode = (mode) => {
    posDispatch({type: 'CHANGE_MODE', payload: mode})
    // console.log(mode)
  }
  /* CHANGE CURRENCY */
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
  const handleSearch = (search) => {
    const searchData = productState.products.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    if(search){
      setSearchResults(searchData)
      console.log(searchData)
    }else if(!search){
      setSearchResults([])
    }
  }
   /* SEARCH PRODUCT USING BARCODE */
   const handleScan = (search) => {
    setScanInput(search)
    if(search){
      console.log(productState.products)
      /* if(!Number.isInteger(search)){
        alert('The input is not a number...')
      } */
      const scanData = productState.products.filter((item) => item.barcode == search);
      console.log(scanData[0])
      if(scanData[0]){
        posDispatch({
          type: 'ADD_PRODUCT', 
           payload: {
            id: scanData[0].id,
            product_id: scanData[0].id,
            product_name: scanData[0].name,
            quantity: scanData[0].quantity,
            stock: scanData[0].quantity - 1,
            quantity_sold: 1,
            currency: currencyRef.current.value,
            unit_price: scanData[0].unit_price,
            total_price: scanData[0].unit_price
        }})
        scanRef.current.value = '' 
        setScanInput('')
      } else{
        alert('Not found.')
        scanRef.current.value = ''
      }
    } else if(!search){
      console.log('The input is empty...')
    }
  } 
  /* GRANDTOTAL */
  const calculateGrandTotal = () => {
    const calculateGrandTotal = posState.products.reduce((acc, item) => acc + item.total_price, 0);
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
    const quantity = posState.products.reduce((acc, item) => acc + item.quantity_sold, 0);
    return quantity;
  };
  /* SUBTOTAL */
  const calculateSubTotal = () => {
    const subtotal = calculateGrandTotal() - calculateTax();
    return subtotal;
  };
  /* TAX */
  const calculateTax = () => {
    const tax = (15 / 100) * calculateGrandTotal();
    return tax;
  }
  /* CHANGE */
  const calculateChange = () => {
    const change = (amount * 100) - calculateGrandTotal();
    return change;
  }
  /* OWING */
  const calculateOwing = () => {
    const owing = calculateGrandTotal() - (amount * 100);
    return owing;
  }

  const calculateStock = () => {}

  const processPos =  async (data) => {
    let items;
    if(posState.products.length > 1) {
      items = posState.products.map((item) => ({
        product_id: parseInt(item.id),
        product_name: item.product_name,
        stock: item.stock,
        currency: currencyRef.current.value,
        quantity_sold: parseInt(item.quantity_sold),
        unit_price: parseInt(item.unit_price),
        total_price: parseInt(item.total_price),
        user_id: null
      }))  
    } else {
      items = [{
        product_id: parseInt(posState.products[0].id),
        product_name: posState.products[0].product_name,
        currency: currencyRef.current.value,
        quantity_sold: parseInt(posState.products[0].quantity_sold),
        unit_price: parseInt(posState.products[0].unit_price),
        total_price: parseInt(posState.products[0].total_price),
        user_id: null 
      }]
    }
    const sales_items = items;
    const sales = {
      user_id: null,
      quantity_total: parseInt(calculateQuantity()),
      grandtotal: parseInt(calculateGrandTotal()),
      amount_paid: parseInt(amountRef.current.value * 100),
      subtotal: parseInt(calculateSubTotal()),
      tax: parseInt(calculateTax()),
      change: parseInt(calculateChange()),
      owing: calculateOwing() < 1 ? null : parseInt(calculateOwing()),
      currency: currencyRef.current.value,
      payment_method: paymentState.method,
      sales_items: sales_items
    }
    //console.log(sales) 
    //console.log(sales_items)
    if( paymentState.method ) {
      //console.log(sales)
      const result = await AxiosClient.post('sales/', sales)
        .then((response) => {
          try{
            console.log(response.data)
            salesDispatch({type: 'ADD_SALES', payload: response.data})
            posDispatch({type: 'REMOVE_PRODUCT'})
            alert('Processing was successful.')
          } catch(error){
            console.log(`ERROR: ${error}`)
          }
      })    
    } else {
      confirm('Select Payment Method')
    }
  }


  return (
    <section className='bg-slate-100 h-auto w-full overflow-hidden'>
        <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
          <PosLeftContent />
          {/* PosMainContent */}
          <section className='w-[65vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
              {/* PosMainContentTop */}
              <section className='fixed z-0 w-[65vw] h-[37vh] border-b border-black '>
                {/* PosMainContentHeader */}
                <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg'>
                    <div className='w-[96%] flex justify-between items-center'>
                        <div className=''>
                        <h1 className='font-bold text-xl'>POS PAGE </h1></div>
                        <div className=''>
                            <h2 className='font-semibold text-xl'>
                              Operator: <Link to='/test'>Username</Link>
                            </h2>
                        </div>
                        <div className='text-xl font-semibold'>
                          Rate:
                          <span className='ml-2 text-blue-800'>
                          1 : {(zwlRate / 100).toFixed(2)}</span>
                        </div>
                        <div className='flex items-center justify-between gap-3'>
                            <select 
                            name='currency'
                            ref={currencyRef}
                              onChange={(e) => handleCurrency(e.target.value)}
                              className='text-lg border-none outline-none'>
                                <option value='USD'>USD</option>
                                <option value='ZWL'>ZWL</option>
                            </select>
                            {/* Button */}
                            <select 
                              name='mode'
                              onChange={(e) => handleMode(e.target.value)}
                              className='text-lg border-none outline-none'>
                                <option value='SearchByBarcode'> Scan Mode </option>
                                <option value='SearchByName'> Search Mode </option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* PosMainContentSearch */}
                <div className='w-full h-[20vh] flex justify-center items-center'>
                  
                  {/* SEARCHBYNAME */}
                  { posState.mode == 'SearchByName' && (
                    <form onSubmit={(e) => e.preventDefault()} className='h-[12vh] w-full flex justify-center'>
                      <div className='relative bg-white w-[96%] shadow-lg flex flex-col justify-center items-center'>
                        <input type='text' 
                          name='searchname'
                          ref={searchRef}
                          onChange={(e) => handleSearch(e.target.value)} 
                          placeholder='Search by name...'
                          autoFocus={posState.mode == 'SearchByName' && true}
                          className='shadow appearance-none border rounded w-[94%] text-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <div className={`${searchResults.length == 0 ? 'hidden' : 'absolute top-[110%] w-[100%] z-20 bg-slate-50 shadow-md'} `}>
                          { searchResults.length > 0 &&
                            searchResults.map((item, i) => (
                              <div className='w-[94%] z-20 mx-auto py-3 px-2 my-1 cursor-pointer hover:bg-slate-100 hover:text-black text-slate-800' 
                                key={i}
                                onClick={() => {
                                  posDispatch({
                                    type: 'ADD_PRODUCT', 
                                    payload: {
                                      id: item.id,
                                      product_id: item.id,
                                      product_name: item.name,
                                      quantity: item.quantity,
                                      quantity_sold: 1,
                                      stock: item.quantity - 1,
                                      currency: currencyRef.current.value,
                                      unit_price: item.unit_price,
                                      total_price: item.unit_price
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
                  { posState.mode == 'SearchByBarcode' && (
                    <form className='h-[12vh] w-full flex justify-center' onSubmit={(e) => e.preventDefault()}>
                      <div className='bg-white w-[96%] shadow-lg flex justify-center items-center'>
                        <input type='number' 
                          name='scanmode'
                          value={scanInput}
                          onChange={(e) => handleScan(e.target.value)} 
                          autoFocus={posState.mode == 'SearchByBarcode' && true}
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
                      <div className='w-[20%] border-r border-slate-900 font-semibold px-3'>UNIT PRICE</div>
                      <div className='w-[20%] border-r border-slate-900 font-semibold px-3'>QUANTITY</div>
                      <div className='w-[20%] border-r border-slate-900 font-semibold px-3'>TOTAL PRICE</div>
                      <div className='w-[5%] font-semibold px-3'> <ImCancelCircle /></div>
                  </div>
                </div>
              </section>
              {/* PosMainContentBottom */}
              <section className='w-[65vw] top-[37vh] h-[63vh] fixed z-0 overflow-y-auto scroll__width py-3'>
                {/* PosMainContentTable */}  
                <div className='w-full h-auto '>
                  <div className='flex flex-col justify-center items-center'>
                  {posState.products.length > 0 && (

                    posState.products.map((item, i) => (
                      <div key={i} className='w-[96%] h-[100%] flex items-center justify-start  border-y border-slate-400 py-2 text-md'>
                        <div className='w-[35%] border-r border-slate-900 px-3'>
                          {item.product_name}
                          <small className='block font-semibold text-red-600'>Stock: {item.stock}</small>
                        </div>
                        <div className='w-[20%] border-r border-slate-900 px-3'> 
                          ${ currencyState.currency.name == 'ZWL' ?
                            (((currencyState.currency.rate / 100) * item.unit_price) / 100).toFixed(2)
                            : (item.unit_price / 100).toFixed(2)
                            } 
                        </div>
                        <div className='w-[20%] border-r border-slate-900 px-3'>
                            <input 
                                type="number"
                                ref={quantityRef}
                                value={item.quantity_sold}
                                name='quantity_sold'
                                onChange={(e) => {
                                  console.log(item.name + ': ' + e.target.value)
                                  posDispatch({type: 'SINGLE_PRODUCT_QUANTITY', payload:{id: item.id, quantity_sold: e.target.value}})
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
                            (((currencyState.currency.rate / 100) * item?.total_price) / 100).toFixed(2)
                            : 
                            (item?.total_price / 100).toFixed(2)
                            }
                        </div>
                        <div className='w-[5%] font-semibold px-3'> 
                          <AiFillDelete 
                            onClick={() => posDispatch({type: 'DELETE_PRODUCT', payload: {id: item.id }})}
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
              <h3 className='text-3xl font-bold text-yellow-400'>
                ${calculateGrandTotal() ? (calculateGrandTotal() / 100).toFixed(2) : '0.00'}
              </h3>
            </div>

            <div className='border-b border-slate-500 mx-6'></div>
            <div className='mb-1'></div>
            <div className='border-b border-slate-500 mx-6'></div>

            <div className='w-full h-auto px-6 py-5'>
              <div className='font-semibold'>
                <p className='text-sm mb-2'>Amount Paid</p>
                <input type="text" 
                  ref={amountRef}
                  name='amount'
                  onChange={() => setAmount(amountRef.current.value)}
                  className='text-2xl text-black font-semibold px-3 py-2 border-none outline-none rounded w-full'/>
              </div>
            </div>

            <div className='border-b border-slate-500 mx-6'></div>
            <div className='mb-1'></div>
            <div className='border-b border-slate-500 mx-6'></div>

            <div className='w-full h-auto px-6 py-4'>
              <div className='w-full flex items-center justify-start gap-2'>
                <div className='font-semibold w-[50%]'>
                  <p className='text-sm'>Subtotal</p>
                  <h3 className='text-2xl text-yellow-100'>
                    ${calculateSubTotal() ? (calculateSubTotal() / 100).toFixed(2) : '0.00'}
                  </h3>
                </div>
                <div className='font-semibold w-[50%]'>
                  <p className='text-sm'>Total Quantity</p>
                  <h3 className='text-2xl text-yellow-100'>
                    {calculateQuantity() ? calculateQuantity() : '00'}
                  </h3>
                </div>

              </div>
              
              <div className='mb-3'></div>
              <div className='font-semibold'>
                  <p className='text-sm '>Tax (15%) </p>
                  <h3 className='text-2xl text-yellow-100'>
                    ${ calculateTax() ? (calculateTax() / 100).toFixed(2) : '0.00' }
                  </h3>
              </div>
              <div className='mb-3'></div>
              <div className='flex items-center justify-start gap-2'>
                <div className='font-semibold w-[50%] text-green-300'>
                    <p className='text-sm '>Change </p>
                    <h3 className='text-2xl'>
                      ${ calculateChange() > 0 ? (calculateChange() / 100).toFixed(2) : '0.00'}
                    </h3>
                </div>
                <div className='font-semibold w-[50%] text-red-300'>
                    <p className='text-sm '>Owing </p>
                    <h3 className='text-2xl'>${ calculateOwing() > 0 ? (calculateOwing() / 100).toFixed(2) : '0.00'}</h3>
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
                      className={`px-4 py-3 border border-slate-400 text-slate-400 hover:text-white hover:border-white  transition rounded-lg`}>
                        Cash
                    </button>
                    <button 
                      onClick={() => {
                        paymentDispatch({type: 'PAYMENT_METHOD', payload: 'EcoCash'})
                      }}
                      className={`px-4 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg`}>
                      EcoCash
                    </button>
                    <button 
                      onClick={() => {
                        paymentDispatch({type: 'PAYMENT_METHOD', payload: 'Swipe'})
                      }}
                      className={`px-4 py-3 bg-green-600 hover:bg-green-700 transition rounded-lg`}>
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
                    className='w-full text-center py-3 border border-slate-100 hover:border-white bg-[#ff0000] hover:bg-slate-900 transition rounded-lg'
                    onClick={() => {
                      processPos()
                      setIsSubmit(true)
                    }}>
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </section>
           
        </div>
    </section>
  )
}

export default PosPage