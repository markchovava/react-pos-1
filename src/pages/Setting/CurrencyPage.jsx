import React from 'react'
import PosLeftContent from '../../components/PosLeftContent'

function CurrencyPage() {
  return (
   <section className='bg-slate-100 h-auto w-full overflow-hidden'>
      <form 
      onSubmit={ (e) => { e.preventDefault() } }
      className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
        <PosLeftContent />
        <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
          {/* ProductHeader */}
          <section className='w-[90vw] h-[25vh] left-[10vw] bg-slate-100 fixed'>
            {/* Title and User Name */}
            <div className='w-full h-[10vh] bg-white border-b border-slate-400 flex items-center justify-center shadow-lg '>
              <div className='w-[96%] flex justify-between items-center pr-[1rem]'>
                  <div className=''>
                    <h1 className='font-bold text-xl'> Edit Currency Rate Page </h1>
                  </div>
                  <div className=''>
                        <h2 className='font-semibold text-xl'>User: Mark Chovava</h2>
                  </div>
              </div>
            </div>
            {/* Title */}
            <div className='w-full h-[15vh]  shadow-lg flex justify-center items-end'>
              <div className='w-full h-[10vh] bg-white flex justify-center pr-[1rem]'>
                  <div className='w-[96%] flex justify-between items-end pb-2'>
                    <h1 className='text-4xl font-bold'>Edit Currency Rate</h1>
                  </div>
              </div>    
            </div>
          </section>
          <section className='w-[90vw] top-[25vh] h-[75vh] fixed overflow-y-auto scroll__width py-3'>
            {/* ProductMainContentForm */}  
            <section className='w-[96%] h-auto mx-auto'>
              <div className='py-8'>
                <div className='flex items-center justify-start mb-6'>
                  <label className='w-[25%] font-semibold text-slate-900'>Currency Name:</label>
                  <div className='text-xl rounded-md outline-none px-3 w-[70%]'>
                     USD : ZWL
                  </div>
                </div>
                <div className='flex items-center justify-start mb-6'>
                  <label className='w-[25%] font-semibold text-slate-900'>
                    Rate:
                  </label>
                  <input name='number'
                  className='border border-slate-400 rounded-md outline-none py-2 px-3 w-[70%]' 
                  placeholder='Enter Description...'/>
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
    </section>
  )
}

export default CurrencyPage