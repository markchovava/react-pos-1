import React, {useReducer, useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import PosLeftContent from '../../components/PosLeftContent'
import AxiosClient from '../../axios/axiosClient';
import { MainContextState } from '../../contexts/MainContextProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutBtn from '../../components/LogoutBtn';
import CurrentUser from '../../components/CurrentUser';



function EditPrice() {
  const baseURL = 'product-price/'
  const productURL = 'product/'
  const navigate = useNavigate(); 
  const { id } = useParams()
  /* CHECK AUTHENTICATION */
  const {getToken, authUser} = MainContextState()
  const token = getToken();
  if(!token){
     return navigate('/login');
  }

   /* ACCESS CONTROL */
   const accessLevel = parseInt(authUser?.access_level)
   useEffect(() => {
     if(accessLevel > 3){
       return navigate('/price', 
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
  const [product, setProduct] = useState({})
  const [price, setPrice] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [productData, setProductData] = useState({});
 

  /* GET PRODUCT */
  async function getProduct() {
    try{
      const result = await AxiosClient.get(`${productURL + id}/`)
      .then((response) => {
        setProduct(() => response.data)
        setPrice(() => response.data.unit_price)
      })
    } catch (error) {
        // Error handling
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    }   
  }   

  useEffect(() => { 
    getProduct()
  }, []); 



  const handleUpdate = (e) => {
    e.preventDefault();
    setProductData({
      id: product.id,
      name: product.name,
      unit_price: e.target.unit_price.value,
      user_id: authUser.id
    })
    setIsSubmit(true)
 }

  /* UPDATE PRODUCT */
  async function updateProduct(product) {
    try{
        const result = await AxiosClient.put(`${baseURL + id}/`, {products: [product]})
        .then((response) => {
              console.log(response.data)
          })
          .then(() => {
          navigate('/price/list', 
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

  useEffect(()=> {
    if(isSubmit == true){
      updateProduct(productData)
    }
  }, [isSubmit])

  
  
  return (
    <section className='bg-slate-100 h-auto w-full overflow-hidden'>
    <form 
      onSubmit={handleUpdate}
    className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
      <PosLeftContent />
      <section className='w-[65vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
        {/* ProductHeader */}
        <section className='w-[65vw] h-[25vh] left-[10vw] bg-slate-100 fixed'>
          {/* Title and User Name */}
          <div className='w-full h-[10vh] bg-white border-b border-slate-400 flex items-center justify-center shadow-lg pr-[1rem]'>
            <div className='w-[96%] flex justify-between items-center'>
                <div className=''>
                  <h1 className='font-bold text-lg'> 
                      <Link 
                        to='/price'
                        className='text-blue-800 hover:text-black'>
                        Price
                      </Link> / <Link 
                        to='/price/list'
                        className='text-blue-800 hover:text-black'>
                        {` Price List `}
                      </Link> / Edit Price
                  </h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <CurrentUser />
                    <LogoutBtn />
                </div>
            </div>
          </div>
          {/* Title */}
          <div className='w-full h-[15vh]  shadow-lg flex justify-center items-end pr-[1rem]'>
            <div className='w-full h-[10vh] bg-white flex justify-center'>
                <div className='w-[96%] flex justify-between items-end pb-2'>
                  <h1 className='text-4xl font-bold'>Edit Price</h1>
                  <Link to='/price/list'>
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
                <span
                  className='py-2 px-3 w-[70%]' 
                  placeholder='Write Product Name...'>{product.name}</span>
              </div>   
              <div className='flex items-center justify-start mb-6'>
                <label className='w-[25%] font-semibold text-slate-900'>Product Barcode:</label>
                <span
                  className=' py-2 px-3 w-[70%]'>{product.barcode}</span>
              </div>   
              <div className='flex items-center justify-start mb-6'>
                <label className='w-[25%] font-semibold text-slate-900'>
                  Product Price:
                </label>
                <input type="number"
                  value={price}
                  onChange={(e) => { setPrice(e.target.value) }}
                  name='unit_price'
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Enter Price Here...'/>
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
            
           
             
        </div>

      </section>


    </form>
  </section>
  )

}


export default EditPrice