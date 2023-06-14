import React, { useState, useEffect } from "react";

const TestPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Get the sales data from an API or database.
    const data = [
      { date: "2023-06-10T14:52:45.940577Z", sales: 50, quantity: 20 },
      { date: "2023-06-12T14:52:45.940577Z", sales: 50, quantity: 20},
      { date: "2023-06-10T14:52:45.940577Z", sales: 100, quantity: 20 },
      { date: "2023-06-09T14:52:45.940577Z", sales: 200, quantity: 20},
      { date: "2023-06-11T14:52:45.940577Z", sales: 100, quantity: 20 },
      { date: "2023-06-11T14:52:45.940577Z", sales: 200, quantity: 20},
      { date: "2023-06-11T14:52:45.940577Z", sales: 300, quantity: 20 },
    ];
    // Set the sales state.
    setSales(data);
  }, []);

  /* TRANSFORM THE DATA */
  const dataNew = sales.map((item) => {
    return {...item, date: item.date.slice(0, 10)};
  });
  console.log(dataNew)
  // SORT BY DATE
  const sortedData = dataNew.sort((a, b) => {
    if(a.date < b.date){
      return -1
    }
    if(a.date > b.date){
      return 1
    }
    return 0
  })
  console.log('SORTED')
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
    var groups = groupItems(dataNew, 'date');
    let str = '[';
    for(var key in groups) {
      var group = groups[key];
      /* Calculate Sales */
      let sales_total = 0;
      group.reduce((acc, curr) => {
        sales_total += curr.sales;
        return sales_total;
      }, 0);
      /* Calculate Quantity */
      let quantity_total = 0;
      group.reduce((acc, curr) => {
        quantity_total += curr.quantity_total;
        return quantity_total;
      }, 0);
      let quantity = quantity_total ? quantity_total : 0;
      let sales = sales_total ? sales_total : 0;
      str += '{"date": "' + key + '", "sales": ' + sales + ', "quantity_total": ' +  quantity + '},'
    } 
    let strObj = str.substring(0, str.length - 1) + ']'
    // strObj = JSON.parse(strObj)
    return strObj;
  }


  console.log(getGroupItemList())
 
 

  // Render the grouped sales.
  return (
    <div>
      <h1>Sales by Day</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sales</th>
            <th>Quantity</th>
          </tr>
        </thead>
        
       
      </table>
    </div>
  );
};

export default TestPage;