import Card from "../components/card";
import { Link } from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import './productssection.css'
import { ProductContext } from "../context/ProductContext";

export default function Products() {
const categories = [
  "Vegetables",
  "Leafy",
  "Millets",
  "Cereals",
  "Eggs",
  "Meat"
];
const [products,setProducts]=useState([])
  // const {products}=useContext(ProductContext);
  useEffect(()=>{
        fetch("http://localhost:8000/products/get_products/")
        .then((response)=> response.json())
        .then((data)=>{
        setProducts(data);
        })
        .catch((error)=>console.log(error))
    },[]
    )
  return (
    <>
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (p) => p.category === category
        );
        if (categoryProducts.length === 0) return null;
        return (
          <div key={category} className="product-section">
            
            <div className="section-header">
              <h2 className="section-title">{category}</h2>
              <Link to={`/products?category=${category}`} className="see-all">
                See all
              </Link>
            </div>

            <div className="product-grid">
              {categoryProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} state={{p}}>
                  <Card data={p} />
                </Link>
              ))}
            </div>

          </div>
        );
      })}
    </>
  );
}
