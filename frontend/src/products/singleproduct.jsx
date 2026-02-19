import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { ShoppingCart, Package, Calendar, User, Store, Minus, Plus, MessageCircle, Send } from 'lucide-react';
import './singleproduct.css';
import axios from 'axios';

function ProductView() {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userOffer, setUserOffer] = useState('');
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [negotiationActive, setNegotiationActive] = useState(true);
  const [finalPrice, setFinalPrice] = useState(null);
  const [roundsRemaining, setRoundsRemaining] = useState(5);

  useEffect(() => {
    axios.get(`http://localhost:8000/products/${id}/`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [id]);

  const product = products;
  
  if (loading) return <div className="loader"></div>;
  if (!product) return <p>Product not found</p>;

  const AddToCart = async () => {
    try {
      const priceToUse = finalPrice || product.price_per_unit;
      
      const res = await axiosInstance.post("cart/add/", {
        product_id: product.id,
        quantity: quantity,
        negotiated_price:finalPrice || null
      });
      
      alert(`Item added to cart at ₹${priceToUse}`);
    } catch (error) {
      console.error("Add to cart failed", error);

      if (error.response?.status === 401) {
        alert("Please login to add items to cart");
      } else {
        alert("Failed to add item to cart");
      }
    }
  };

  const handleNegotiation = async () => {
    if (!userOffer || isNegotiating || !negotiationActive) return;

    const offer = Number(userOffer);

    // Validate offer
    if (offer <= 0) {
      alert("Please enter a valid price");
      return;
    }

    // Push user message immediately
    setMessages(prev => [
      ...prev,
      { type: 'user', price: offer }
    ]);

    setIsNegotiating(true);
    setUserOffer('');

    try {
      const res = await axiosInstance.post('/negotiate/', {
        product_id: product.id,
        user_price: offer,
      });

      const { decision, price, message, round_no } = res.data;

      setRoundsRemaining(5 - round_no);

      setMessages(prev => [
        ...prev,
        {
          type: 'ai',
          text: message,
          decision: decision,
          price: price
        }
      ]);

      if (decision === 'ACCEPT') {
        setFinalPrice(offer);
        setNegotiationActive(false);
        setTimeout(() => {
          alert(`Congratulations! Your offer of ₹${offer} has been accepted!`);
        }, 500);
      }

    } catch (err) {
      console.error("Negotiation error:", err);
      
      let errorMessage = 'Negotiation failed. Please try again.';
      
      if (err.response?.status === 403) {
        errorMessage = err.response.data.error || 'Negotiation limit reached. No more offers allowed.';
        setNegotiationActive(false);
        setRoundsRemaining(0);
      } else if (err.response?.status === 401) {
        errorMessage = 'Please login to negotiate';
      }
      
      setMessages(prev => [
        ...prev,
        { type: 'ai', text: errorMessage }
      ]);
    } finally {
      setIsNegotiating(false);
    }
  };

  

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
  const displayPrice = finalPrice || product.price_per_unit;

  return (
    <div className="product-view-container">
      <div className="product-view-wrapper">
        <div className={`product-card ${getStockClass(product.stock_quantity)}`}>
          <div className="product-view-grid">
            <div className="product-image-container">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy"/>
              </div>
            </div>

            <div className="product-details">
              <div className="product-category">
                {product.category}
              </div>

              <h1 className="product-name">
                {product.name}
              </h1>

              <div className="product-variant">
                <Package size={18} />
                <span>Variant: <span className="variant-value">{product.variant}</span></span>
              </div>

              <div className="product-unit">
                Unit: <span className="unit-value">{product.unit}</span>
              </div>

              <div className="product-price-container">
                <span className="product-price">₹{displayPrice}</span>
                {finalPrice && finalPrice < product.price_per_unit && (
                  <span className="negotiated-badge">Negotiated Price!</span>
                )}
                <span className="product-original-price">₹{product.original_price}</span>
                <span className="product-discount">
                  {Math.round(((product.original_price - displayPrice) / product.original_price) * 100)}% OFF
                </span>
              </div>

              <div className={`stock-status ${stockStatus.className}`}>
                {stockStatus.text}
              </div>

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

              {product.nameSeller && (
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
              )}

              {product.stock_quantity > 0 && (
                <div className="product-actions">
                  <div className="quantity-selector">
                    <button onClick={() => handleQuantityChange('decrease')} className="quantity-btn">
                      <Minus size={20} />
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button onClick={() => handleQuantityChange('increase')} className="quantity-btn">
                      <Plus size={20} />
                    </button>
                  </div>
                  <button className="add-to-cart-btn" onClick={AddToCart}>
                    <ShoppingCart size={20} />
                    Add to Cart - ₹{displayPrice * quantity}
                  </button>
                </div>
              )}

              {product.stock_quantity === 0 && (
                <button disabled className="out-of-stock-btn">
                  Out of Stock
                </button>
              )}

              {product.stock_quantity > 0 && (
                <div>
                  <button className="negotiate-btn" onClick={() => setShowNegotiation(!showNegotiation)}>
                    <MessageCircle size={20} />
                    {showNegotiation ? 'Close Negotiation' : 'Negotiate Price'}
                  </button>
                  
                </div>
              )}

              {showNegotiation && (
                <div className="negotiation-section">
                  <div className="negotiation-header">
                    <h3>Price Negotiation</h3>
                    <p>Chat with our AI to get the best deal!</p>
                    <div className="rounds-remaining">
                      <span className="rounds-badge">
                        {negotiationActive ? `${roundsRemaining} rounds remaining` : 'Negotiation ended'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="negotiation-chat">
                    {messages.length === 0 && (
                      <div className="chat-message ai">
                        <div className="ai-message">
                          <div className="message-avatar">AI</div>
                          <div className="message-content">
                            Hello! I'm here to help you get the best price. Make me an offer!
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {messages.map((msg, index) => (
                      <div key={index} className={`chat-message ${msg.type}`}>
                        {msg.type === 'ai' ? (
                          <div className="ai-message">
                            <div className="message-avatar">AI</div>
                            <div className="message-content">
                              {msg.text}
                              {msg.decision === 'ACCEPT' && (
                                <div className="finalized-price-badge accepted">
                                  ✓ Offer Accepted!
                                </div>
                              )}
                              {msg.decision === 'COUNTER' && msg.price && (
                                <div className="finalized-price-badge counter">
                                  Counter Offer: ₹{msg.price}
                                </div>
                              )}
                              {msg.decision === 'REJECT' && (
                                <div className="finalized-price-badge rejected">
                                  ✗ Try a better offer
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="user-message">
                            <div className="message-content">
                              <span className="offer-label">My Offer:</span>
                              <span className="offer-price">₹{msg.price}</span>
                            </div>
                            <div className="message-avatar">You</div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isNegotiating && (
                      <div className="chat-message ai">
                        <div className="ai-message">
                          <div className="message-avatar">AI</div>
                          <div className="message-content typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="negotiation-input">
                    <div className="input-wrapper">
                      <span className="currency-symbol">₹</span>
                      <input
                        type="number"
                        placeholder="Enter your offer price"
                        value={userOffer}
                        onChange={(e) => setUserOffer(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleNegotiation()}
                        disabled={isNegotiating || !negotiationActive}
                      />
                    </div>
                    <button 
                      className="send-offer-btn" 
                      onClick={handleNegotiation} 
                      disabled={isNegotiating || !negotiationActive || !userOffer}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                  
                  {!negotiationActive && finalPrice && (
                    <div className="negotiation-ended success">
                      🎉 Negotiation successful! Final price: ₹{finalPrice}
                    </div>
                  )}
                  {!negotiationActive && !finalPrice && (
                    <div className="negotiation-ended">
                      Negotiation has ended. Please add to cart at current price.
                    </div>
                  )}
                </div>
              )}

              <div className="product-description-section">
                <h3 className="description-title">Product Description</h3>
                <p className="description-text">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;