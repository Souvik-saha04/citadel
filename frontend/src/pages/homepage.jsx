import './homepage.css'
import Navbar from '../navigation/navbar';
import Products from '../products/productssection';
import Add from '../advertisement/add'
import Smallad from '../advertisement/smallad'
import Categories from '../categories/categories'

function Homepage({ auth, setauth,products }) {
  return (
    <>
      <Navbar auth={auth} setauth={setauth}/>
      <div className="container">
        <Add/>
        <Smallad/>
        <Categories/>
        <Products products={products}/>
      </div>
    </>
  )
}

export default Homepage
