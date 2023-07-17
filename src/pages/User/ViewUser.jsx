import { useEffect, useState } from 'react'
import PosLeftContent from '../../components/PosLeftContent'
import AxiosClient from '../../axios/axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainContextState } from '../../contexts/MainContextProvider'
import CurrentUser from '../../components/CurrentUser';
import LogoutBtn from '../../components/LogoutBtn';


function ViewUser() {
   const { userDispatch, getToken, authUser } = MainContextState()
   const navigate = useNavigate();
   const { id } = useParams()
   const viewId = id;
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
   const [userName , setuserName] = useState('')
   const [ firstName, setfirstName] = useState('')
   const [ lastName, setlastName] = useState('')
   const [ email, setemail] = useState('')
   const [ phoneNumber, setphoneNumber] = useState('')
   const [ address, setaddress] = useState('')
   const [ accessLevel, setaccessLevel] = useState('')
   //const [ password, setpassword] = useState('')
   const [ code, setcode] = useState('')
   const [user, setUser] = useState()
   const [isSubmit, seIsSubmit] = useState(false)

    /* GET USER */
    useEffect(() => {
      const getUser = async () => {
        try{
          const result = await AxiosClient.get(`users/${viewId}`, { headers })
          .then((response) => {
              //console.log(response.data)
              setuserName(() => response.data?.username)
              setfirstName(() =>response.data?.first_name)
              setlastName(() => response.data?.last_name)
              setemail(() => response.data?.email)
              setphoneNumber(() => response.data?.phone_number)
              setaddress(() => response.data?.address)
              setaccessLevel(() => response.data?.access_level)
              setcode(() => response.data?.code)
          })
        } catch (error) {
          console.error(`Error: ${error}`)
          // Error handling
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }  
      }
      getUser()
    }, [])


   





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
                        <h1 className='font-bold text-xl'> View User Page </h1>
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
                        <h1 className='text-4xl font-bold'> View User </h1>
                        <Link to='/user'>
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
                  <div
                     className='w-[96%] py-6'>
                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Username:
                        </label>
                        <div className='w-[70%] text-lg'>
                        {userName}
                        </div>
                        
                     </div>
                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Full Name
                        </label>
                        <div className='w-[70%] text-lg'>
                           {firstName} {lastName}
                        </div>
                     </div>  
                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Email:
                        </label>
                        <div className='w-[70%] text-lg'>
                           {email}
                        </div> 
                     </div>  
                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Phone Number:
                        </label>
                        <div className='w-[70%] text-lg'>
                           {phoneNumber}
                        </div>
                     </div>  
                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Address:
                        </label>
                        <div className='w-[70%] text-lg'>
                           {address}
                        </div>
                     </div>  
                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Access Level:
                        </label>
                        <div className='w-[70%] text-lg'>
                           {parseInt(accessLevel) == 4 && 'Operator'}
                           {parseInt(accessLevel) == 3 && 'Manager'}
                           {parseInt(accessLevel) == 2 && 'Admin'}
                           {parseInt(accessLevel) == 1 && 'Super Admin' } 
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

export default ViewUser