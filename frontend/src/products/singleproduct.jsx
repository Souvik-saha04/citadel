
import { useContext, useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { ShoppingCart, Package, Calendar, User, Store, Minus, Plus } from 'lucide-react';
import './singleproduct.css';

function ProductView() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Fetch all products from backend
  useEffect(() => {
    fetch('http://localhost:8000/products/get_products/')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

if (loading) return <p>Loading...</p>;

  // Find the product matching the ID from URL
  const product = products.find(p => p.id === Number(id));
  if (!product) return <p>Product not found</p>;

  const getStockClass = (stock) => {
    if (stock === 0) return 'stock-empty';
    if (stock <= 10) return 'stock-low';
    return 'stock-available';
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', className: 'status-empty' };
    if (stock <= 10) return { text: `Only ${stock} left`, className: 'status-low' };
    return { text: `${stock} in stock`, className: 'status-available' };
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < product.stock_quantity) {
      setQuantity(q => q + 1);
    }
    if (action === 'decrease' && quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const stockStatus = getStockStatus(product.stock_quantity);

  return (
    <div className="product-view-container">
      <div className="product-view-wrapper">
        {/* Main Product Section */}
        <div className={`product-card ${getStockClass(product.stock_quantity)}`}>
          <div className="product-view-grid">
            {/* Product Image */}
            <div className="product-image-container">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy"/>
              </div>
            </div>

            {/* Product Details */}
            <div className="product-details">
              {/* Category */}
              <div className="product-category">
                {product.category}
              </div>

              {/* Product Name */}
              <h1 className="product-name">
                {product.name}
              </h1>

              {/* Variant */}
              <div className="product-variant">
                <Package size={18} />
                <span>Variant: <span className="variant-value">{product.variant}</span></span>
              </div>

              {/* Unit */}
              <div className="product-unit">
                Unit: <span className="unit-value">{product.unit}</span>
              </div>

              {/* Price */}
              <div className="product-price-container">
                <span className="product-price">₹{product.price_per_unit}</span>
                <span className="product-original-price">₹{product.original_price}</span>
                <span className="product-discount">
                  {Math.round(((product.original_price - product.price_per_unit) / product.original_price) * 100)}% OFF
                </span>
              </div>

              {/* Stock Status */}
              <div className={`stock-status ${stockStatus.className}`}>
                {stockStatus.text}
              </div>

              {/* Dates */}
              <div className="product-dates">
                <div className="date-card">
                  <div className="date-label">
                    <Calendar size={16} />
                    <span>Harvest Date</span>
                  </div>
                  <div className="date-value">{product.harvest_date}</div>
                </div>
                <div className="date-card">
                  <div className="date-label">
                    <Calendar size={16} />
                    <span>Expiry Date</span>
                  </div>
                  <div className="date-value">{product.expiry}</div>
                </div>
              </div>

              {/* Seller Information */}
              <div className="seller-info">
                <div className="seller-name">
                  <User size={18} />
                  <span>{product.nameSeller}</span>
                </div>
                <div className="seller-type">
                  <Store size={18} />
                  <span>{product.typeSeller}</span>
                </div>
              </div>

              {/* Quantity Selector & Add to Cart */}
              {product.stock_quantity > 0 && (
                <div className="product-actions">
                  <div className="quantity-selector">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="quantity-btn"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="quantity-btn"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <button className="add-to-cart-btn">
                    <ShoppingCart size={20} />
                    Add to Cart - ₹{product.price_per_unit * quantity}
                  </button>
                </div>
              )}

              {product.stock_quantity === 0 && (
                <button disabled className="out-of-stock-btn">
                  Out of Stock
                </button>
              )}

              {/* Description */}
              <div className="product-description-section">
                <h3 className="description-title">Product Description</h3>
                <p className="description-text">{product.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {/* <div className="related-products-section">
          <h2 className="related-products-title">Related Products</h2>
          <div className="related-products-grid">
            {relatedProduct.map((item) => {
              const itemStockStatus = getStockStatus(item.stock_quantity);
              return (
                <div
                  key={item.id}
                  className={`related-product-card ${getStockClass(item.stock_quantity)}`}
                >
                  <div className="related-product-image-container">
                    <div className="related-product-image">{item.image}</div>
                  </div>
                  <div className="related-product-category">{item.category}</div>
                  <h3 className="related-product-name">{item.name}</h3>
                  <div className="related-product-unit">{item.unit}</div>
                  <div className="related-product-footer">
                    <span className="related-product-price">₹{item.price_per_unit}</span>
                    <span className={`related-stock-status ${itemStockStatus.className}`}>
                      {itemStockStatus.text}
                    </span>
                  </div>
                  {item.stock_quantity > 0 ? (
                    <button className="related-add-to-cart-btn">
                      Add to Cart
                    </button>
                  ) : (
                    <button disabled className="related-out-of-stock-btn">
                      Out of Stock
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductView;




/* const ProductView = () => {
  const [quantity, setQuantity] = useState(1);
  const { id }=useParams();
    const product=data.find(p=>p.id===Number(id))
  
  const getStockClass = (stock) => {
    if (stock === 0) return 'stock-empty';
    if (stock <= 10) return 'stock-low';
    return 'stock-available';
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', className: 'status-empty' };
    if (stock <= 10) return { text: `Only ${stock} left`, className: 'status-low' };
    return { text: `${stock} in stock`, className: 'status-available' };
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const stockStatus = getStockStatus(product.stock_quantity);}; */
