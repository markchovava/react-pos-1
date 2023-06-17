import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import PosLeftContent from '../../components/PosLeftContent'
import { useParams } from 'react-router-dom'
import { MainContextState } from '../../contexts/MainContextProvider'


function DaySaleProductUSD() {
  const {salesItemState, salesItemDispatch} = MainContextState()
  const { date } = useParams()
  console.log(salesItemState)

  const getProductByDate = () => {
    return salesItemState.items.filter((item) => item.created_at.slice(0, 10) === date );
  }
  const sortedData = getProductByDate().sort((a, b) => {
    return 1
  })
  console.log(sortedData)
   /* generate the group */
  function groupItems(array, property) {
    return array.reduce(function(groups, item) { 
        var name = item[property]
        var group = groups[name] || (groups[name] = []);
        group.push(item);
        return groups;
    }, { });
  }
  /* Gets the lists with the groups */
  const getGroupItemList = () =>{
    var groups = groupItems(sortedData, 'product_name');
    let str = "[";
    for(var key in groups) {
      var group = groups[key];
      console.log(group)
      /* Calculate grandtotal  */
      let item_total_price = 0;
      let quantity_total = 0;
      let unit_price = 0;
      group.reduce((acc, curr) => {
          if(curr.currency == 'USD'){
            item_total_price  += curr.total_price;
            quantity_total += curr.quantity_sold;
            unit_price = curr.unit_price;
            //return sales_grandtotal;
          }
      }, 0);
      let quantity = quantity_total ? quantity_total : 0;
      let item_total  = item_total_price  ? item_total_price  : 0;
      str += '{"product_name": "' + key + '", "unit_price": ' + unit_price + ', "total_price": ' + item_total_price + ', "quantity_total": ' +  quantity + '},'
      console.log(str)
    } 
    let fullStr = str.substring(0, str.length - 1) + "]";
    console.log(fullStr)
    let toStr = fullStr.toString()
    let strObj = JSON.parse(toStr)
    return strObj;
  }

  const items = getGroupItemList()
  console.log(items)


  return (
    <section className='bg-slate-100 h-auto w-full overflow-hidden'>
      <div className='container h-[100vh] mx-auto max-w-screen-2xl lg:px-0 px-4 flex justify-start items-center'>
        <PosLeftContent />
        <section className='w-[90vw] h-[100vh] left-[10vw] bg-slate-100 fixed'>
            <section className='w-[89vw] h-[32vh] fixed border-b border-black '>
              {/* Page Title and Username */}
              <div className='w-full h-[10vh] bg-white flex items-center justify-center shadow-lg pr-[0.5rem]'>
                  <div className='w-[96%] flex justify-between items-center'>
                    <div className=''>
                        <h1 className='font-bold text-xl'> Product Daily Sales Page: {date} </h1>
                    </div>
                    <div className=''>
                          <h2 className='font-semibold text-xl'>User: Name</h2>
                    </div>
                  </div>
              </div>
              {/* Search and Add */}
              <div className='w-full h-[15vh] flex items-end justify-center shadow-lg'>
              <div className='w-[100%] bg-white pt-4 pb-2 flex justify-center items-center pr-[0.5rem]'>
                  <div className='w-[96%] flex justify-between items-center'>
                    <div className='w-[40%]'>
                        <input type='text' placeholder='Search by Day...' 
                          className='w-full rounded-md px-3 py-2 text-slate-500 border border-slate-300 outline-none'/>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                        <div className='flex items-center justify-between'>
                          <div className='py-2 px-2 hover:scale-125 cursor-pointer hover:text-blue-600'>
                          <BsChevronDoubleLeft />
                          </div>
                          <div className='py-2 px-2 font-semibold transition-all hover:scale-125 cursor-pointer hover:text-blue-600'>
                          1
                          </div>
                          <div className='py-2 px-2 font-semibold transition-all hover:scale-125 cursor-pointer hover:text-blue-600'>
                          2
                          </div>
                          <div className='py-2 px-2 transition-all hover:scale-125 cursor-pointer hover:text-blue-600'>
                          <BsChevronDoubleRight />
                          </div>
                        </div>
                    
                    </div>
                  </div>
              </div>
              </div>
              {/* ListStockTableTitle */}
              <div className='w-full h-[7vh] bg-white flex items-end justify-center pr-[0.5rem]'>
                  {/* Table Row */}
                  <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                    <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>PRODUCT NAME </div>
                    <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>QUANTITY </div>
                    <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>TOTAL PRICE </div>
                    <div className='w-[25%] border-r border-slate-300 font-semibold px-3'>CURRENCY</div>
                  </div>
              </div>
            </section>
            <section className='w-[89vw] h-[68vh] top-[32vh] text-black fixed overflow-y-auto scroll__width pb-8'>
              {/* ListStockTable */}
              <div className='w-full bg-white flex flex-col items-center justify-center text-md'>
                  {/* Table Row */}
                  {items.map((item, i) => (
                    <div className='w-[96%] bg-white text-slate-800 border border-slate-300 py-2 flex justify-center items-center'>
                      <div className='w-[25%] border-r border-slate-300 px-3'>{item.product_name} </div>
                      <div className='w-[25%] border-r border-slate-300 px-3'>{item.quantity_total} </div>
                      <div className='w-[25%] border-r border-slate-300 px-3'>{(item.total_price / 100).toFixed(2)} </div>
                      <div className='w-[25%] border-r border-slate-300 px-3'> USD</div>
                    </div>   
                  ))}
                 
                  
                
              </div>
              

            </section>
        </section>

      </div>
    </section>
  )
}

export default DaySaleProductUSD