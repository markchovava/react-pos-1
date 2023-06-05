import React, { useEffect, useState, useRef } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import ProductHeader from '../../components/ProductHeader'
import PosLeftContent from '../../components/PosLeftContent'
import AxiosClient from '../../axios/axiosClient';
import { MainContextState } from '../../contexts/MainContextProvider';
import { ACTION } from '../../reducers/ProductReducer';
import { useNavigate } from 'react-router-dom';
/* Toast */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReducer } from 'react';
import { productCategoryInitialstate, productCategoryReducer } from '../../reducers/ProductCategoryReducer';
import { productBrandInitialstate, productBrandReducer } from '../../reducers/ProductBrandReducer';


function AddProduct() {
  const {productState, productDispatch} = MainContextState()
  const [dbCategory, setDbCategory] = useState([])
  const navigate = useNavigate(); 
  const brandRef = useRef(null)
  const [brand, setBrand] = useState('')
  const [brandList, setBrandList] = useState([])
  const [productBrandState, productBrandDispatch] = useReducer(productBrandReducer, productBrandInitialstate)
  const [productCategoryState, productCategoryDispatch] = useReducer(productCategoryReducer , productCategoryInitialstate)
  //console.log(productCategoryState)
  
  async function addProduct(product) {
    try{
        const result = await AxiosClient.post('product/', product)
        .then((response) => {
              productDispatch({
              type: ACTION.ADD_PRODUCT,
              payload: response.data
              });
          })
          .then(() => {
          navigate('/product', 
              toast.success('Product added successfully', {
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
        })
      } catch (error) {
          console.error(`Error: ${error}`)
      }    
  }

  useEffect(() => {
    try{
      async function getCategory() {
        const result = await AxiosClient.get('category/')
        .then((response) => {
          let categoryItems = []
          for(let i = 0; i < response.data.length; i++){
             categoryItems[i] = response.data[i]
          }
          setDbCategory(categoryItems)
        })
      }
      getCategory()
    } 
    catch(error){
      console.error(`Error: ${error}`)
    }
  }, [])

  useEffect(() => {
    async function getBrand() {
      console.log(brand)
      if(brand != ''){
        const result = await AxiosClient.get(`brand/?search=${brand}`)
        .then((response) => {
          if(response.data){
            setBrandList(response.data)
            console.log(response.data)
          } else{
            console.log('Not found')
          }
        })
      }
    }
    getBrand() 
}, [brand])

    


  

  return (
    <section className='bg-slate-100 h-auto w-full overflow-hidden'>
      <form 
      onSubmit={(e) => { e.preventDefault();
        //console.log(e.target.name.value)
        //console.log(e.target.barcode.value)
        //console.log(e.target.quantity.value)
        //console.log(e.target.unit_price.value)
        //console.log(productCategoryState)
        //console.log(productBrandState.id)
       addProduct({
          name: e.target.name.value,
          barcode: e.target.barcode.value,
          quantity: e.target.quantity.value,
          unit_price: e.target.unit_price.value,
          category: productCategoryState,
          brand_id: productBrandState.id
        });
      }}
      className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
        <PosLeftContent />
        <section className='w-[65vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
          {/* ProductHeader */}
          <section className='w-[65vw] h-[25vh] left-[10vw] bg-slate-100 fixed'>
            <ProductHeader title='Add Product Page' topic='Add Product' />
          </section>
          <section className='w-[65vw] top-[25vh] h-[75vh] fixed overflow-y-auto scroll__width py-3'>
            {/* ProductMainContentForm */}  
            <section className='w-[96%] h-auto mx-auto'>
              <div className='py-8'>
                <div className='flex items-center justify-start mb-6'>
                  <label className='w-[25%] font-semibold text-slate-900'>Product Name:</label>
                  <input type="text" name="name"
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Write Product Name...'/>
                </div>
                <div className='flex items-center justify-start mb-6'>
                  <label className='w-[25%] font-semibold text-slate-900'>
                    Barcode:
                  </label>
                  <input type="number" name='barcode'
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Enter Barcode here...'/>
                </div>
                <div className='flex items-center justify-start mb-6'>
                  <label className='w-[25%] font-semibold text-slate-900'>
                    Product Stock:
                  </label>
                  <input type="number" name='quantity'
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Enter Quantity Here...'/>
                </div>
                <div className='flex items-center justify-start mb-6'>
                  <label className='w-[25%] font-semibold text-slate-900'>
                    Unit Price:
                  </label>
                  <input type="number" name='unit_price'
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Enter Unit Price Here...'/>
                </div>
                <div className='flex items-center justify-start mb-6'>
                  <div className='w-[70%] ml-[25%]'>
                    <button type='submit' 
                      className='py-3 w-full rounded-md border border-white transition text-white bg-blue-600 hover:bg-blue-700'>
                      Submit
                    </button>
                  </div>
                  
                </div>
              </div>
            </section>
          </section>
        </section>
        {/* ProductRightContent */}
        <section 
          className='w-[24vw] h-[100%] right-0 bg-slate-900 text-white fixed overflow-y-scroll scroll__width '>
   
          <div className='w-full pt-8'>
              {/* BORDER */}
              <div className='border-b border-slate-500 mx-6 h-[.5rem]'></div>
              <div className='mb-1'></div>
              <div className='border-b border-slate-500 mx-6'></div>
              {/* Brand */}
              <div className='w-full h-auto px-6 my-8'>
                <div className='font-semibold'>
                  <p className='text-sm mb-2'>Brand Name:</p>
                  <div className='flex items-center flex-col justify-between'>
                    <input 
                      type="text"
                      ref={brandRef}
                      name="brand" 
                      onChange={e => setBrand(e.target.value)}
                      placeholder='Add Brand Name...'
                      className='w-[100%] text-black px-3 py-2 border-none outline-none rounded-md'/>
                      <div className='w-full text-left pt-2'>
                      { brand == '' ? '' :
                        brandList ? 
                        brandList.map((b) => (
                          <div 
                          key={b.id}
                          onClick={() => {
                            setBrand('')
                            setBrandList('') 
                            brandRef.current.value = b.name
                            productBrandDispatch({type: 'PRODUCT_BRAND_SELECT', payload: b})
                          }}
                          className='px-3 py-1 my-1 cursor-pointer hover:text-blue-100'>{b.name}</div>
                        )) :
                        ''
                      }  
                      </div> 
                  </div>
                </div>
              </div>
              {/* BORDER */}
              <div className='border-b border-slate-500 mx-6'></div>
              <div className='mb-1'></div>
              <div className='border-b border-slate-500 mx-6'></div>
              {/* CATEGORY */}
              <div className='w-full h-auto px-6 py-8'>
                <div className='font-semibold'>
                  <p className='text-sm mb-2'>Category Name:</p>
                  {dbCategory.map((item) => (
                    <label key={item.id} className='flex items-center justify-start gap-2'>
                      <input type="checkbox" 
                        value={item.id}
                        name='category' 
                        onChange={
                          (e) => {
                            if(e.target.checked == true){
                              productCategoryDispatch({type: 'PRODUCT_CATEGORY_ADD', payload: item.id})
                            } else if(e.target.checked == false){
                              productCategoryDispatch({type: 'PRODUCT_CATEGORY_REMOVE', payload: item.id})
                            } 
                          }
                        }
                        className='cursor-pointer text-black px-3 py-2 border-none outline-none rounded-md'/>
                        {item.name}
                    </label>
                  ))} 
                </div>
              </div>
              {/* BORDER */}
              <div className='border-b border-slate-500 mx-6'></div>
              <div className='mb-1'></div>
              <div className='border-b border-slate-500 mx-6'></div>
              
          </div>

        </section>


      </form>
    </section>
  )

}


export default AddProduct