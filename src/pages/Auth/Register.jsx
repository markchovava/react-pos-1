import { useState } from 'react'
import { BiBarcodeReader } from 'react-icons/bi'
import { Link, useNavigate} from 'react-router-dom';
import AxiosClient from '../../axios/axiosClient'
/* Toast */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
   const navigate = useNavigate(); 
   const [userName, setUserName] = useState('')
   const [userNameErr, setUserNameErr] = useState('')
   const [firstName, setFirstName] = useState('')
   const [firstNameErr, setFirstNameErr] = useState('')
   const [lastName, setLastName] = useState('')
   const [lastNameErr, setLastNameErr] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [phoneNumberErr, setPhoneNumberErr] = useState('')
   const [email, setEmail] = useState('')
   const [emailErr, setEmailErr] = useState('')
   const [address, setAddress] = useState('')
   const [addressErr, setAddressErr] = useState('')
   const [password, setPassword] = useState('')
   const [passwordErr, setPasswordErr] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [confirmPasswordErr, setConfirmPasswordErr] = useState('')
    
 
   const handleValidation = () => {
      setUserNameErr(() => {
         if(userName == ''){ 
            return 'Username is required.' 
         } 
      })
      setFirstNameErr(() => {
         if(firstName == ''){ 
            return 'First name is required.' 
         } 
      })
      setLastNameErr(() => {
         if(lastName == '') {
            return 'Last name is required.'
         }})
      setPhoneNumberErr(() => {
         if(phoneNumber == ''){
            return 'Phone Number is required.';
         } 
      })
      setAddressErr(() => {
         if(address == ''){
            return 'Address is required.'
         } 
      })
      setEmailErr(() => {
         if(email == ''){
            return 'Email is required.' 
         } 
      })
      setPasswordErr(() => { 
         if(password == '') { 
            return 'Password is required.'
         } 
      })
      setConfirmPasswordErr(() => {
         if(password != confirmPassword){
            return 'Password is do not match.'
         }
      })
   }

    /* REGISTRATION */
 async function handleRegistration(obj) {
   try{
       const result = await AxiosClient.post(`auth/users/`, obj)
       .then((response) => {
             console.log(response)
             console.log(response.data)
             navigate('/login', 
                  toast.success('User Registered Successfully', {
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
      // Error handling
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      setUserNameErr(() => error.response.data?.username)
      setFirstNameErr(() => error.response.data?.first_name)
      setLastName(() => error.response.data?.last_name)
      setAddressErr(() => error.response.data?.address)
      setPhoneNumberErr(() => error.response.data?.phone_number)
      setEmailErr(() => error.response.data?.email)
      setPasswordErr(() => error.response.data?.password)
   }   
 }

 const handleSubmit = (e) => {
   handleValidation()
   if(userName != '' && firstName != '' && lastName != '' && phoneNumber != '' && address != '' && email != '' && password != '' && confirmPassword == password){
      const user = {
         username: userName,
         first_name: firstName,
         last_name: lastName,
         phone_number: phoneNumber,
         email: email,
         password: password,
         code: password, // password visible
         confirm_password: confirmPassword,
         access_level: 4
      }

      handleRegistration(user)
      console.log('Passed')
      //console.log(user)
   } else{
      console.log('Fix Errors.')
   }
   e.preventDefault()  
 }




   
  return (
   <div className='w-full h-auto bg-gray-200 py-[2.5rem]'>
      <section className='w-full h-auto flex justify-center items-center overflow-hidden'>
         <div className='w-[30vw] bg-white shadow-lg rounded-lg px-4 py-6'>
            <div className='flex items-center justify-content flex-col'>
               <BiBarcodeReader className='text-[4rem] text-center' />
               <span className='font-semibold text-xl'>POS 1</span>
            </div>  
            <form 
               onSubmit={handleSubmit}
               className='w-full h-auto'>
               <div className='my-3'>
                  <h1 className='text-3xl font-bold text-center text-slate-700'>Register Here</h1>
               </div>
               {/*  */}
               <div className='my-3'>
                  <label className='block font-semibold'>Username:</label>
                  <input 
                     type='text'
                     name='user_name'
                     onChange={(e) => {
                        setUserName(e.target.value)
                     }}
                     value={userName}
                     className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
                     placeholder='Enter your First Name here...' 
                  />
                  <small className='text-[#f00]'>{userNameErr}</small>
               </div>
               {/*  */}
               <div className='my-3'>
                  <label className='block font-semibold'>First Name:</label>
                  <input 
                     type='text'
                     name='first_name'
                     onChange={(e) => {
                        setFirstName(e.target.value)
                     }}
                     value={firstName}
                     className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
                     placeholder='Enter your First Name here...' 
                  />
                  <small className='text-[#f00]'>{firstNameErr}</small>
               </div>
               {/*  */}
               <div className='my-3'>
                  <label className='block font-semibold'>Last Name:</label>
                  <input 
                     type='text'
                     name='last_name'
                     onChange={(e) => {
                        setLastName(e.target.value)
                     }}
                     value={lastName}
                     className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
                     placeholder='Enter your Last Name here...'    
                  />
                  <small className='text-[#f00]'>{lastNameErr}</small>
               </div>
               {/*  */}
               <div className='my-3'>
                  <label className='block font-semibold'>Phone Number:</label>
                  <input 
                     type='text'
                     name='phone_number'
                     onChange={(e) => {
                        setPhoneNumber(e.target.value)
                     }}
                     value={phoneNumber}
                     className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
                     placeholder='Enter your Phone Number here...' 
                  />
                  <small className='text-[#f00]'>{phoneNumberErr}</small>
               </div>
               <div className='my-3'>
                  <label className='block font-semibold'>Address:</label>
                  <input 
                     type='text'
                     name='address'
                     onChange={(e) => {
                        setAddress(e.target.value)
                     }}
                     value={address}
                     className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
                     placeholder='Enter your Address here...'   
                  />
                   <small className='text-[#f00]'>{addressErr}</small>
               </div>
               <div className='my-3'>
                  <label className='block font-semibold'>Email:</label>
                  <input 
                     type='email'
                     name='email'
                     onChange={(e) => {
                        setEmail(e.target.value)
                     }}
                     value={email}
                     className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
                     placeholder='Enter your email here...'
                  />
                  <small className='text-[#f00]'>{emailErr}</small>
               </div>
               <div className='my-3'>
                  <label className='block font-semibold'>Password:</label>
                  <input 
                     type='password' 
                     name='password'
                     onChange={(e) => {
                        setPassword(e.target.value)
                     }}
                     value={password}
                     className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
                     placeholder='Enter your Password here...' 
                  />
                  <small className='text-[#f00]'>{passwordErr}</small>
               </div>
               <div className='my-3'>
                  <label className='block font-semibold'>Confirm Password:</label>
                  <input 
                     type='password' 
                     name='confirm_password'
                     onChange={(e) => {
                        setConfirmPassword(e.target.value)
                     }}
                     value={confirmPassword}
                     className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
                     placeholder='Enter your Password Confirmation here...' 
                  />
                  <small className='text-[#f00]'>{confirmPasswordErr}</small>
               </div>
               <div className='mt-4 mb-3'>
                  <button 
                     className='text-white text-center rounded-md py-2 w-[100%] bg-blue-500 hover:bg-blue-600'>
                        Register
                  </button>
               </div>
               <div>
                  <Link to='/login' className='text-blue-500 underline'>Already Registered?</Link>
                  </div>
            </form> 
         </div>
      </section>
   </div>
  )
}

export default Register