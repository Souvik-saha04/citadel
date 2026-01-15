import './cart.css'

export default function Cart() {
    return (
    <div className='cart-body'>
            <header>
                <div className="header-container">
                    <div className="logo">
                        <span className="green">green</span><span className="black">Grocers</span>
                    </div>
                    <nav className="header-nav">
                        <a href="#" className="nav-link">Login</a>
                        <a href="#" className="nav-link">Register</a>
                        <button className="cart-btn">
                            🛒 My Cart
                        </button>
                    </nav>
                </div>
            </header>
            <div className="cart-container">
                <div>
                    <div className="card delivery-card">
                        <div className="delivery-info">
                            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <div>
                                <div className="delivery-title">
                                    Deliver to: <span className="highlight">Home, 700124</span>
                                </div>
                                <div className="delivery-address">
                                    BG2, Pocket B, South City I, Sector 41, Gurgaon
                                </div>
                            </div>
                        </div>
                        <button className="change-btn">Change</button>
                    </div>

            
                    <div className="card">
                        <div className="cart-header">
                            <div className="cart-title">
                                🛒 My Cart (3)
                            </div>
                            <div className="cart-category">Grocery</div>
                        </div>

                        
                        <div className="cart-item">
                            <div className="item-image">🍅</div>
                            <div className="item-details">
                                <div className="item-name">Fresh Organic Tomatoes</div>
                                <div className="item-unit">500g</div>
                                <div className="item-category">Fruits & Vegetables</div>
                                <div className="item-pricing">
                                    <span className="item-price">₹120</span>
                                    <span className="item-mrp">₹180</span>
                                    <span className="item-discount">33% Off</span>
                                </div>
                            </div>
                            <div className="item-actions">
                                <button className="remove-btn" onclick="removeItem(1)">
                                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                                <div className="quantity-controls">
                                    <button className="qty-btn" onclick="updateQuantity(1, -1)">−</button>
                                    <span className="qty-display" id="qty-1">2</span>
                                    <button className="qty-btn" onclick="updateQuantity(1, 1)">+</button>
                                </div>
                            </div>
                        </div>

                
                        <div className="cart-item">
                            <div className="item-image">🥛</div>
                            <div className="item-details">
                                <div className="item-name">Farm Fresh Milk</div>
                                <div className="item-unit">1L</div>
                                <div className="item-category">Dairy, Bread & Eggs</div>
                                <div className="item-pricing">
                                    <span className="item-price">₹65</span>
                                    <span className="item-mrp">₹75</span>
                                    <span className="item-discount">13% Off</span>
                                </div>
                            </div>
                            <div className="item-actions">
                                <button className="remove-btn" onclick="removeItem(2)">
                                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                                <div className="quantity-controls">
                                    <button className="qty-btn" onclick="updateQuantity(2, -1)">−</button>
                                    <span className="qty-display" id="qty-2">1</span>
                                    <button className="qty-btn" onclick="updateQuantity(2, 1)">+</button>
                                </div>
                            </div>
                        </div>

            
                        <div className="cart-item">
                            <div className="item-image">🍞</div>
                            <div className="item-details">
                                <div className="item-name">Whole Wheat Bread</div>
                                <div className="item-unit">400g</div>
                                <div className="item-category">Bakery & Biscuits</div>
                                <div className="item-pricing">
                                    <span className="item-price">₹45</span>
                                    <span className="item-mrp">₹55</span>
                                    <span className="item-discount">18% Off</span>
                                </div>
                            </div>
                            <div className="item-actions">
                                <button className="remove-btn" onclick="removeItem(3)">
                                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                                <div className="quantity-controls">
                                    <button className="qty-btn" onclick="updateQuantity(3, -1)">−</button>
                                    <span className="qty-display" id="qty-3">3</span>
                                    <button className="qty-btn" onclick="updateQuantity(3, 1)">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div>
                    <div className="card price-card">
                        <div className="price-title">Price Details</div>

                        <div className="price-row">
                            <span className="price-label">MRP</span>
                            <span className="price-value" id="mrp-total">₹545</span>
                        </div>

                        <div className="price-row">
                            <span className="price-label">Platform Fee</span>
                            <span className="price-value">₹5</span>
                        </div>

                        <div className="price-row">
                            <span className="price-label">Delivery Fee</span>
                            <span className="price-value">₹20</span>
                        </div>

                        <div className="price-divider"></div>

                        <div className="price-row">
                            <span className="price-label">Discount on MRP</span>
                            <span className="price-discount" id="discount-total">− ₹75</span>
                        </div>

                        <div className="total-divider"></div>

                        <div className="total-row">
                            <span className="total-label">Total Amount</span>
                            <span className="total-value" id="total-amount">₹495</span>
                        </div>

                        <div className="savings-box">
                            <span>🏷️</span>
                            <span className="savings-text" id="savings-text">You will save ₹75 on this order</span>
                        </div>

                        <div className="features-list">
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                <span>Safe and Secure Payments</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span>
                                <span>Easy returns. 100% Authentic products</span>
                            </div>
                        </div>

                        <button className="place-order-btn" onclick="placeOrder()">PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
