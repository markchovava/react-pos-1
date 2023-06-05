import PosLeftContent from '../../components/PosLeftContent'


function AddSupplier() {

  return (
   <section className='bg-slate-100 h-auto w-full overflow-hidden'>
      <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
         <PosLeftContent />
         <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
            {/*  */}
            <section className='w-[89vw] h-[25vh] fixed border-b border-black '>
               {/* Title and User Name */}
               <div className='w-full h-[10vh] bg-white border-b border-slate-400 flex items-center justify-center shadow-lg pr-[1rem]'>
                  <div className='w-[96%] flex justify-between items-center'>
                     <div className=''>
                        <h1 className='font-bold text-xl'> Add Supplier Page </h1>
                     </div>
                     <div className=''>
                           <h2 className='font-semibold text-xl'> User: Mark Chovava </h2>
                     </div>
                  </div>
               </div>
               {/* Title */}
               <div className='w-full h-[15vh] shadow-lg flex justify-center items-end'>
                  <div className='w-full h-[10vh] bg-white flex justify-center'>
                     <div className='w-[96%] flex justify-between items-end pb-3 pr-[0.5rem]'>
                        <h1 className='text-4xl font-bold'> Add Supplier </h1>
                        <button className='px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>
                        View All
                        </button>
                     </div>
                  </div>    
               </div> 
            </section>

            <section className='w-[89vw] h-[68vh] top-[25vh] border-t border-slate-300 bg-white text-black fixed overflow-y-auto scroll__width pb-8 '>
               <div className='flex items-center justify-center'>
                  <form className='w-[96%] py-6'>
                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Name:
                        </label>
                        <input 
                           type="text"
                           className='border border-slate-300 rounded-md outline-none py-2 px-3 w-[70%]' 
                           placeholder='Enter Supplier here...'/>
                     </div>
                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Email:
                        </label>
                        <input type="email"
                           className='border border-slate-300 rounded-md outline-none py-2 px-3 w-[70%]' 
                           placeholder='Enter Email here...'/>
                     </div>  
                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Phone Number:
                        </label>
                        <input type="text"
                           className='border border-slate-300 rounded-md outline-none py-2 px-3 w-[70%]' 
                           placeholder='Enter Phone number here...'/>
                     </div>  
                     <div className='flex items-center justify-start mb-6'>
                        <label className='w-[25%] font-semibold text-slate-900'>
                           Address:
                        </label>
                        <input type="text"
                           className='border border-slate-300 rounded-md outline-none py-2 px-3 w-[70%]' 
                           placeholder='Enter Address here...'/>
                     </div>  
                     <div className='flex items-center justify-start mb-6'>
                        <button 
                           className='ml-[25%] bg-blue-500 hover:bg-blue-600 transition-all text-white text-center rounded-md outline-none py-3 w-[70%]'>
                           Submit
                        </button>
                     </div>  
                  </form>
               </div>
            </section>
         </section>

      </div>
   </section>
  )
}

export default AddSupplier