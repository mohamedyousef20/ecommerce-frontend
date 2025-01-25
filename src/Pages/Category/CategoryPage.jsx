import React, { useEffect } from 'react'
import CategoryContainer from '../../Components/Category/CategoryContainer'
import PaginationTabs from '../../Components/Utils/Pagination'
import CategoryPageTitle from '../../Components/Category/CategoryPageTitle'
import AllCatePageHook from '../../customHooks/Category/AdminGetAllCategoryHook'

const CategoryPage = () => {

  const [category, loading, pagination, page] = AllCatePageHook();

  return (
    <div>

      <CategoryPageTitle />
      <CategoryContainer data={category.data} loading={loading} />
      <PaginationTabs data={page} onPress={pagination} />
    </div>
  )
}

export default CategoryPage
// 1- done
// 2-responsive 