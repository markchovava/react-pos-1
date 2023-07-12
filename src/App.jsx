import { Route, Routes } from 'react-router-dom'
import PosPage from './pages/Pos/PosPage'
import ListProduct from './pages/Product/ListProduct'
import AddProduct from './pages/Product/AddProduct'
import ViewProduct from './pages/Product/ViewProduct'
import ListStock from './pages/Stock/ListStock'
import AddStock from './pages/Stock/AddStock'
import ListPrice from './pages/Price/ListPrice'
import EditPrice from './pages/Price/EditPrice'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ListUser from './pages/User/ListUser'
import AddUser from './pages/User/AddUser'
import EditUser from './pages/User/EditUser'
import ViewUser from './pages/User/ViewUser'
import ViewSupplier from './pages/Supplier/ViewSupplier'
import AddSupplier from './pages/Supplier/AddSupplier'
import ListSupplier from './pages/Supplier/ListSupplier'
import DaySaleOrder from './pages/SalesOrder/DaySaleOrder'
import MonthSaleOrder from './pages/SalesOrder/MonthSaleOrder'
import UserSaleOrder from './pages/SalesOrder/UserSaleOrder'
import StockOrder from './pages/StockOrder/StockOrder'
import EditProduct from './pages/Product/EditProduct'
import SettingPage from './pages/Setting/SettingPage'
import CurrencyPage from './pages/Setting/CurrencyPage'
import SalesPage from './pages/Sales/SalesPage'
import DaySaleUSD from './pages/Sales/DaySaleUSD'
import DaySaleZWL from './pages/Sales/DaySaleZWL'
import MonthSaleUSD from './pages/Sales/MonthSaleUSD'
import MonthSaleZWL from './pages/Sales/MonthSaleZWL'
import DaySaleProductUSD from './pages/Sales/DaySaleProductUSD'
import DaySaleProductZWL from './pages/Sales/DaySaleProductZWL'
import EditStock from './pages/Stock/EditStock'
import ProfileEdit from './pages/Auth/ProfileEdit'
import MonthSaleProductZWL from './pages/Sales/MonthSaleProductZWL'
import MonthSaleProductUSD from './pages/Sales/MonthSaleProductUSD'
import SalesList from './pages/Sales/SalesList'
import SalesView from './pages/Sales/SalesView'
import SalesUsers from './pages/Sales/SalesUsers'
import SalesByUserMonthly from './pages/Sales/SalesByUserMonthly'
import SalesByUserDaily from './pages/Sales/SalesByUserDaily'





function App() {

  return (
    <>
      <Routes>
        <Route path='/pos' element={<PosPage />} />
        {/*  */}
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<ProfileEdit />} />
        {/* User */}
        <Route path='/user' element={<ListUser />} />
        <Route path='/user/add' element={<AddUser />} />
        <Route path='/user/edit/:id' element={<EditUser />} />
        <Route path='/user/view/:id' element={<ViewUser />} />
        {/* Supplier */}
        <Route path='/supplier' element={<ListSupplier />} />
        <Route path='/supplier/add' element={<AddSupplier />} />
        <Route path='/supplier/view' element={<ViewSupplier />} />
        {/*  */}
        <Route path='/product' element={<ListProduct />} />
        <Route path='/product/add' element={<AddProduct />} />
        <Route path='/product/view/:id' element={<ViewProduct />} />
        <Route path='/product/edit/:id' element={<EditProduct />} />
        {/* Sales */}
        <Route path='/sales' element={<SalesPage />} />
        <Route path='/sales/list' element={<SalesList />} />
        <Route path='/sales/view/:id' element={<SalesView />} />
        <Route path='/sales/daily/usd/' element={<DaySaleUSD />} />
        <Route path='/sales/daily/zwl' element={<DaySaleZWL />} />
        <Route path='/sales/daily/product/usd' element={<DaySaleProductUSD />} />
        <Route path='/sales/daily/product/zwl' element={<DaySaleProductZWL />} />
        <Route path='/sales/monthly/usd' element={<MonthSaleUSD />} />
        <Route path='/sales/monthly/zwl' element={<MonthSaleZWL />} />
        <Route path='/sales/monthly/product/usd' element={<MonthSaleProductUSD />} />
        <Route path='/sales/monthly/product/zwl' element={<MonthSaleProductZWL />} />
        <Route path='/sales/users' element={<SalesUsers />} />
        <Route path='/sales/users/daily/:id' element={<SalesByUserDaily />} />
        <Route path='/sales/users/monthly/:id' element={<SalesByUserMonthly />} />
        {/* SalesOrder */}
        <Route path='/sales/order/daily' element={<DaySaleOrder />} />
        <Route path='/sales/order/monthly' element={<MonthSaleOrder />} />
        <Route path='/sales/order/user' element={<UserSaleOrder />} />
        {/* Stock */}
        <Route path='/stock' element={<ListStock />} />
        <Route path='/stock/edit/:id' element={<EditStock />} />
        {/* Stock Order */}
        <Route path='/stock/order' element={<StockOrder />} />
        {/*  */}
        <Route path='/price' element={<ListPrice />} />
        <Route path='/price/edit' element={<EditPrice />} />
        {/* Setting */}
        <Route path='/settings' element={<SettingPage />} />
        <Route path='/settings/currency' element={<CurrencyPage />} />
        
      </Routes> 
    </>
  )
}

export default App
