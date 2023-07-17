import React, { useState, useEffect }  from 'react'
import { MainContextState } from '../../../contexts/MainContextProvider';
import AxiosClient from '../../../axios/axiosClient';
import Loading from '../../../components/Loading';




const ReceiptMain = React.forwardRef((props,  ref) => {
  const [loading, setLoading] = useState(false)
  const {getToken, authUser} = MainContextState()
  const auth_id = authUser?.id
  const receiptURL = `sales/byuser/latest/?user_id=${auth_id}`
  console.log(receiptURL)
  const [latest, setLatest] = useState({})
  const [appInfo, setAppInfo] = useState({})
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`
  };
     /* FETCH Latest */
    async function getLatest() {
      try{
         const result = await AxiosClient.get(receiptURL, {headers})
         .then((response) => {
              setLatest(response.data)
              console.log(response.data)  
          })
      } catch (error) {
         console.error(`Error: ${error}`)
         console.error(`Error: ${error.response}`)
      }   
    }


     async function getAppInfo() {
      try{
         const result = await AxiosClient.get('app-info', {headers})
         .then((response) => {
              setAppInfo(response.data[0])
              console.log(response.data[0])  
          })
      } catch (error) {
         console.error(`Error: ${error}`)
         console.error(`Error: ${error.response}`)
      }   
    }
    /* SIDE EFFECTS */
    useEffect(() => {  
      getLatest()
      getAppInfo()
      setLoading(true)

    }, []);
  
  console.log(latest)
  //console.log(receiptData.quantity_total)
  const receiptData = latest[0];
  const receiptItems = receiptData?.sales_items;
  return (
    <>
    {loading == false ? 
      <Loading />
    :
      <div ref={ref}>
        <section className='w-[320px] px-2 py-3 '>
          <div className='text-center font-bold text-lg pb-2'>RECEIPT</div>
          <div className='text-sm font-semibold'>
            <div>Ref: {receiptData?.ref_no}</div>
            <div>Shop: {appInfo.name}, {appInfo.address}, {appInfo.phone_number}</div>
            <div className='flex justify-between items-center'>
              <div>User: {receiptData?.user.first_name}</div>
              <div>Date: {receiptData?.created_at}</div>
            </div>
            <div>Currency: {receiptData?.currency}</div>
          </div>
          <div className='text-center'>
            ---------------------
          </div>
          <div className='text-sm'>
            <div className='py-1 flex justify-between font-semibold'>
              <div>PRODUCT</div>
              <div>QUANTITY</div>
              <div>TOTAL PRICE</div>
            </div>
            {!receiptItems == [] && receiptItems.map((item) => (

              <div className='pt-2 pb-1 flex justify-between items-center'>
                <div>
                  {item.product_name} <br /> 
                  {(item.unit_price / 100).toFixed(2)}
                </div>
                <div> 
                  x {item.quantity_sold}
                </div>
                <div>
                  ${(item.total_price / 100).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className='text-center'>
            ---------------------
          </div>
          <div className='font-semibold text-sm'>
            <div className='pt-2 pb-1 flex justify-between'>
              <div>TOTAL QUANTITY</div>
              <div>
                {!receiptData?.quantity_total != undefined && receiptData?.quantity_total}
              </div>
            </div>
            <div className='pt-2 pb-1 flex justify-between'>
              <div>SUBTOTAL</div>
              <div>
                ${!receiptData?.subtotal != undefined && (receiptData.subtotal / 100).toFixed(2)}
              </div>
            </div>
            <div className='pt-2 pb-1 flex justify-between'>
              <div>TAX</div>
              <div>
                ${!receiptData?.tax != undefined && (receiptData.tax / 100).toFixed(2)}
              </div>
            </div>
            <div className='pt-2 pb-1 flex justify-between'>
              <div>GRANDTOTAL</div>
              <div>
                ${!receiptData?.grandtotal != undefined && (receiptData.grandtotal / 100).toFixed(2)}
              </div>
            </div>
          </div>
          <div className='text-center py-3'>Thank you.</div>
        </section>
      </div>
    }
    </>
  );
});

export default ReceiptMain