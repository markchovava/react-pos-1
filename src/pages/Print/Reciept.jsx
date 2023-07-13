import React, { useEffect, useState } from 'react'
import AxiosClient from '../../axios/axiosClient';
import { MainContextState } from '../../contexts/MainContextProvider';


function Reciept() {
  const {getToken, authUser} = MainContextState()
  const auth_id = authUser.id
  const [latest, setLatest] = useState({})
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`
  };

   /* FETCH ALL PRODUCTS */
   async function getLatest() {
    try{
       const result = await AxiosClient.get('sales/byuser/latest/?user_id=${auth_id}', {headers})
       .then((response) => {
            setLatest(response.data)
            console.log(response.data)  
        })
    } catch (error) {
       console.error(`Error: ${error}`)
       console.error(`Error: ${error.response}`)
    }   
  }
  /* SIDE EFFECTS */
  useEffect(() => {  
    getLatest()
  }, []);

  console.log(latest)
  return (
    <div>Reciept</div>
  )
}

export default Reciept