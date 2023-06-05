import { BiBarcodeReader } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <section className='w-full h-[100vh] bg-gray-200 flex justify-center items-center'>
      <div className='w-[30vw] bg-white shadow-lg rounded-lg px-4 py-6'>
         <div className='flex items-center justify-content flex-col'>
            <BiBarcodeReader className='text-[4rem] text-center' />
            <span className='font-semibold text-xl'>POS 1</span>
         </div>  
         <form className='w-full h-auto'>
            <div className='my-3'>
               <h1 className='text-3xl font-bold text-center text-slate-700'>Login Here</h1>
            </div>
            <div className='my-3'>
               <label className='block font-semibold'>Email:</label>
               <input type='text'
               className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
               placeholder='Enter your email here...' />
            </div>
            <div className='my-3'>
               <label className='block font-semibold'>Password:</label>
               <input 
                  type='password' 
                  className='border border-slate-300 outline-none w-full px-2 py-2 rounded-md' 
                  placeholder='Enter your Password here...' />
            </div>
            <div className='mt-4 mb-3'>
               <button 
                  className='text-white text-center rounded-md py-2 w-[100%] bg-blue-500 hover:bg-blue-600'>
                     Login
               </button>
            </div>
            <div>
               <Link to='/' className='text-blue-500 underline'>Forgot Password?</Link>
               </div>
         </form> 
      </div>
    </section>
  )
}

export default Login