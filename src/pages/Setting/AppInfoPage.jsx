import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
/* NOTIFICATIONS */
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/*  */
import PosLeftContent from '../../components/PosLeftContent'
import { MainContextState } from '../../contexts/MainContextProvider'
import AxiosClient from '../../axios/axiosClient'
import LogoutBtn from '../../components/LogoutBtn';
import CurrentUser from '../../components/CurrentUser';

function AppInfoPage() {

  const {getToken, authUser } = MainContextState()
  /*  */
  const user_id = authUser?.id;
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [appInfo, setAppInfo] = useState({})

  const navigate = useNavigate();
  /* CHECK AUTHENTICATION */  
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`
  };
  useEffect(() => {
    if(!token){
      return navigate('/login');
    } 
  }
  , [token])
  

   /* ACCESS CONTROL */
   const accessLevel = parseInt(authUser?.access_level)
  /* AUTHENTICATION */
  useEffect(() => {
    if(accessLevel >= 3){
      return navigate('/settings', 
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
    /*  */
    async function getAppInfo() {
      try{
         const result = await AxiosClient.get('app-info/1/', {headers})
         .then((response) => {
          setAppInfo(() => response.data)  
          setName(() => response.data.name)
          setAddress(() => response.data.address)
          setPhoneNumber(() => response.data.phone_number)
          setEmail(() => response.data.email)
         })
      } catch (error) {
         console.error(`Error: ${error}`)
      }   
    }  
    getAppInfo()
  }, []);
  


   /* HANDLE PRODUCT */
  async function handleAppInfo(data) {
    //console.log(data)
    if( appInfo.id != null ){
      console.log('Update')
      console.log(data)
      try{
          const result = await AxiosClient.put(`app-info/1/`, data, {headers})
          .then((response) => {
              setAppInfo(response.data)  
              setName(appInfo?.name)
              setAddress(appInfo.address)
              setPhoneNumber(appInfo?.phone_number)
              setEmail(appInfo?.email)
            })
            .then(() => {
            navigate('/settings/app-info', 
                toast.success('Info Updated successfully', {
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
          console.log(`ERROR:`)
          console.error(`${error}`)
          console.error(`response data`)
          console.log(error.response.data);
          console.log(`Response status`);
          console.log(error.response.status);
          console.log('response headers');
          console.log(error.response.headers);
      }    
    } else {
      console.log('New Edit')
      console.log(data)
      try{
        const result = await AxiosClient.post(`app-info/`, data, {headers})
        .then((response) => {
            setAppInfo(response.data)  
            setName(appInfo?.name)
            setAddress(appInfo.address)
            setPhoneNumber(appInfo?.phoneNumber)
            setEmail(appInfo?.email)
          })
        .then(() => {
          navigate('/settings/app-info', 
              toast.success('Info Updated successfully', {
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
        console.log(`ERROR:`)
        console.error(`${error}`)
        console.error(`response data`)
        console.log(error.response.data);
        console.log(`Response status`);
        console.log(error.response.status);
        console.log('response headers');
        console.log(error.response.headers);
      }  
     
    }
  }


  return (
    <section className='bg-slate-100 h-auto w-full overflow-hidden'>
       <form 
       onSubmit={ (e) => { 
         e.preventDefault()
         handleAppInfo({
            name: name,
            email: email,
            address : address,
            phone_number : phoneNumber,
            user_id: user_id
         })  
       }}
       className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
         <PosLeftContent />
         <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
           {/* ProductHeader */}
           <section className='w-[90vw] h-[25vh] left-[10vw] bg-slate-100 fixed'>
             {/* Title and User Name */}
             <div className='w-full h-[10vh] bg-white border-b border-slate-400 flex items-center justify-center shadow-lg '>
               <div className='w-[96%] flex justify-between items-center pr-[1rem]'>
                   <div className=''>
                     <h1 className='font-bold text-xl'> Edit App Info Page </h1>
                   </div>
                   <div className='flex gap-2 items-center'>
                     <CurrentUser />
                     <LogoutBtn />
                   </div>
               </div>
             </div>
             {/* Title */}
             <div className='w-full h-[15vh]  shadow-lg flex justify-center items-end'>
               <div className='w-full h-[10vh] bg-white flex justify-center pr-[1rem]'>
                   <div className='w-[96%] flex justify-between items-end pb-2'>
                     <h1 className='text-4xl font-bold'>Edit App Info</h1>
                   </div>
               </div>    
             </div>
           </section>
           <section className='w-[90vw] top-[25vh] h-[75vh] fixed overflow-y-auto scroll__width py-3'>
             {/* ProductMainContentForm */}  
             <section className='w-[96%] h-auto mx-auto'>
               <div className='py-8'>
                 <div className='flex items-center justify-start mb-6'>
                   <label className='w-[25%] font-semibold text-slate-900'>
                     Name:
                   </label>
                   <input 
                     type='text'
                     name="name"
                     onChange={(e) => setName(e.target.value)}
                     value={name}
                     className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                   placeholder='Enter Name...'/>
                 </div>

                 <div className='flex items-center justify-start mb-6'>
                   <label className='w-[25%] font-semibold text-slate-900'>
                     Address:
                   </label>
                   <input 
                     type='text'
                     name="address"
                     onChange={(e) => setAddress(e.target.value)}
                     value={address}
                     className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                   placeholder='Enter Address...'/>
                 </div>
                 <div className='flex items-center justify-start mb-6'>
                   <label className='w-[25%] font-semibold text-slate-900'>
                     Phone Number:
                   </label>
                   <input 
                     type="text"
                     name="phone_number"
                     onChange={(e) => setPhoneNumber(e.target.value)}
                     value={phoneNumber}
                     className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                   placeholder='Enter Phone Number...'/>
                 </div>
                 <div className='flex items-center justify-start mb-6'>
                   <label className='w-[25%] font-semibold text-slate-900'>
                     Email:
                   </label>
                   <input 
                     type='email'
                     name="email"
                     onChange={(e) => setEmail(e.target.value)}
                     value={email}
                     className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                   placeholder='Enter Email...'/>
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
         
 
 
       </form>
       <ToastContainer />
     </section>
   )
}

export default AppInfoPage