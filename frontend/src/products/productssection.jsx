import Card from "../components/card";
import { Link } from "react-router-dom";
import './productssection.css'

export default function Products({products}) {
const categories = [
  "Vegetables",
  "Leafy",
  "Millets",
  "Cereals",
  "Eggs",
  "Meat"
];

  return (
    <>
      {categories.map((category) => {
        const categoryProducts = products
        .filter(
          (p) => p.category === category
        )
        .slice(0,5);
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
