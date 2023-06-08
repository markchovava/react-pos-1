import React from 'react'
import PosLeftContent from '../../components/PosLeftContent'
import PosMainContent from './components/PosMainContent'
import PosRightContent from './components/PosRightContent'

function PosPage() {
  return (
    <section className='bg-slate-100 h-auto w-full overflow-hidden'>
        <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
           <PosLeftContent />
           <PosMainContent />
           <PosRightContent />
           
        </div>
    </section>
  )
}

export default PosPage