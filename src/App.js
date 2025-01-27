
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


import HomePage from './Pages/HomePage';
import ProductPage from './Pages/Product/ProductPage';
import ProductDetailsPage from './Pages/Product/ProductDetailsPage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import CartPage from './Pages/Cart/CartPage';
import CategoryPage from './Pages/Category/CategoryPage';
import { ToastContainer } from 'react-toastify';
import AdminAllProdPage from './Pages/Admin/Product/AdminAllProdPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import { Padding } from '@mui/icons-material';
import AdminEditProductPage from './Pages/Admin/Product/AdminEditProductPage';
import AdminAddCouponsPage from './Pages/Admin/Coupon/AdminAddCouponsPage';
// import AdminOrderDetalis from './Components/Admin/AdminEditProductPagg';
// import OrderOverviewPage from './Components/Admin/AdminEditProductPagg';
// import OrderDetailsPage from './Components/Admin/AdminEditProductPagg';
// import OrderStatusSelector from './Components/Admin/AdminEditProductPagg';
// import AdminEditProduct from './Components/Admin/AdminEditProductPagg';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import Coupon from './Components/Admin/Dashboard/Coupon';
import Navbar from './Components/Utils/NavbarLogged';
import NavbarLogged from './Components/Utils/NavbarLogged';
import ForgotPasswordPage from './Pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from './Pages/Auth/ResetPasswordPage';
import VerifyResetCode from './Pages/Auth/VerifyResetCode';
import AdminEditCouponPage from './Pages/Admin/Coupon/AdminEditCouponPage';
import AdminAddCategoryPage from './Pages/Admin/Category/AdminAddCategoryPage';
import AdminAddProductPage from './Pages/Admin/Product/AdminAddProductPage';
import AddUserPage from './Pages/Admin/User/AdminCreateUserPage';
import ReviewSection from './Components/Review/UserAddReview';
import ProfilePage from './Pages/User/ProfilePage';
import WhishListPage from './Pages/Wishlist/WhishListPage';
import AdminAddAnnouncementPage from './Pages/Admin/Announcement/AdminAddAnnouncementPage';
import AdminProductPage from './Pages/Admin/Dashboard/AdminProductPage';
import AdminOrderPage from './Pages/Admin/Dashboard/AdminOrderPage';
import AdminUserPage from './Pages/Admin/Dashboard/AdminUserPage';
import AdminCategoryPage from './Pages/Admin/Dashboard/AdminCateoryPage';
import AdminCouponPage from './Pages/Admin/Dashboard/AdminCouponPage';
import AdminAnnouncementPage from './Pages/Admin/Dashboard/AdminAnnouncementPage';
import AdminEditAnnouncementPage from './Pages/Admin/Announcement/AdminEditAnnouncementPage';
import AdminEditCategoryPage from './Pages/Admin/Category/AdminEditCategoryPage';
import ProductInCategoryPage from './Pages/Product/ProductInCategoryPage';
import Brand from './Components/Admin/Dashboard/Brand';
import AdminAddBrandPage from './Pages/Admin/Brand/AdminAddBrandPage';
import PaymentPage from './Pages/Payment/PaymentPage';
import UserOrdersPage from './Pages/Order/OrderPage';
import WishListPage from './Pages/Wishlist/WhishListPage';
import BrandPage from './Pages/Brand/BrandPage';
import AdminAllBrandPage from './Pages/Admin/Brand/AdminAllBrandPage';
import { useEffect, useState } from 'react';
import NavbarUnLogged from './Components/Utils/NavbarUnLogged';
import ProductSearchContainer from './Components/Product/ProductSearchContainer';
import AdminAddSubcategoryPage from './Pages/Admin/Subcategory/AdminAddSubcategoryPage';
import CheckSession from './Components/Utils/CheckSession';
import AdminEditBrand from './Pages/Admin/Brand/AdminEditBrand';
import AdminSubcategoryPage from './Pages/Admin/Subcategory/AdminSubcategoryPage';
import AdminEditSubcategoryPage from './Pages/Admin/Subcategory/AdminEditSubcategoryPage';
import AdminOrderDetailsPage from './Pages/Admin/Order/AdminOrderDetailsPage';
const theme = createTheme({
  components: {
    // Override the default styles for all Material-UI icons
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent', // Remove hover background
            color: 'inherit', // Keep the default color
            transform: 'none', // Remove any transform effect on hover

          },
        },
      },
    },
  },
});





function App() {

  const [user, setUser] = useState('')
  useEffect(() => {

    if (localStorage.getItem("user") != null) {
      
      setUser(JSON.parse(localStorage.getItem("user")))
    }

  }, [])

  CheckSession();

  return (
    <div className="App">
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />


        <Router>

          {user !== '' ? <NavbarLogged /> : <NavbarUnLogged />}
          <Routes>


            <Route exact path='/' element={<HomePage />} />

            {/* <Route exact path='/navbar' element={<Navbar />} /> */}
            <Route exact path='/profile' element={<ProfilePage />} />

            <Route exact path='/category' element={<CategoryPage />} />
            <Route exact path='/brand' element={<BrandPage />} />
            <Route exact path='/product' element={<ProductPage />} />
            <Route exact path='/register' element={<RegisterPage />} />
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/ReviewSection' element={<ReviewSection />} />
            <Route exact path='/cart' element={<CartPage />} />
            <Route exact path='/product/:id' element={<ProductDetailsPage />} />
            <Route exact path='/wishlist' element={<WishListPage />} />
            <Route exact path='/category/:id/product' element={<ProductInCategoryPage />} />
            {/* <Route exact path='/product/:id' element={< ReviewSection />} /> */}
            {/* <Route exact path='/admin/update-Coupon/:id' element={<AdminEditCouponPage />} /> */}

            {/* test page */}
            <Route exact path='/user/forgetPassword' element={<ForgotPasswordPage />} />
            <Route exact path='/verifyResetCode' element={<VerifyResetCode />} />
            <Route exact path='/user/resetPassword' element={<ResetPasswordPage />} />

            {/* <Route exact path='/AdminAddCategoryPage' element={<AdminAddCategoryPage />} /> */}

            <Route exact path='/order' element={<UserOrdersPage />} />
            <Route exact path='/cart/:cartId/payment' element={<PaymentPage />} />
            {/* <Route exact path='/product/search' element={<ProductSearchContainer />} /> */}


            {/* Protected Route :Only Admins */}

            {/* <Route path="/admin/all-product" element={<AdminAllProdPage />} /> */}
            <Route exact path='/admin/product/update/:id' element={<AdminEditProductPage />} />
            {/* <Route exact path='/admin/add-coupon' element={<AdminAddCouponsPage />} /> */}
            <Route exact path='/dashboard/overview' element={<Dashboard />} />
            <Route exact path='/dashboard/category/create' element={<AdminAddCategoryPage />} />
            <Route exact path='/dashboard/products' element={<AdminProductPage />} />
            <Route exact path='/dashboard/orders' element={<AdminOrderPage />} />
            TODO<Route exact path='/dashboard/subcategory' element={<AdminSubcategoryPage />} />
            <Route exact path='/dashboard/users' element={<AdminUserPage />} />
            <Route exact path='/dashboard/categories' element={<AdminCategoryPage />} />
            <Route exact path='/dashboard/coupon' element={<AdminCouponPage />} />
            <Route exact path='/dashboard/announcement' element={<AdminAnnouncementPage />} />
            <Route exact path='/dashboard/update/announcement/:id' element={<AdminEditAnnouncementPage />} />
            <Route exact path='/dashboard/announcement/create' element={<AdminAddAnnouncementPage />} />
            <Route exact path='/dashboard/product/create' element={<AdminAddProductPage />} />
            <Route exact path='/dashboard/category/update/:id' element={<AdminEditCategoryPage />} />
            <Route exact path='/dashboard/brand/create' element={<AdminAddBrandPage />} />
            <Route exact path='/dashboard/brand/update/:id' element={<AdminEditBrand />} />
            <Route exact path='/dashboard/brands' element={<AdminAllBrandPage />} />
            <Route exact path='/dashboard/subcategory/create' element={<AdminAddSubcategoryPage />} />
            <Route exact path='/dashboard/coupon/create' element={<AdminAddCouponsPage />} />
            <Route exact path='/admin/coupon/update/:id' element={<AdminEditCouponPage />} />
            <Route exact path='/dashboard/subcategory/update/:id' element={<AdminEditSubcategoryPage />} />
            <Route exact path='/dashboard/user/create' element={<AddUserPage />} />
            <Route exact path='/dashboard/order/:id/details' element={<AdminOrderDetailsPage />} />


          </Routes>


        </Router>
      </ThemeProvider >

    </div >
  );
}

export default App;
