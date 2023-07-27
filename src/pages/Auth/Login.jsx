import { useEffect, useReducer, useState } from 'react';
import { BiBarcodeReader } from 'react-icons/bi'
import { Link, useNavigate} from 'react-router-dom';
import AxiosClient from '../../axios/axiosClient';
import { ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainContextState } from '../../contexts/MainContextProvider';
import Loading from '../../components/Loading';



function Login() {
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate();
   const { setToken, removeToken } = MainContextState()
   const [userName, setUserName] = useState('')
   const [userNameErr, setUserNameErr] = useState('')
   const [password, setPassword] = useState('')
   const [passwordErr, setPasswordErr] = useState('')
   const [errorMessage, setErrorMessage] = useState('')

   useEffect(() => {
      removeToken()
      setLoading(true)
   }, [])


   const handleValidation = () => {
      setUserNameErr(() => {
         if(userName == ''){ 
            return 'Username is required.' 
         } 
      })
      setPasswordErr(() => { 
         if(password == '') { 
            return 'Password is required.'
         } 
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault() 
      handleValidation();
      if(userName != '' && password != ''){
         const user = {
            username: userName,
            password: password,
         }
         handleLogin(user)
         // console.log(user)
      }
   }

   /* Login */
   const handleLogin = async (obj) => {
      //console.log(obj)
      setLoading(false)
      try{
         const result = await AxiosClient.post(`auth/jwt/create/`, obj)
         .then((response) => {
               console.log(response)
               console.log(response.data.access)
               setToken(response.data.access)    
               navigate('/pos', 
                  toast.success('User login Successfully', {
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
               setLoading(true)
            })
      } catch (error) {
         // Error handling
         // console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
         setUserNameErr(() => error.response.data?.username)
         setPasswordErr(() => error.response.data?.password)
         setErrorMessage(() => error.response.data?.detail)
      }   
   }
  return ( 
  <>
  { loading == false ?
   <Loading />
   :
   <div className='w-full min-h-auto bg-gray-200 py-[2rem]'>
      <section className='w-full h-[100vh] bg-gray-200 flex justify-center items-center'>
         <div className='w-[30vw] bg-white shadow-lg rounded-lg px-4 py-6'>
            <div className='flex items-center justify-content flex-col'>
               <BiBarcodeReader className='text-[4rem] text-center' />
               <span className='font-semibold text-xl'>POS 1</span>
            </div>  
            <form className='w-full h-auto' onSubmit={handleSubmit}>
               <div className='my-3'>
                  <h1 className='text-3xl font-bold text-center text-slate-700'>Login Here</h1>
               </div>
               <div>
                  <span className='text-[#f00]'>{errorMessage}</span>
               </div>
               <div className='my-3'>
                  <label className='block font-semibold'>Username:</label>
                  <input type='text'
                     name='username'
                     onChange={(e) => {
                           setUserName(e.target.value)
                        }}
                     value={userName}
                     className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
                     placeholder='Enter your email here...' 
                  />
                  <small className='text-[#f00]'>{userNameErr}</small>
               </div>
               <div className='my-3'>
                  <label className='block font-semibold'>Password:</label>
                  <input 
                     type='password' 
                     onChange={(e) => {
                           setPassword(e.target.value)
                        }}
                     value={password}
                     className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
                     placeholder='Enter your Password here...' />
                  <small className='text-[#f00]'>{passwordErr}</small>
               </div>
               <div className='mt-4 mb-3'>
                  <button 
                     className='text-white text-center rounded-md py-2 w-[100%] bg-blue-500 hover:bg-blue-600'>
                        Login
                  </button>
               </div>
               {/* <div>
                  <Link to='/register' className='text-blue-500 underline'>New Here?</Link>
               </div> */}
            </form> 
         </div>
         <ToastContainer />
      </section>
   </div>
  }
  </>
   
  )
}

export default Login