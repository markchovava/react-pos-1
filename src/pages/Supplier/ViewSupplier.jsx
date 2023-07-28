import React, { useEffect, useState } from 'react'
import AxiosClient from '../../axios/axiosClient';
import PosLeftContent from '../../components/PosLeftContent'
import { MainContextState } from '../../contexts/MainContextProvider';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LogoutBtn from '../../components/LogoutBtn';
import CurrentUser from '../../components/CurrentUser';


function ViewSupplier() {
    const { id } = useParams()
    const { getToken, authUser } = MainContextState()
    const [supplier, setSupplier] = useState({})
    const [name , setname] = useState('')
    const [ email, setemail] = useState('')
    const [ phoneNumber, setphoneNumber] = useState('')
    const [ address, setaddress] = useState('')
    const [ supplierNo, setSupplierNo] = useState('')
    const [isSubmit, seIsSubmit] = useState(false)
    const navigate = useNavigate();
    const token = getToken();
    useEffect(()=>{
        if(!token){
            return navigate('/login');
        }
    },[token])
    /* --------------------- ACCESS CONTROL --------------------- */
    const access_Level = parseInt(authUser?.access_level)
    /* --------------------- GET SINGLE SUPPLIER --------------------- */
    const getSupplier = async () => {
        try{
        const result = await AxiosClient.get(`supplier/${parseInt(id)}/`)
        .then((response) => {
            setname(() => response.data.name)
            setemail(() => response.data.email)
            setphoneNumber(() => response.data.phone_number)
            setaddress(() => response.data.address)
            setSupplierNo(() => response.data.supplier_ref)
        })
        } catch (error) {
            console.error(`Error: ${error}`)
            // Error handling
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }   
    }    
    useEffect(() => {
        if(access_Level >= 3){
        return navigate('/supplier', 
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
        getSupplier()
    }, [])
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
    };

   




   return (
  
      <section className='bg-slate-100 h-auto w-full overflow-hidden'>
      <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
        <PosLeftContent />
        
        <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
         {/* SupplierHeader */}
         <section className='w-[90vw] h-[25vh] left-[10vw] bg-slate-100 fixed'>
            {/* Title and User Name */}
            <div className='w-full h-[10vh] bg-white border-b border-slate-400 flex items-center justify-center shadow-lg pr-[1rem]'>
               <div className='w-[96%] flex justify-between items-center'>
                  <div className=''>
                     <h1 className='font-bold text-xl'> Supplier Details Page</h1>
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
                     <h1 className='text-4xl font-bold'> Supplier Details </h1>
                     <Link to='/supplier' className='px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>
                        View All
                     </Link>
                  </div>
               </div>    
            </div>
         </section>
         {/* SupplierDetails */}
         <section className='w-[90vw] h-[75vh] top-[25vh] left-[10vw] border-t border-slate-200 bg-white fixed overflow-y-auto scroll__width pb-8'>
            <div className='w-[96%] h-auto mx-auto'>
               <div className='py-8'>
                  <div className='flex items-center justify-start mb-7'>
                     <label className='w-[20%] font-semibold text-slate-900'>Name:</label>
                     <div className='text-lg rounded-md outline-none px-3 w-[70%]'>
                        { name ? name : 'No Added.' }
                     </div>
                  </div>
                  <div className='flex items-center justify-start mb-7'>
                     <label className='w-[20%] font-semibold text-slate-900'>Bar Code:</label>
                     <div className='text-lg rounded-md outline-none px-3 w-[70%]'>
                        { email ? email : 'No Added.' }
                     </div>
                  </div>
                  <div className='flex items-center justify-start mb-7'>
                     <label className='w-[20%] font-semibold text-slate-900'>Phone Number:</label>
                     <div className='text-lg rounded-md outline-none px-3 w-[70%]'>
                        { phoneNumber ? phoneNumber : 'Not Added.' }
                     </div>
                  </div>
                  <div className='flex items-center justify-start mb-7'>
                     <label className='w-[20%] font-semibold text-slate-900'> Address: </label>
                     <div className='text-lg rounded-md outline-none px-3 w-[70%]'>
                        { address ? address : 'Not Added' }
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

export default ViewSupplier