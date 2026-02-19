import { Link,useSearchParams } from 'react-router-dom'
import Card from '../components/card'
import './category_prod_sec.css';

const ProductListing = ({products = []}) => {
  const [searchparams,setSearchParams]=useSearchParams();
     
  const categories = [
    "Vegetables",
    "Leafy",
    "Millets",
    "Cereals",
    "Eggs",
    "Meat"
  ];

  const selectedCategory  =searchparams.get("category") || "Vegetables" ;

  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory
  );

  return (
    <div className="category-container">
      <aside className="category-section">
        <Link to='/' className='home-navigator'>Home</Link>
        <h2 className="category-section-title">Categories</h2>
        {categories.map((category) => (
          <div key={category} className="category-item">
            <div 
              className={`category-header ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSearchParams({category})}
            >
              <span>{category}</span>
            </div>
          </div>
        ))}
      </aside>

      <main className="product-container">
        <div className="product-header">
          <h1>{selectedCategory}</h1>
          <p className="product-count">{filteredProducts?.length || 0} products</p>
        </div>
        
        <div className="product-grid">
          {filteredProducts?.map((product) => (
           <Link key={product.id} to={`/product/${product.id}`}>
            <Card data={product}/>
           </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListing;