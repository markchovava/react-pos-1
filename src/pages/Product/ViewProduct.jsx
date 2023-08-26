import React, { useEffect, useState } from 'react'
import AxiosClient from '../../axios/axiosClient';
import PosLeftContent from '../../components/PosLeftContent'
import { MainContextState } from '../../contexts/MainContextProvider';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LogoutBtn from '../../components/LogoutBtn';
import CurrentUser from '../../components/CurrentUser';


function ViewProduct() {
   const { id } = useParams()
   const [product, setProduct] = useState({})
   const {getToken, productState,} = MainContextState()
   const navigate = useNavigate();
   const token = getToken();
   useEffect(()=>{
      if(!token){
        return navigate('/login');
      }
    },[token])

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    };

    /* GET USER */
    useEffect(() => {
      const getProduct = async () => {
        try{
          const result = await AxiosClient.get(`product/${id}`, { headers })
          .then((response) => {
              //console.log(response.data)
              setProduct(() => response.data)
              
          })
        } catch (error) {
          console.error(`Error: ${error}`)
          // Error handling
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }  
      }
      getProduct()
    }, [])
  
   console.log(product)
   return (
  
      <section className='bg-slate-100 h-auto w-full overflow-hidden'>
      <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
        <PosLeftContent />
        
        <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
         {/* ProductHeader */}
         <section className='w-[90vw] h-[25vh] left-[10vw] bg-slate-100 fixed'>
            {/* Title and User Name */}
            <div className='w-full h-[10vh] bg-white border-b border-slate-400 flex items-center justify-center shadow-lg pr-[1rem]'>
               <div className='w-[96%] flex justify-between items-center'>
                  <div className=''>
                     <h1 className='font-bold text-lg'>
                        <Link 
                           to='/product'
                           className='text-blue-800 hover:text-black'>
                           Products
                        </Link> / <span className=''> Product Details </span>
                     </h1>
                  </div>
                  <div className='flex gap-2 items-center'>
                     <CurrentUser />
                     <LogoutBtn />
                  </div>
               </div>
            </div>
            {/* Title */}
            <div className='w-full h-[15vh]  shadow-lg flex justify-center items-end '>
               <div className='w-full h-[10vh] bg-white flex justify-center pr-[1rem]'>
                  <div className='w-[96%] flex justify-between items-end pb-2'>
                     <h1 className='text-4xl font-bold'> Product Details </h1>
                     <Link to='/product' className='px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>
                        View All
                     </Link>
                  </div>
               </div>    
            </div>
         </section>
         {/* ProductDetails */}
         <section className='w-[90vw] h-[75vh] top-[25vh] left-[10vw] border-t border-slate-200 bg-white fixed overflow-y-auto scroll__width pb-8'>
            <div className='w-[96%] h-auto mx-auto'>
               <div className='py-8'>
                  <div className='flex items-center justify-start mb-7'>
                     <label className='w-[20%] font-semibold text-slate-900'>Product Name:</label>
                     <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                        {product.name ? product.name : 'No Name Added'}
                     </div>
                  </div>
                  <div className='flex items-center justify-start mb-7'>
                     <label className='w-[20%] font-semibold text-slate-900'>Bar Code:</label>
                     <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                        {product.barcode ? product.barcode : 'No Barcode Inserted'}
                     </div>
                  </div>
                  <div className='flex items-center justify-start mb-7'>
                     <label className='w-[20%] font-semibold text-slate-900'>Unit Price:</label>
                     <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                        ${product.unit_price ? (product.unit_price / 100).toFixed(2) : 'No Unit Price Added.'}
                     </div>
                  </div>
                  <div className='flex items-center justify-start mb-7'>
                     <label className='w-[20%] font-semibold text-slate-900'>In-Stock:</label>
                     <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                        {product?.quantity != null ? product.quantity : 'No Stock Added'}
                     </div>
                  </div>
                  <div className='flex items-center justify-start mb-7'>
                     <label className='w-[20%] font-semibold text-slate-900'>Brand:</label>
                     <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                        { product?.brand != null && product?.brand != '' ? product.brand : 'No Brand Selected'}
                     </div>
                  </div>
                  
                  
               </div>
            </div>
         </section>
        </section>
      </div>
      </section>
      
  )
}

export default ViewProduct