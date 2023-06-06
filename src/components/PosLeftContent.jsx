import React from 'react'
import { BiBarcodeReader, BiPackage } from 'react-icons/bi'
import { BsBarChartFill, BsFillCartCheckFill } from 'react-icons/bs'
import { AiFillDashboard, AiFillSetting, AiFillDatabase } from 'react-icons/ai'
import { FaDesktop } from 'react-icons/fa'
import { TbReport } from 'react-icons/tb'
import { Link } from 'react-router-dom'

function PosLeftContent() {
  return (
    <section className='w-[10vw] h-[100%] bg-slate-900 text-white fixed overflow-y-auto scroll__width'>
      <Link to='/' className='w-full h-[15vh] flex flex-col items-center justify-center bg-slate-950 border-b-2 border-slate-200'>
        <BiBarcodeReader className='text-[2.5rem] text-center' />
        <span className='font-semibold text-xl'>POS 1</span>
      </Link>
        <div className='w-full h-auto mt-4 border-t-2 border-slate-200 flex flex-col items-center'>
          <button title='Dashboard' className='left__ContentBtn'>
            <AiFillDashboard className='left__Icon'/>
          </button>
          <button title='Sales' className='left__ContentBtn'>
            <BsBarChartFill className='left__Icon'/>
          </button>
          <button title='Stock' className='left__ContentBtn'>
            <BiPackage className='left__Icon'/>
          </button>
          <button title='Product' className='left__ContentBtn'>
            <Link to='/product'>
              <BsFillCartCheckFill className='left__Icon'/>
            </Link>
          </button>
          <button title='Till' className='left__ContentBtn'>
            <FaDesktop className='left__Icon'/>
          </button>
          <button title='Reports' className='left__ContentBtn'>
            <TbReport className='left__Icon'/>
          </button>
          <button title='Orders' className='left__ContentBtn'>
            <AiFillDatabase className='left__Icon'/>
          </button>
          <button title='Settings' className='left__ContentBtn'>
            <AiFillSetting className='left__Icon'/>
          </button>
        </div>
    </section>
  )
}

export default PosLeftContent