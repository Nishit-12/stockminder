import React from 'react'
import Header from './components/Header'
import Search from './components/Search'
import AddProduct from './components/AddProduct'
import DisplayProduct from './components/DisplayProduct'

const page = () => {
  return (
    <>
    <div className='container mx-auto my-8 resposive' >
    <Header />
    <Search />
    <AddProduct />
    <DisplayProduct />  
    </div>      

    </>
  )
}

export default page