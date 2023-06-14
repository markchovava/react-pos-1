import React, { useEffect, useRef, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { AiFillDelete } from 'react-icons/ai'
import { MainContextState } from '../../../contexts/MainContextProvider'




function PosMainContent() {
  const {posState, posDispatch, zwlRate, currencyState, currencyDispatch, productState} = MainContextState()
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef()
  const quantityRef = useRef()
  const [inputData, setInputData] = useState(0);

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
    console.log(mode)
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
    //console.log(search)
    const searchData = productState.products.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    //console.log(searchData)
    //console.log(searchData.length)
    if(search){
      setSearchResults(searchData)
    }else if(!search){
      setSearchResults([])
    }
    
  }
  console.log(currencyState.currency.name)
  console.log(currencyState.currency.rate)


  return (
    <section className='w-[65vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
      {/* PosMainContentTop */}
      <section className='fixed w-[65vw] h-[37vh] border-b border-black '>
        {/* PosMainContentHeader */}
        <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg'>
            <div className='w-[96%] flex justify-between items-center'>
                <div className=''>
                <h1 className='font-bold text-xl'>POS PAGE </h1></div>
                <div className=''>
                    <h2 className='font-semibold text-xl'>Operator: Mark Chovava</h2>
                </div>
                <div className='text-xl font-semibold'>
                  Rate:
                  <span className='ml-2 text-blue-800'>
                  1 : {(zwlRate / 100).toFixed(2)}</span>
                </div>
                <div className='flex items-center justify-between gap-3'>
                    <select 
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
            <form className='h-[12vh] w-full flex justify-center'>
              <div className='relative bg-white w-[96%] shadow-lg flex flex-col justify-center items-center'>
                <input type='text' 
                  name='searchname'
                  ref={searchRef}
                  onChange={(e) => handleSearch(e.target.value)} 
                  placeholder='Search by name...'
                  autoFocus={posState.mode == 'SearchByName' && true}
                  className='shadow appearance-none border rounded w-[94%] text-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                <div className={`${searchResults.length == 0 ? 'hidden' : 'absolute top-[110%] w-[100%] z-10 bg-slate-50 shadow-md'} `}>
                  { searchResults.length > 0 &&
                    searchResults.map((item) => (
                      <div className='w-[94%] mx-auto py-3 px-2 my-2 cursor-pointer hover:bg-slate-100 hover:text-black text-slate-800' 
                        key={item.id}
                        onClick={() => {
                          item.quantity_sold = 1
                          item.total_price = item.unit_price * item.quantity_sold
                          posDispatch({
                              type: 'ADD_PRODUCT', 
                              payload: {
                                id: item.id,
                                name: item.name,
                                quantity_sold: 1,
                                unit_price: item.unit_price,
                                total_price: item.unit_price
                              }
                        })
                          console.log(posState.products)
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
            <form className='h-[12vh] w-full flex justify-center'>
              <div className='bg-white w-[96%] shadow-lg flex justify-center items-center'>
                <input type='text' 
                  name='scanmode'
                  autoFocus={posState.mode == 'SearchByBarcode' && true}
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
      <section className='w-[65vw] top-[37vh] h-[63vh] fixed overflow-y-auto scroll__width py-3'>
        {/* PosMainContentTable */}  
        <div className='w-full h-auto '>
          <div className='flex flex-col justify-center items-center'>
          {posState.products.length > 0 && (

            posState.products.map((item, i) => (
              <div key={i} className='w-[96%] h-[100%] flex items-center justify-start  border-y border-slate-400 py-2 text-md'>
                <div className='w-[35%] border-r border-slate-900 px-3'>{item.name}</div>
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
                        value={ item.value}
                        name='quantity_sold'
                        onChange={(e) => {
                          console.log(item.name + ': ' + e.target.value)
                          posDispatch({type: 'SINGLE_PRODUCT_QUANTITY', payload:{id: item.id, quantity_sold: e.target.value}})
                          setInputUnique(item.id, e.target.value)
                          }}
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
                    onClick={() => posDispatch({type: 'REMOVE_PRODUCT', payload: {id: item.id }})}
                    className='hover:text-red-500 transition text-lg' />
                </div>
            </div>

            ))
          )}
            
          </div>
        </div>
      </section>

    </section>
  )
}

export default PosMainContent