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
import ViewUser from './pages/User/ViewUser'
import ViewSupplier from './pages/Supplier/ViewSupplier'
import AddSupplier from './pages/Supplier/AddSupplier'
import ListSupplier from './pages/Supplier/ListSupplier'
import DaySaleOrder from './pages/SalesOrder/DaySaleOrder'
import MonthSaleOrder from './pages/SalesOrder/MonthSaleOrder'
import UserSaleOrder from './pages/SalesOrder/UserSaleOrder'
import UserSale from './pages/Sales/UserSale'
import MonthSale from './pages/Sales/MonthSale'
import DaySale from './pages/Sales/DaySale'
import StockOrder from './pages/StockOrder/StockOrder'
import EditProduct from './pages/Product/EditProduct'
import SettingPage from './pages/Setting/SettingPage'
import CurrencyPage from './pages/Setting/CurrencyPage'


function App() {

  return (
    <>
      <Routes>
        {/*  */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<PosPage />} />
        {/* User */}
        <Route path='/user' element={<ListUser />} />
        <Route path='/user/add' element={<AddUser />} />
        <Route path='/user/view' element={<ViewUser />} />
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
        <Route path='/sales/daily' element={<DaySale />} />
        <Route path='/sales/monthly' element={<MonthSale />} />
        <Route path='/sales/user' element={<UserSale />} />
        {/* SalesOrder */}
        <Route path='/sales/order/daily' element={<DaySaleOrder />} />
        <Route path='/sales/order/monthly' element={<MonthSaleOrder />} />
        <Route path='/sales/order/user' element={<UserSaleOrder />} />
        {/* Stock */}
        <Route path='/stock' element={<ListStock />} />
        <Route path='/stock/add' element={<AddStock />} />
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
