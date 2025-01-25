// import React from 'react'
import Announcement from '../Components/Home/Announcement/Announcement'
import Product from '../Components/Product/ProductContainer'
import Footer from '../Components/Utils/Footer'
// import AdminAddCategoryPage from './Admin/AdminAddCategoryPage'
// import AdminAddProductPage from './Admin/AdminAddProductPage'
// import AsideBar from '../Components/Admin/AdminEditProductPagg'
// import Dashboard from '../Components/Admin/test/Dashboard'
// import Analytics from '../Components/Admin/test/Analytics'
// import Products from '../Components/Admin/test/Products'
// import Users from '../Components/Admin/test/Users'
import { useEffect, useState } from 'react'
import NavbarLogged from '../Components/Utils/NavbarLogged'
import NavbarUnLogged from '../Components/Utils/NavbarUnLogged'
import CategoryContainer from '../Components/Category/CategoryContainer'
import HomeCategory from '../Components/Home/Category/HomeCategory'
import HomeProduct from '../Components/Home/Product/HomeProduct'
import { Button } from '@mui/material'
import BrandHomePage from '../Components/Home/Brand/BrandHomePage'
// import Coupons from '../Components/Coupons'
const HomePage = () => {
 

  return (
    <div>


      <Announcement />
      <HomeCategory/>
      <HomeProduct/>
      <BrandHomePage />
      <Footer />



    </div>

  )
}

export default HomePage
