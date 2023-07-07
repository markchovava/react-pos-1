import { useEffect, useState } from 'react'
import { MainContextState } from '../contexts/MainContextProvider';
import AxiosClient from '../axios/axiosClient';
import { Link } from 'react-router-dom';

function CurrentUser() {
  const { getToken, authUser, setAuthUser } = MainContextState()
  /* CHECK AUTHENTICATION */
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`
  };
   /* GET CURRENT USER */
   useEffect(() => { 
    async function getCurrentUser() {
      try{
        const result = await AxiosClient.get(`auth/users/me/`, { headers })
        .then((response) => {
          setAuthUser(response.data)
          console.log(response.data)
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
    }    
    getCurrentUser()
  }, []); 

  const firstName = authUser?.first_name ? authUser?.first_name : 'FirstName'
  const lastName = authUser?.last_name ? authUser?.last_name : 'LastName'
  const fullName = ` ${firstName} ${lastName} `;
  return (
    <div>
      <h2 className='font-semibold text-xl'>
        User: 
        <Link 
          className='text-green-700'
          to='/profile'>
          {authUser ? fullName : `User` }
        </Link>
      </h2>
    </div>
  )
}

export default CurrentUser