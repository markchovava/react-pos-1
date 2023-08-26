import { useEffect, useState } from 'react'
import PosLeftContent from '../../components/PosLeftContent'
import AxiosClient from '../../axios/axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainContextState } from '../../contexts/MainContextProvider'
import LogoutBtn from '../../components/LogoutBtn';
import CurrentUser from '../../components/CurrentUser';


function EditSupplier() {
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

   const handleSubmit = (e) => {
      e.preventDefault()
      if(name != '', address != '', email != '', phoneNumber != '' ){
         setSupplier({
            name: name,
            email: email,
            phone_number: phoneNumber,
            address: address,
            supplier_ref: supplierNo,
            user_id: authUser.id,
         })
         seIsSubmit(() => true)
         console.log(supplier)
      } else {
         alert('Please fill out all input fields.')
      }
   }

   /* --------------------- UPDATE SUPPLIER --------------------- */
   const updateSupplier = async (obj) => {
    try{
       if(isSubmit == true){
          const result = await AxiosClient.put(`supplier/${parseInt(id)}/`, obj, {headers})
          .then((response) => {
            console.log(response.data)
            seIsSubmit(() => false)
          })
          .then(() => {
             navigate('/supplier', 
                toast.success('User Updated successfully', {
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
       }
       
       } catch (error) {
       console.error(`Error: ${error}`)
       // Error handling
       console.log(error.response.data);
       console.log(error.response.status);
       console.log(error.response.headers);
       }   
    }

    /* --------------------- SIDE EFFECTS --------------------- */
   useEffect(() => {  
      if(isSubmit == true){
        updateSupplier(supplier)
      }
   }, [isSubmit])




  return (
   <section className='bg-slate-100 h-auto w-full overflow-hidden'>
      <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
         <PosLeftContent />
         <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
            {/*  */}
            <section className='w-[89vw] h-[25vh] fixed border-b border-black '>
               {/* Title and User Name */}
               <div className='w-full h-[10vh] bg-white border-b border-slate-400 flex items-center justify-center shadow-lg pr-[1rem]'>
                  <div className='w-[96%] flex justify-between items-center'>
                     <div className=''>
                        <h1 className='font-bold text-lg'> 
                           <Link 
                              to='/supplier'
                              className='text-blue-800 hover:text-black'>
                                 Supplier List
                           </Link> / <span className=''>Edit Supplier</span>
                        </h1>
                     </div>
                     <div className='flex gap-2 items-center'>
                      <CurrentUser />
                      <LogoutBtn />
                    </div>
                  </div>
               </div>
               {/* Title */}
               <div className='w-full h-[15vh] shadow-lg flex justify-center items-end'>
                  <div className='w-full h-[10vh] bg-white flex justify-center'>
                     <div className='w-[96%] flex justify-between items-end pb-3 pr-[0.5rem]'>
                        <h1 className='text-4xl font-bold'> Edit Supplier </h1>
                        <Link to='/supplier'>
                           <button className='px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>
                           View All
                           </button>
                        </Link>
                     </div>
                  </div>    
               </div> 
            </section>

            <section className='w-[89vw] h-[68vh] top-[25vh] border-t border-slate-300 bg-white text-black fixed overflow-y-auto scroll__width pb-8 '>
               <div className='flex items-center justify-center'>
                  <form 
                     onSubmit={handleSubmit}
                     className='w-[96%] py-6'>
                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Name:
                        </label>
                        <input 
                           type="text"
                           onChange={(e) => setname(() => e.target.value)}
                           value={name}
                           className='border border-slate-300 rounded-md outline-none py-2 px-3 w-[70%]' 
                           placeholder='Enter name here...'/>
                     </div>           

                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Phone Number:
                        </label>
                        <input 
                           type="text"
                           onChange={(e) => setphoneNumber(() => e.target.value)}
                           value={phoneNumber}
                           className='border border-slate-300 rounded-md outline-none py-2 px-3 w-[70%]' 
                           placeholder='Enter Phone number here...'/>
                     </div> 

                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Email:
                        </label>
                        <input 
                           type="email"
                           onChange={(e) => setemail(() => e.target.value)}
                           value={email}
                           className='border border-slate-300 rounded-md outline-none py-2 px-3 w-[70%]' 
                           placeholder='Enter Email here...'/>
                     </div> 

                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Address:
                        </label>
                        <input type="text"
                           onChange={(e) => setaddress(() => e.target.value)}
                           value={address}
                           className='border border-slate-300 rounded-md outline-none py-2 px-3 w-[70%]' 
                           placeholder='Enter Address here...'/>
                     </div>  
                   
                     <div className='flex items-center justify-start mb-6'>
                        <button type='submit'
                           className='ml-[25%] bg-blue-500 hover:bg-blue-600 transition-all text-white text-center rounded-md outline-none py-3 w-[70%]'>
                           Submit
                        </button>
                     </div>  
                  </form>
               </div>
            </section>
         </section>

      </div>
   </section>
  )
}

export default EditSupplier