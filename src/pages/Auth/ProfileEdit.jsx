import { useEffect, useState, useRef } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import PosLeftContent from '../../components/PosLeftContent'
import AxiosClient from '../../axios/axiosClient';
import { MainContextState } from '../../contexts/MainContextProvider';
import { Link, useNavigate } from 'react-router-dom';
/* Toast */
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutBtn from '../../components/LogoutBtn';
import CurrentUser from '../../components/CurrentUser';

function ProfileEdit() {
  const navigate = useNavigate();
  const { getToken, authUser, setAuthUser, } = MainContextState()
  /* CHECK AUTHENTICATION */
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
  console.log(token)

  const [ username, setUsername] = useState('')
  const [ firstName, setFirstName] = useState('')
  const [ lastName, setLastName] = useState('')
  const [ email, setEmail] = useState('')
  const [ phoneNumber, setPhoneNumber] = useState('')
  const [ address, setAddress] = useState('')
  const [ accessLevel, setAccessLevel] = useState(0)
  const [ code, setCode] = useState('')
  const [ userId, setUserId] = useState(0)
  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true) 
  }
  /* GET CURRENT USER */
  useEffect(() => { 
    function getCurrentUser() {
      setUsername(() => authUser.username)
      setFirstName(() => authUser.first_name)
      setLastName(() => authUser.last_name)
      setEmail(() => authUser.email)
      setPhoneNumber(() => authUser.phone_number)
      setAddress(() => authUser.address)
      setAccessLevel(() => authUser.access_level)
      setCode( authUser.code)
      setUserId(() => authUser.id)   
      //console.log('user')
      //console.log(authUser)
    }    
    getCurrentUser()
  }, []); 
  /* GET CURRENT USER */
  /* useEffect(() => { 
    async function getCurrentUser() {
      try{
        const result = await AxiosClient.get(`auth/users/me/`, { headers })
        .then((response) => {
          console.log(response.data)
          setUsername(response.data.username)
          setFirstName(response.data.first_name)
          setLastName(response.data.last_name)
          setEmail(response.data.email)
          setPhoneNumber(response.data.phone_number)
          setAddress(response.data.address)
          setAccessLevel(response.data.access_level)
          setCode(response.data.code)
          setUserId(response.data.id)
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
    }    
    getCurrentUser()
  }, []);  */

  useEffect(() => {
    const user = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      address: address,
      // No seen by user
      access_level: accessLevel,
      code: code,
      id: userId
    }
    if(isSubmit){
      updateUser(user)
    }
  }, [isSubmit])


  const updateUser = async (obj) => {
    try{
      const result = await AxiosClient.put(`auth/users/me/`, obj, { headers })
      .then((response) => {
        console.log(response.data)
        setIsSubmit(() => false) 
        navigate('/profile', 
            toast.success('Profile updated successfully', {
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
      setIsSubmit(() => false) 
      console.error(`Error: ${error}`)
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
  
  
  return (
    <section className='bg-slate-100 h-auto w-full overflow-hidden'>
      <form 
      onSubmit={handleSubmit}
      className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
        <PosLeftContent />
        <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
          {/* ProductHeader */}
          <section className='w-[90vw] h-[25vh] left-[10vw] bg-slate-100 fixed'>
            {/* Title and User Name */}
            <div className='w-full h-[10vh] bg-white border-b border-slate-400 flex items-center justify-center shadow-lg pr-[1rem]'>
              <div className='w-[96%] flex justify-between items-center'>
                  <div className=''>
                    <h1 className='font-bold text-xl'> Edit Profile Page </h1>
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
                    <h1 className='text-4xl font-bold'>Edit Profile</h1>
                    {/* <Link to='/'>
                      <button className='px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>
                        View All
                      </button>
                    </Link> */}
                  </div>
              </div>    
            </div>
          </section>
          <section className='w-[90vw] top-[25vh] h-[75vh] fixed overflow-y-auto scroll__width py-3'>
            {/* ProductMainContentForm */}  
            <section className='w-[96%] h-auto mx-auto'>
              <div className='py-8'>
                <div className='flex items-center justify-start mb-6'>
                  <label className='w-[25%] font-semibold text-slate-900'>User Name:</label>
                  <input type="text" 
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username ? username : ''}
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Enter Username...'/>
                </div>
                <div className='flex items-center justify-start mb-6'>
                  <label className='w-[25%] font-semibold text-slate-900'>
                    Full Name:
                  </label>
                  <input 
                  name='first_name'
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName ? firstName : ''}
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[34%]' 
                  placeholder='Enter First Name...'/>
                  <input 
                  type='text'
                  name='last_name'
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName ? lastName : ''}
                  className='border border-slate-400 rounded-md outline-none ml-[2%] py-2 px-3 w-[34%]' 
                  placeholder='Enter Last Name...'/>
                </div>
                <div className='flex items-center justify-start mb-6'>
                  <label className='w-[25%] font-semibold text-slate-900'>
                    Email:
                  </label>
                  <input 
                  type="email" 
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email ? email : ''}
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Enter Email here...'/>
                </div>
                <div className='flex items-center justify-start mb-6'>
                  <label className='w-[25%] font-semibold text-slate-900'>
                    Phone Number:
                  </label>
                  <input 
                  type="text" 
                  name='phone_number'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber ? phoneNumber : ''}
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Enter Phone Number Here...'/>
                </div>
                <div className='flex items-center justify-start mb-6'>
                  <label className='w-[25%] font-semibold text-slate-900'>
                    Address:
                  </label>
                  <input type="text" 
                  name='address'
                  onChange={(e) => setAddress(e.target.value)}
                  value={address ? address : ''}
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Enter Address Here...'/>
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

export default ProfileEdit