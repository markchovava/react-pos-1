import { useEffect } from 'react'
import { MainContextState } from '../contexts/MainContextProvider';
import AxiosClient from '../axios/axiosClient';


const TestComp = () => {
  const {salesState, salesDispatch} = MainContextState() 
  /* FETCH ALL SALES */
  useEffect(() => { 
    async function fetchSales() {
        try{
          const result = await AxiosClient.get('sales/')
          .then((response) => {
                salesDispatch({
                type: 'FETCH_SALES',
                payload: response.data,
                })  
                
            })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    }
    fetchSales()
  }, []);
  /* TRANSFORM THE DATA */
  const newData = salesState.sales.map((item) => {
    return {...item, created_at: item.created_at.slice(0, 10)};
  });
  // SORT BY created_at
  const sortedData = newData.sort((a, b) => {
    return -1
  })
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
    var groups = groupItems(sortedData, 'created_at');
    let str = "[";
    let strObj;
    useEffect(() => {
      for(var key in groups) {
        var group = groups[key];
        /* Calculate grandtotal  */
        let sales_grandtotal = 0;
        let quantity_total = 0;
        group.reduce((acc, curr) => {
            if(curr.currency == 'USD'){
                sales_grandtotal  += curr.grandtotal;
                quantity_total += curr.quantity_total;
                //return sales_grandtotal;
            }
        }, 0);
        let quantity = quantity_total ? quantity_total : 0;
        let grandtotal  = sales_grandtotal  ? sales_grandtotal  : 0;
        str += '{"created_at": "' + key + '", "grandtotal": ' + grandtotal + ', "quantity_total": ' +  quantity + '},'
      } 
      strObj = str.substring(0, str.length - 1) + "]";
    }, [])
   
    //let strObj = str.substring(0, str.length - 1);
    //strObj = JSON.parse(strObj)
    return strObj;
  }
const items = getGroupItemList()
  return items
}


export default TestComp
