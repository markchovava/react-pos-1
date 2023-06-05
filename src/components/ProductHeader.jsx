import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'

function ProductHeader({ title, topic }) {
  return (
   <>
      {/* Title and User Name */}
      <div className='w-full h-[10vh] bg-white border-b border-slate-400 flex items-center justify-center shadow-lg pr-[1rem]'>
         <div className='w-[96%] flex justify-between items-center'>
            <div className=''>
               <h1 className='font-bold text-xl'> { title } </h1>
            </div>
            <div className=''>
                  <h2 className='font-semibold text-xl'>User: Mark Chovava</h2>
            </div>
         </div>
      </div>
      {/* Title */}
      <div className='w-full h-[15vh]  shadow-lg flex justify-center items-end pr-[1rem]'>
         <div className='w-full h-[10vh] bg-white flex justify-center'>
            <div className='w-[96%] flex justify-between items-end pb-2'>
               <h1 className='text-4xl font-bold'>{ topic }</h1>
               <button className='px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>View All</button>
            </div>
         </div>    
      </div>
   </>
  )
}

export default ProductHeader