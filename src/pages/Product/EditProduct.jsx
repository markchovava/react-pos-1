import React, {useReducer, useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import PosLeftContent from '../../components/PosLeftContent'
import AxiosClient from '../../axios/axiosClient';
import { MainContextState } from '../../contexts/MainContextProvider';
/* Toast */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function EditProduct() {
  const {productState, productDispatch, productViewState, productViewDispatch} = MainContextState()
  /* Get Single Product */
  const { id } = useParams()
  const getProductById = () => {
    return productState.products.find((obj) => obj.id === parseInt(id));
  };
  const product = getProductById()
 
  console.log(product)
  const navigate = useNavigate(); 
  const [inputData, setInputData] = useState({
    name: product.name,
    description: product.description,
    barcode: product.barcode,
    quantity: product.quantity,
    unit_price: product.unit_price,
    brand: product.brand
  });


  

  /* Makin Input field editable */
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  


  

  /* UPDATE PRODUCT */
  async function updateProduct(product) {
    try{
        const result = await AxiosClient.put(`product/${id}/`, product)
        .then((response) => {
              console.log(response.data)
              productDispatch({
              type: 'UPDATE_PRODUCT',
              payload: response.data 
            });
          })
          .then(() => {
          navigate('/product', 
              toast.success('Product Updated successfully', {
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
 
 
  //console.log(productViewState) 
  //console.log(product) 
  return (
    <section className='bg-slate-100 h-auto w-full overflow-hidden'>
    <form 
      onSubmit={(e) => { e.preventDefault();
        console.log(e.target.name.value)
        console.log(e.target.description.value)
        console.log(e.target.barcode.value)
        console.log(e.target.quantity.value)
        console.log(e.target.unit_price.value)
        console.log(e.target.brand.value)
        updateProduct({
          name: e.target.name.value,
          description: e.target.description.value,
          barcode: e.target.barcode.value,
          quantity: e.target.quantity.value,
          unit_price: e.target.unit_price.value,
          brand: e.target.brand.value
       });
    }}
    className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
      <PosLeftContent />
      <section className='w-[65vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
        {/* ProductHeader */}
        <section className='w-[65vw] h-[25vh] left-[10vw] bg-slate-100 fixed'>
          {/* Title and User Name */}
          <div className='w-full h-[10vh] bg-white border-b border-slate-400 flex items-center justify-center shadow-lg pr-[1rem]'>
            <div className='w-[96%] flex justify-between items-center'>
                <div className=''>
                  <h1 className='font-bold text-xl'> Edit Product Page </h1>
                </div>
                <div className=''>
                      <h2 className='font-semibold text-xl'>User: Mark Chovava</h2>
                </div>
            </div>
          </div>
          {/* Title */}
          <div className='w-full h-[15vh]  shadow-lg flex justify-center items-end pr-[1rem]'>
            <div className='w-full h-[10vh] bg-white flex justify-center'>
                <div className='w-[96%] flex justify-between items-end pb-2'>
                  <h1 className='text-4xl font-bold'>Edit Product</h1>
                  <Link to='/product'>
                    <button className='px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>
                      View All
                    </button>
                  </Link>
                </div>
            </div>    
          </div>
        </section>
        <section className='w-[65vw] top-[25vh] h-[75vh] fixed overflow-y-auto scroll__width py-3'>
          {/* ProductMainContentForm */}  
          <section className='w-[96%] h-auto mx-auto'>
            <div className='py-8'>
              <div className='flex items-center justify-start mb-6'>
                <label className='w-[25%] font-semibold text-slate-900'>Product Name:</label>
                <input 
                  type="text" 
                  name="name"
                  onChange={handleChange}
                  value={inputData.name}
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Write Product Name...'/>
              </div>
              <div className='flex items-center justify-start mb-6'>
                <label className='w-[25%] font-semibold text-slate-900'>
                  Description:
                </label>
                <input 
                  type="text" 
                  name="description"
                  onChange={handleChange}
                  value={inputData.description}
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Write Description here...' />
              </div>
              <div className='flex items-center justify-start mb-6'>
                <label className='w-[25%] font-semibold text-slate-900'>
                  Barcode:
                </label>
                <input type="number" 
                  name='barcode'
                  onChange={handleChange}
                  value={inputData.barcode}
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Enter Barcode here...'/>
              </div>
              <div className='flex items-center justify-start mb-6'>
                <label className='w-[25%] font-semibold text-slate-900'>
                  Product Stock:
                </label>
                <input type="number"
                  onChange={handleChange} 
                  name='quantity'
                  value={inputData.quantity}
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Enter Quantity Here...'/>
              </div>
              <div className='flex items-center justify-start mb-6'>
                <label className='w-[25%] font-semibold text-slate-900'>
                  Unit Price:
                </label>
                <input type="number" 
                  onChange={handleChange}
                  name='unit_price'
                  value={inputData.unit_price}
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
 
        <div className='w-full pt-[4rem]'>
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
                    onChange={handleChange}
                    name="brand" 
                    value={inputData.brand}
                    placeholder='Add Brand Name...'
                    className='w-[100%] text-black px-3 py-2 border-none outline-none rounded-md'/>
                </div>
              </div>
            </div>
            {/* BORDER */}
            <div className='border-b border-slate-500 mx-6'></div>
            <div className='mb-1'></div>
            <div className='border-b border-slate-500 mx-6'></div>
            {/* Category */}
            <div className='w-full h-auto px-6 my-8'>
              <div className='font-semibold'>
                <p className='text-sm mb-2'>Category Name:</p>
                <div className='flex items-center flex-col justify-between'>
                  <input 
                    type="text"
                    onChange={handleChange}
                    name="category"
                    value={inputData.category} 
                    placeholder='Add category Name...'
                    className='w-[100%] text-black px-3 py-2 border-none outline-none rounded-md'/>
                </div>
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


export default EditProduct