import { Route, Routes } from 'react-router-dom'

/* ------------------- POINT OF SALE ------------------- */
import PosPage from './pages/Pos/PosPage'
/* ------------------- RECIEPT ------------------- */
import Reciept from './pages/Print/Reciept'
/* ------------------- AUTH ------------------- */
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ProfileEdit from './pages/Auth/ProfileEdit'
/* ------------------- USER ------------------- */
import ListUser from './pages/User/ListUser'
import AddUser from './pages/User/AddUser'
import EditUser from './pages/User/EditUser'
import ViewUser from './pages/User/ViewUser'
/* ------------------- SALES ------------------- */
import MonthSaleProductZWL from './pages/Sales/MonthSaleProductZWL'
import MonthSaleProductUSD from './pages/Sales/MonthSaleProductUSD'
import SalesList from './pages/Sales/SalesList'
import SalesView from './pages/Sales/SalesView'
import SalesUsers from './pages/Sales/SalesUsers'
import SalesByUserMonthly from './pages/Sales/SalesByUserMonthly'
import SalesByUserDaily from './pages/Sales/SalesByUserDaily'
import SalesPage from './pages/Sales/SalesPage'
import DaySaleUSD from './pages/Sales/DaySaleUSD'
import DaySaleZWL from './pages/Sales/DaySaleZWL'
import MonthSaleUSD from './pages/Sales/MonthSaleUSD'
import MonthSaleZWL from './pages/Sales/MonthSaleZWL'
import DaySaleProductUSD from './pages/Sales/DaySaleProductUSD'
import DaySaleProductZWL from './pages/Sales/DaySaleProductZWL'
/* ------------------- USER SALES ------------------- */
import UserSalesPage from './pages/UserSales/UserSalesPage'
import UserDailyProductSales from './pages/UserSales/UserDailyProductSales'
import UserMonthlySales from './pages/UserSales/UserMonthlySales'
/* ------------------- PRODUCT ------------------- */
import ListProduct from './pages/Product/ListProduct'
import AddProduct from './pages/Product/AddProduct'
import ViewProduct from './pages/Product/ViewProduct'
import EditProduct from './pages/Product/EditProduct'
/* ------------------- STOCK ------------------- */
import StockPage from './pages/Stock/StockPage'
import ListStock from './pages/Stock/ListStock'
import EditStock from './pages/Stock/EditStock'
import NewPurchase from './pages/Purchase/NewPurchase'
/* ------------------- SETTING ------------------- */
import SettingPage from './pages/Setting/SettingPage'
import CurrencyPage from './pages/Setting/CurrencyPage'
import AppInfoPage from './pages/Setting/AppInfoPage'
/* ------------------- SUPPLIER ------------------- */
import AddSupplier from './pages/Supplier/AddSupplier'
import EditSupplier from './pages/Supplier/EditSupplier'
import ListSupplier from './pages/Supplier/ListSupplier'
import ViewSupplier from './pages/Supplier/ViewSupplier'
/* ------------------- PURCHASE ------------------- */
import ListPurchase from './pages/Purchase/ListPurchase'
import ViewPurchase from './pages/Purchase/ViewPurchase'
import DayPurchaseProductUSD from './pages/Purchase/DayPurchaseProductUSD'
import DayPurchaseProductZWL from './pages/Purchase/DayPurchaseProductZWL'
import MonthPurchaseProductUSD from './pages/Purchase/MonthPurchaseProductUSD'
import MonthPurchaseProductZWL from './pages/Purchase/MonthPurchaseProductZWL'
import PurchaseSupplier from './pages/Purchase/PurchaseSupplier'
import SupplierDailyPurchase from './pages/Purchase/SupplierDailyPurchase'
import SupplierMonthlyPurchase from './pages/Purchase/SupplierMonthlyPurchase'
import ProductsSalesByDayUSD from './pages/Sales/ProductsSalesByDayUSD'
import ProductsSalesByDayZWL from './pages/Sales/ProductsSalesByDayZWL'
import DailyPurchaseUSD from './pages/Purchase/DailyPurchaseUSD'
import DailyPurchaseZWL from './pages/Purchase/DailyPurchaseZWL'
import PurchaseByDayUSD from './pages/Purchase/PurchaseByDayUSD'
import PurchaseByDayZWL from './pages/Purchase/PurchaseByDayZWL'
import NotFoundPage from './pages/NotFound/NotFoundPage'
/* ------------------- PRICE ------------------- */
import PricePage from './pages/Price/PricePage'
import PriceList from './pages/Price/PriceList'
import NewPrice from './pages/Price/NewPrice'
import EditPrice from './pages/Price/EditPrice'


 


function App() {

  return (
    <>
      <Routes>
        <Route path='*' element={<NotFoundPage />} />

        <Route path='/pos' element={<PosPage />} />
        <Route path='/receipt' element={<Reciept />} />
        {/* ------------------- AUTH ------------------- */}
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<ProfileEdit />} />
        {/* ------------------- User ------------------- */}
        <Route path='/user' element={<ListUser />} />
        <Route path='/user/add' element={<AddUser />} />
        <Route path='/user/edit/:id' element={<EditUser />} />
        <Route path='/user/view/:id' element={<ViewUser />} />
        {/* ------------------- Current User Sales ------------------- */}
        <Route path='/user/sales' element={<UserSalesPage />} />
        <Route path='/user/sales/daily/product/:id' element={<UserDailyProductSales />} />
        <Route path='/user/sales/monthly/:id' element={<UserMonthlySales />} />
        {/* ------------------- Product ------------------- */}
        <Route path='/product' element={<ListProduct />} />
        <Route path='/product/add' element={<AddProduct />} />
        <Route path='/product/view/:id' element={<ViewProduct />} />
        <Route path='/product/edit/:id' element={<EditProduct />} />
        {/* ------------------- Sales ------------------- */}
        <Route path='/sales' element={<SalesPage />} />
        <Route path='/sales/list' element={<SalesList />} />
        <Route path='/sales/view/:id' element={<SalesView />} />
        <Route path='/sales/daily/usd/' element={<DaySaleUSD />} />
        <Route path='/sales/daily/usd/:created_at' element={<ProductsSalesByDayUSD />} />
        <Route path='/sales/daily/zwl' element={<DaySaleZWL />} />
        <Route path='/sales/daily/zwl/:created_at' element={<ProductsSalesByDayZWL />} />
        <Route path='/sales/daily/product/usd' element={<DaySaleProductUSD />} />
        <Route path='/sales/daily/product/zwl' element={<DaySaleProductZWL />} />
        <Route path='/sales/monthly/usd' element={<MonthSaleUSD />} />
        <Route path='/sales/monthly/zwl' element={<MonthSaleZWL />} />
        <Route path='/sales/monthly/product/usd' element={<MonthSaleProductUSD />} />
        <Route path='/sales/monthly/product/zwl' element={<MonthSaleProductZWL />} />
        <Route path='/sales/users' element={<SalesUsers />} />
        <Route path='/sales/users/daily/:id' element={<SalesByUserDaily />} />
        <Route path='/sales/users/monthly/:id' element={<SalesByUserMonthly />} />
        {/* ------------------- Stock ------------------- */}
        <Route path='/stock' element={<StockPage />} />
        <Route path='/stock/list' element={<ListStock />} />
        <Route path='/stock/edit/:id' element={<EditStock />} />
        {/* ------------------- PRICE ------------------- */}
        <Route path='/price' element={<PricePage />} />
        <Route path='/price/new' element={<NewPrice />} />
        <Route path='/price/list' element={<PriceList />} />
        <Route path='/price/edit/:id' element={<EditPrice />} />
        {/* ------------------- PURCHASE ------------------- */}
        <Route path='/purchase/new' element={<NewPurchase />} />
        <Route path='/purchase/list' element={<ListPurchase />} />
        <Route path='/purchase/view/:id' element={<ViewPurchase />} />
        <Route path='/purchase/daily/usd' element={<DailyPurchaseUSD />} />
        <Route path='/purchase/daily/zwl' element={<DailyPurchaseZWL />} />
        <Route path='/purchase/daily/usd/:created_at' element={<PurchaseByDayUSD />} />
        <Route path='/purchase/daily/zwl/:created_at' element={<PurchaseByDayZWL />} />
        <Route path='/purchase/product/day/usd' element={<DayPurchaseProductUSD />} />
        <Route path='/purchase/product/day/zwl' element={<DayPurchaseProductZWL />} />
        <Route path='/purchase/month/usd' element={<MonthPurchaseProductUSD />} />
        <Route path='/purchase/month/zwl' element={<MonthPurchaseProductZWL />} />
        <Route path='/purchase/supplier' element={<PurchaseSupplier />} />
        <Route path='/purchase/supplier/monthly/:id' element={<SupplierMonthlyPurchase />} />
        <Route path='/purchase/supplier/daily/:id' element={<SupplierDailyPurchase />} />
        {/* ------------------- SUPPLIER ------------------- */}
        <Route path='/supplier' element={<ListSupplier />} />
        <Route path='/supplier/add' element={<AddSupplier />} />
        <Route path='/supplier/edit/:id' element={<EditSupplier />} />
        <Route path='/supplier/view/:id' element={<ViewSupplier />} />
        {/* ------------------- Setting ------------------- */}
        <Route path='/settings' element={<SettingPage />} />
        <Route path='/settings/app-info' element={<AppInfoPage />} />
        <Route path='/settings/currency' element={<CurrencyPage />} />
        
      </Routes> 
    </>
  )
}

export default App
