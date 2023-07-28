import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEdit, AiFillEye, AiFillDelete } from 'react-icons/ai'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import PosLeftContent from '../../components/PosLeftContent'
import CurrentUser from '../../components/CurrentUser'
import LogoutBtn from '../../components/LogoutBtn'
import { MainContextState } from '../../contexts/MainContextProvider'
import AxiosClient from '../../axios/axiosClient'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function ListSupplier() {
    const baseURL = 'supplier/'
    const {getToken, supplierState, supplierDispatch, authUser} = MainContextState()
    const [supplier, setSupplier] = useState({})
    const navigate = useNavigate();
    const token = getToken();
    useEffect(()=>{
       if(!token){
          return navigate('/login');
       }
    },[token])
 
      /* ACCESS CONTROL */
      const access_Level = parseInt(authUser?.access_level)
      useEffect(() => {
         if(access_Level >= 3){
           return navigate('/pos', 
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
 
    const searchRef = useRef(null)
    const [searchName, setSearchName] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
 
     /* PAGINATION */
   const [nextURL, setNextURL] = useState()
   const [prevURL, setPrevURL] = useState()
 
   async function paginationHandler(url) {
      try{
         const result = await axios.get(url)
         .then((response) => {
            setSupplier(() => response.data)
           supplierDispatch({
             type: 'FETCH_SUPPLIERS',
             payload: response.data.results,
           }) 
            setPrevURL(response.data.previous)
            setNextURL(response.data.next)
         })
      } catch (error) {
         console.error(`Error: ${error}`)
      }     
   }
   /* END OF PAGINATION LOGIC */
 
   /* --------------------- FETCH ALL SUPPLIERS --------------------- */
   const fetchSuppliers = async () => {
    try{
       const result = await AxiosClient.get(baseURL)
       .then((response) => {
          setSupplier(() => response.data)
          setPrevURL(() => response.data.previous)
          setNextURL(() => response.data.next)
        })
    } catch (error) {
       console.error(`Error: ${error}`)
    }   
   }

  /* --------------------- DELETE BY ID --------------------- */
  const handleDelete = async () => {
    let a = confirm(`Are you sure?`)
    if( a ){
      const result = await AxiosClient.delete(`supplier/${deleteId}`)
      .then((response) => {
        fetchSuppliers()
      })
      .then(() => {
        alert('Deleted successful...')   
      })
    }
}
 /* --------------------- SIDE EFFECTS --------------------- */
   useEffect(() => {     
      fetchSuppliers()
   }, []);
  /* --------------------- SIDE EFFECTS --------------------- */
  useEffect( () => {
    if(isDelete == true){
      handleDelete()
      setIsDelete(false)
      setDeleteId(null) 
    }
  }, [deleteId])
 
  const handleSearch = async () => {
    // console.log(searchName)
    const result = await AxiosClient.get(`supplier/?search=${searchName}`)
      .then((response) => {
        setSupplier(() => response.data)
        setPrevURL(response.data.previous)
        setNextURL(response.data.next)
        setIsSubmit(false)
      })   
  }
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
                <section className='w-[89vw] h-[32vh] fixed border-b border-black '>
                    {/* Page Title and Username */}
                    <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg pr-[0.5rem]'>
                    <div className='w-[96%] flex justify-between items-center'>
                        <div className=''>
                            <h1 className='font-bold text-xl'> Supplier List Page </h1>
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
                            placeholder='Search Supplier...' 
                            className='w-full rounded-md px-3 py-2 text-slate-500 border border-slate-300 outline-none'/>
                        </form>
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
                            <Link to='/supplier/add' 
                                className='bg-blue-500 hover:bg-blue-600 duration py-2 px-3 rounded-md text-white'>
                                Add Supplier
                            </Link>
                        </div>
                    </div>
                    </div>
                    </div>
                    {/* ListStockTableTitle */}
                    <div className='w-full h-[7vh] bg-white flex items-end justify-center pr-[0.5rem]'>
                    <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                        <div className='w-[30%] border-r border-slate-300 font-semibold px-3'>NAME </div>
                        <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>REF </div>
                        <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>PHONE NUMBER </div>
                        <div className='w-[20%] border-r border-slate-300 font-semibold px-3'>AUTHOR </div>
                        <div className='w-[10%] font-semibold px-3'>ACTIONS </div>
                    </div>
                    </div>
                </section>
                <section className='w-[89vw] h-[68vh] top-[32vh] text-black fixed overflow-y-auto scroll__width pb-8 '>
                    {/* ListStockTable */}
                    <div className='w-full bg-white flex flex-col items-center justify-center text-md'>
                    {/* Table Row */}
                    {supplier.results &&
                        supplier.results.map((item) => (
                            item.id != authUser.id ?
                            (<div key={item.id} 
                                className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                                
                                <div className='w-[30%] border-r border-slate-300 px-3'>
                                {item.name ? item.name : ''} 
                                </div>

                                <div className='w-[20%] border-r border-slate-300 px-3'>
                                    {item.supplier_ref ? item.supplier_ref : 'Not Provided'}
                                </div>
                                <div className='w-[20%] border-r border-slate-300 px-3'>
                                    {item.phone_number ? item.phone_number : 'Not Provided'}
                                </div>

                                <div className='w-[20%] border-r border-slate-300 px-3'>
                                    {item.user ? (item.user.first_name + ' ' +  item.user.last_name) : 'Not Provided'}
                                </div>

                                <div className='w-[10%] font-semibold px-3'> 
                                <div className='flex justify-center items-center gap-2'>
                                    <Link to={`/supplier/edit/${item.id}`}>
                                        <AiFillEdit className='text-xl transition text-slate-500 hover:text-green-600 hover:scale-110' /> 
                                    </Link>
                                    <Link to={`/supplier/view/${item.id}`}>
                                        <AiFillEye className='text-xl transition text-slate-500 hover:text-blue-600 hover:scale-110'/>
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            setIsDelete(true)
                                            setDeleteId(item.id) 
                                        }}>
                                        <AiFillDelete className='text-xl transition text-slate-500 hover:text-red-600 hover:scale-110'/>
                                    </button>
                                </div>
                                </div>
                            </div>)
                            : ''    
                        ))
                    }
                    
                    </div>
                
                
                </section>
            </section>
            <ToastContainer />
        </div>
    </section>
  )
}

export default ListSupplier