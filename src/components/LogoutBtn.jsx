import { useState, useEffect } from 'react'
import { MainContextState } from '../contexts/MainContextProvider'
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const {removeToken} = MainContextState()
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false)
  useEffect(() => {
    if(isLogout){
        removeToken()
        return navigate('/login');
    }
  }, [isLogout])
 
  

  return (
  <div>
    <button 
    onClick={() => setIsLogout(true)}
    className='text-white bg-red-600 hover:bg-red-700 transition rounded py-1 px-2'>
      Logout
    </button>
  </div>
  )
}

export default LogoutBtn