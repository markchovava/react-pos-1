import React from 'react'
import PosMainContentHeader from './PosMainContentHeader'
import PosMainContentSearch from './PosMainContentSearch'
import PosMainContentProductTitle from './PosMainContentProductTitle'
import PosMainContentTable from './PosMainContentTable'
/* import {BsSearch } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai' */


function PosMainContent() {
  return (
    <section className='w-[65vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
      {/* PosMainContentTop */}
      <section className='fixed w-[65vw] h-[37vh] border-b border-black '>
        {/* PosMainContentHeader */}
        <PosMainContentHeader />
        {/* PosMainContentSearch */}
        <PosMainContentSearch />
        {/* PosMainContentProductTitle */}
        <PosMainContentProductTitle />
      </section>
      {/* PosMainContentBottom */}
      <section className='w-[65vw] top-[37vh] h-[63vh] fixed overflow-y-auto scroll__width py-3'>
        {/* PosMainContentTable */}  
        <PosMainContentTable />
      </section>

    </section>
  )
}

export default PosMainContent