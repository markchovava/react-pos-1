import React, { useRef,  useState, useEffect} from 'react'
/* react-router-dom */
import { Link } from 'react-router-dom'
/* ICONS */
import { AiFillEdit, AiFillEye, AiFillDelete } from 'react-icons/ai'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
/* NOTIFICATIONS */
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* STATE & AXIOS */
import { MainContextState } from '../../contexts/MainContextProvider'
import AxiosClient from '../../axios/axiosClient'
/*  */
import PosLeftContent from '../../components/PosLeftContent'


function ListProduct() {
  const {productState, productDispatch} = MainContextState()
  const searchRef = useRef(null)
  const [searchName, setSearchName] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

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
  /* SIDE EFFECTS */
  useEffect(() => {     
    fetchProducts()
  }, []);
   
  const handleDelete = async () => {
    let a = confirm(`Are you sure?`)
    if( a ){
      const result = await AxiosClient.delete(`product/${deleteId}`)
      .then((response) => {
        console.log(response.data)
        productDispatch({
          type: 'DELETE_PRODUCT',
          payload: {id:deleteId}
        })
      })
      alert('Deleted successful...')   
    }
  }

  const handleSearch = async () => {
    const result = await AxiosClient.get(`product/?search=${searchName}`)
      .then((response) => {
        console.log(response.data)
        productDispatch({
          type: 'SEARCH_PRODUCT',
            payload: response.data.results,
        })
        setIsSubmit(false)
      })   
  }

  useEffect( () => {
    if(isDelete == true){
      handleDelete()
      setIsDelete(false)
      setDeleteId(null) 
    }
  }, [deleteId])

  useEffect( () => {
    if( isSubmit == true){ 
      handleSearch()  
    }
  }, [isSubmit]);


  return (
    <section className='bg-slate-100 h-auto w-full overflow-hidden'>
        <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
          <PosLeftContent />
          <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
            {/* ProductListHeader */}
            <section className='w-[89vw] h-[32vh] fixed border-b border-black '>
                {/* Title and User Name */}
                <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg'>
                  <div className='w-[96%] flex justify-between items-center'>
                      <div className=''>
                        <h1 className='font-bold text-xl'> Product List Page </h1>
                      </div>
                      <div className=''>
                            <h2 className='font-semibold text-xl'>User: Mark Chovava</h2>
                      </div>
                  </div>
                </div>
                {/* Search and Add */}
                <div className='w-full h-[15vh] flex items-end justify-center shadow-lg'>
                <div className='w-[100%] bg-white pt-4 pb-2 flex justify-center items-center pr-[0.5rem]'>
                  <div className='w-[96%] flex justify-between items-center'>
                      <form className='w-[40%]' onSubmit={(e) => {
                        e.preventDefault()
                        setIsSubmit(true)
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
                            <div className='py-2 px-2 hover:scale-125 cursor-pointer hover:text-blue-600'>
                            <BsChevronDoubleLeft />
                            </div>
                            <div className='py-2 px-2 font-semibold transition-all hover:scale-125 cursor-pointer hover:text-blue-600'>
                            1
                            </div>
                            <div className='py-2 px-2 font-semibold transition-all hover:scale-125 cursor-pointer hover:text-blue-600'>
                            2
                            </div>
                            <div className='py-2 px-2 transition-all hover:scale-125 cursor-pointer hover:text-blue-600'>
                            <BsChevronDoubleRight />
                            </div>
                        </div>
                        <Link to='/product/add' 
                            className='bg-blue-500 hover:bg-blue-600 duration py-2 px-3 rounded-md text-white'>
                            Add Product
                        </Link>
                      </div>
                  </div>
                </div>
                </div>
                {/* ProductMainContentTitle */}
                <div className='w-full h-[7vh] bg-white flex items-end justify-center pr-[0.5rem]'>
                  <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                      <div className='w-[30%] border-r border-slate-300 font-semibold px-3'>NAME</div>
                      <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>BARCODE</div>
                      <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>QUANTITY</div>
                      <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>UNIT PRICE</div>
                      <div className='w-[10%] font-semibold px-3'>ACTIONS </div>
                  </div>
                </div>
            </section>
            {/* Product List Table */}
            <section className='w-[89vw] h-[68vh] top-[32vh] text-black fixed overflow-y-auto scroll__width pb-8 '>
                {/* ProductMainContentBottomTable */}
                <div className='w-full flex flex-col items-center justify-center '>
                
                {/* Table Row */}
                { productState.products.map((product, i) => (
                    <div key={i.id} className='w-[96%] border border-slate-300 bg-white py-2 flex justify-center items-center'>
                        <div className='w-[30%] border-r border-slate-300 px-3'> 
                          {product.name}
                        </div>
                        <div className='w-[20%] border-r border-slate-300 px-3'>{product.barcode}</div>
                        <div className='w-[20%] border-r border-slate-300 px-3'>{product.quantity}</div>
                        <div className='w-[20%] border-r border-slate-300 px-3'>${(product.unit_price / 100).toFixed(2)}</div>
                        <div className='w-[10%] font-semibold flex justify-center items-center gap-3'>
                          <Link to={`/product/edit/${product.id}`}>
                            <AiFillEdit className='text-xl transition text-slate-800 hover:text-green-600 hover:scale-110'/> 
                          </Link>
                          <Link to={`/product/view/${product.id}`}>
                            <AiFillEye className='text-xl transition text-slate-800 hover:text-blue-600 hover:scale-110'/>
                          </Link>
                          <button 
                            onClick={() => {
                              setIsDelete(true)
                              setDeleteId(product.id) 
                            }}>
                            <AiFillDelete className='text-xl transition text-slate-800 hover:text-red-600 hover:scale-110'/>
                          </button>
                          
                        </div>
                    </div>
                ))}
                  
             
                </div>
            </section>
          </section>
          
        </div>
        <ToastContainer />
    </section>
  )
}

export default ListProduct