import React, { useEffect } from 'react'
import CategoryContainer from '../../Components/Category/CategoryContainer'
import PaginationTabs from '../../Components/Utils/Pagination'
import CategoryPageTitle from '../../Components/Category/CategoryPageTitle'
import AllCatePageHook from '../../customHooks/Category/AdminGetAllCategoryHook'
import LoadingProgress from '../../Components/LoadingProgress'

const CategoryPage = () => {

  const [
    category,
    loading,
    onPageChange,
    paginationResult,
    onSearch,
    onSort
  ] = AllCatePageHook();
  return (
    <div>
      <LoadingProgress loading={loading} />
      <CategoryPageTitle />
      <CategoryContainer category={category.data} />
      <PaginationTabs paginationResult={paginationResult} onPageChange={onPageChange} />
    </div>
  )
}

export default CategoryPage
// 1- done
// 2-responsive 