import './homepage.css'
import Navbar from '../navigation/navbar';
import Products from '../products/products';
import Add from '../advertisement/add'
import Smallad from '../advertisement/smallad'
import Categories from '../categories/categories'

function Homepage({ auth }) {
  return (
    <>
      <Navbar auth={auth}/>
      <div className="container">
        <Add/>
        <Smallad/>
        <Categories/>
        <Products/>
      </div>
    </>
  )
}

export default Homepage
