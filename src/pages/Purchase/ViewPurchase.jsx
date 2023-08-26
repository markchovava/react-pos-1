import React, { useEffect, useState } from 'react'
import AxiosClient from '../../axios/axiosClient';
import PosLeftContent from '../../components/PosLeftContent'
import { MainContextState } from '../../contexts/MainContextProvider';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LogoutBtn from '../../components/LogoutBtn';
import CurrentUser from '../../components/CurrentUser';


function ViewPurchase() {
  const { id } = useParams()
  const baseURL = `purchase/${id}`;
  const [purchase, setPurchase] = useState({})
  const {getToken, authUser} = MainContextState()
   const navigate = useNavigate();
   const token = getToken();
   useEffect(()=>{
      if(!token){
        return navigate('/login');
      }
    },[token])

      /* ACCESS CONTROL */
   const accessLevel = parseInt(authUser?.access_level)
   
    /* FETCH SINGLE SALES */
    useEffect(() => {  
      if(accessLevel >= 3){
        return navigate('/purchase', 
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
      async function fetchPurchase() {
        try{
          const result = await AxiosClient.get(baseURL)
          .then((response) => {
              setPurchase(response.data)  
            })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
       } 
      fetchPurchase()
   }, []);

   const items = purchase.purchase_items;
   // console.log(items)

   

  return (
    <section className='bg-slate-100 h-auto w-full overflow-hidden'>
        <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
           {/* LEFT */}
           <PosLeftContent />
           {/* RIGHT */}
           <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
              {/* RIGHT TOP */}
              <section className='w-[89vw] h-[40vh] fixed border-b border-black '>
                 {/* Page Title and Username */}
                 <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg pr-[0.5rem]'>
                    <div className='w-[96%] flex justify-between items-center'>
                        <div>
                            <h1 className='font-bold text-lg'> 
                              <Link 
                                  to='/stock'
                                  className='text-blue-800 hover:text-black'>
                                  Stock
                              </Link> / <Link 
                                  to='/purchase/list'
                                  className='text-blue-800 hover:text-black'>
                                  Purchase List
                              </Link> / Purchase   
                            </h1>
                        </div>
                   
                        <div className='flex gap-2 items-center'>
                            <CurrentUser />
                            <LogoutBtn />
                        </div>
                    </div>
                 </div>

                 {/* Search and Add */}
                 <div className='w-full h-[28vh] flex items-start justify-center shadow-lg py-3'>
                    <div className='w-[96%] h-[100%] pr-[0.5rem] flex gap-4 justify-between'>
                      {/*  */}
                      <div className='w-[100%] h-[100%] px-3 py-2 bg-white'>
                        <div className='w-[100%] h-[100%] flex flex-col justify-center items-start'> 
                          <div className='text-sm font-semibold mb-1'>
                            <span className='text-slate-950  bg-green-50 px-2'>
                              Purchase Ref:
                            </span>
                            <span className='ml-3'>
                              {purchase.purchase_ref ? purchase.purchase_ref : ''}
                            </span>
                          </div>
                          <div className='text-sm font-semibold mb-1'>
                            <span className='text-slate-950 text-sm font-semibold bg-green-50 px-2'>
                              Reciever:
                            </span>
                            <span className='ml-3'>
                              { purchase.user ? purchase.user?.first_name : '' } { purchase.user ? purchase.user?.last_name : '' }
                            </span>
                          </div>
                          <div className='text-sm font-semibold mb-1'>
                            <span className='text-slate-950 bg-green-50 px-2'>
                              Date:
                            </span>
                            <span className='ml-3'>
                            {purchase.created_at ? purchase.created_at : ''}
                            </span>
                          </div>
                          <div className='text-sm font-semibold mb-1'>
                            <span className='text-slate-950 bg-green-50 px-2'>
                              Currency:
                            </span>
                            <span className='ml-3'>
                              {purchase.currency ? purchase.currency : ''}
                            </span>
                          </div>
                          <div className='text-sm font-semibold mb-1'>
                            <span className='text-slate-950 bg-green-50 px-2'>
                              Payment Method:
                            </span>
                            <span className='ml-3'>
                              {purchase.payment_method ? purchase.payment_method : ''}
                            </span>
                          </div>
                          <div className='text-sm font-semibold mb-1'>
                            <span className='text-slate-950 bg-green-50 px-2'>
                              Purchase Total:
                            </span>
                            <span className='ml-3'>
                              ${purchase.purchase_total ? (purchase.purchase_total / 100).toFixed(2) : ''}
                            </span>
                          </div>
            
                        </div>
                      </div>
                      {/*  */}
                      <div className='w-[100%] h-[100%] px-3 bg-white'>
                        <div className='w-[100%] h-[100%] flex flex-col justify-center items-start'>
                          <div className='text-sm font-semibold mb-1'>
                            <span className='text-slate-950 bg-green-50 px-2'>
                              Supplier Ref:
                            </span>
                            <span className='ml-3'>
                              {purchase.supplier_ref ? purchase.supplier_ref : ''}
                            </span>
                          </div>
                          <div className='text-sm font-semibold mb-1'>
                            <span className='text-slate-950 text-sm font-semibold bg-green-50 px-2'>
                              Supplier Name:
                            </span>
                            <span className='ml-3'>
                              {purchase.supplier_name ? purchase.supplier_name : ''}
                            </span>
                          </div>
                          <div className='text-sm font-semibold mb-1'>
                            <span className='text-slate-950  bg-green-50 px-2'>
                              Supplier Phone:
                            </span>
                            <span className='ml-3'>
                              {purchase.supplier ? purchase.supplier.phone_number : ''}
                            </span>
                          </div>
                          <div className='text-sm font-semibold mb-1'>
                            <span className='text-slate-950 bg-green-50 px-2'>
                                Supplier Address:
                            </span>
                            <span className='ml-3'>
                              { purchase.supplier ? purchase.supplier.address : ''}
                            </span>
                          </div>
                          <div className='text-sm font-semibold mb-1'>
                            <span className='text-slate-950 bg-green-50 px-2'>
                                Supplier Email:
                            </span>
                            <span className='ml-3'>
                              {purchase.supplier ? purchase.supplier.email : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>

                 {/* ListStockTableTitle */}
                 <div className='w-full h-[7vh] bg-white flex items-end justify-center pr-[0.5rem]'>
                    {/* Table Row */}
                    <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                       <div className='w-[30%] border-r border-slate-300 font-semibold px-3'> PRODUCT NAME </div>
                       <div className='w-[20%] border-r border-slate-300 font-semibold px-3'> QUANTITY SOLD </div>
                       <div className='w-[25%] border-r border-slate-300 font-semibold px-3'> UNIT COST </div>
                       <div className='w-[25%] border-r border-slate-300 font-semibold px-3'> TOTAL COST </div>
                    </div>
                 </div>
              </section>

              {/* RIGHT TABLE LIST */}
              <section className='w-[89vw] h-[60vh] top-[45vh] text-black fixed overflow-y-auto scroll__width pb-8'>
                 {/* ListStockTable */}
                 <div className='w-full bg-white flex flex-col items-center justify-center text-md'>
                  {/* Table Row */} 
                  {items &&
                    items.map( (item) => (
                      <div id={item?.product_id} 
                        className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                        <div className='w-[30%] border-r border-slate-300 px-3'> {item?.product_name} </div>
                        <div className='w-[20%] border-r border-slate-300 px-3'> {item?.quantity_bought} </div>
                        <div className='w-[25%] border-r border-slate-300 px-3'> ${(item?.unit_cost / 100).toFixed(2)} </div>
                        <div className='w-[25%] border-r border-slate-300 px-3'> ${(item?.total_cost / 100).toFixed(2)} </div>
                      </div> 
                    ))
                  }       
                         
                </div>
              </section>
           </section>
        </div>
   </section>
  )
}

export default ViewPurchase