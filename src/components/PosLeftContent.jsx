import React from 'react'
import { BiBarcodeReader, BiPackage } from 'react-icons/bi'
import { BsBarChartFill, BsFillCartCheckFill, BsPersonFill } from 'react-icons/bs'
import { AiFillDashboard, AiFillSetting, AiFillDatabase } from 'react-icons/ai'
import { ImPriceTags } from 'react-icons/im'
import { MdWidgets } from 'react-icons/md'
import { FaDesktop } from 'react-icons/fa'
import { TbReport } from 'react-icons/tb'
import { Link } from 'react-router-dom'


function PosLeftContent() {

  return (
    <section className='w-[10vw] h-[100%] bg-slate-900 text-white fixed overflow-y-auto scroll__width'>
      <Link to='/pos' className='w-full h-[15vh] flex flex-col items-center justify-center bg-slate-950 border-b-2 border-slate-200'>
        <BiBarcodeReader className='text-[2.5rem] text-center' />
        <span className='font-semibold text-xl'>POS 1</span>
      </Link>
        <div className='w-full h-auto mt-4 border-t-2 border-slate-200 flex flex-col items-center'>
         {/*  <button title='Dashboard' className='left__ContentBtn'>
            <AiFillDashboard className='left__Icon'/>
          </button> */}
          <button title='Product' className='left__ContentBtn'>
            <Link to='/product' className='w-[100%] h-[100%] flex items-center justify-center'>
              <BsFillCartCheckFill className='left__Icon'/>
            </Link>
          </button>
          <button title='Sales' className='left__ContentBtn'>
            <Link to='/sales' className='w-[100%] h-[100%] flex items-center justify-center'>
              <BsBarChartFill className='left__Icon'/>
            </Link>
          </button>
          <button title='Stock' className='left__ContentBtn'>
            <Link to='/stock' className='w-[100%] h-[100%] flex items-center justify-center'>
              <BiPackage className='left__Icon'/>
            </Link>
          </button>
          <button title='Users' className='left__ContentBtn'>
            <Link to='/user' className='w-[100%] h-[100%] flex items-center justify-center'>
              <FaDesktop className='left__Icon'/>
            </Link>
          </button>
          <button title='User Sales' className='left__ContentBtn'>
            <Link to='/user/sales' className='w-[100%] h-[100%] flex items-center justify-center'>
                <BsPersonFill className='left__Icon'/>
            </Link>
          </button>
          <button title='Suppliers' className='left__ContentBtn'>
            <Link to='/supplier' className='w-[100%] h-[100%] flex items-center justify-center'>
              <MdWidgets className='left__Icon'/>
            </Link>
          </button>
          <button title='Price' className='left__ContentBtn'>
            <Link to='/price' className='w-[100%] h-[100%] flex items-center justify-center'>
              <ImPriceTags className='left__Icon'/>
            </Link>
          </button>
          {/* <button title='Reports' className='left__ContentBtn'>
            <TbReport className='left__Icon'/>
          </button> */}
         {/*  <button title='Orders' className='left__ContentBtn'>
            <AiFillDatabase className='left__Icon'/>
          </button> */}
          <button title='Settings' className='left__ContentBtn'>
            <Link to='/settings' className='w-[100%] h-[100%] flex items-center justify-center'>
              <AiFillSetting className='left__Icon'/>
            </Link>
          </button>
        </div>
    </section>
  )
}

export default PosLeftContent