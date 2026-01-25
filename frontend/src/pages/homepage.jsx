import './homepage.css'
import Navbar from '../navigation/navbar';
import Products from '../products/productssection';
import Add from '../advertisement/add'
import Smallad from '../advertisement/smallad'
import Categories from '../categories/categories'
import { useEffect } from "react";

function Homepage({ auth, setauth }) {

  useEffect(() => {
  fetch("http://localhost:8000/api/csrf/", {
    credentials: "include",
  });
}, []);

  return (
    <>
      <Navbar auth={auth} setauth={setauth}/>
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
