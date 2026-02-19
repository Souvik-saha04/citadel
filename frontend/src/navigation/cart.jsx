import './cart.css'
import axiosInstance from "../api/axiosInstance"
import {  useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { BsCart3 } from "react-icons/bs";

export default function Cart() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [cartStats, setCartStats] = useState({
        mrp: 0,
        discount: 0,
        total: 0,
        itemCount: 0,
        negotiatedPrice:0
    })
    
    useEffect(() => {
        fetchCart();
    }, [])

    const fetchCart = () => {
        axiosInstance.get("/cart/")
        .then(res => {
            if (res.data.message) {
                setProducts([]);
                setCartStats({ mrp: 0, discount: 0, total: 0, itemCount: 0 , negotiatedPrice: 0});
            } else {
                setProducts(res.data);
                calculateCartStats(res.data);
            }
        })
        .catch(err => {
            console.error("Error fetching cart:", err);
        });
    }

    const calculateCartStats = (items) => {
    let mrp = 0;
    let negotiatedTotal = 0;
    let itemCount = 0;

    items.forEach(item => {
        const itemMrp = parseFloat(item.original_price) * item.quantity;
        const itemNegotiatedPrice = parseFloat(item['total price']);
        
        mrp += itemMrp;
        negotiatedTotal += itemNegotiatedPrice;
        itemCount += item.quantity;
    });

    const discount = mrp - negotiatedTotal;
    const platformFee = 5;
    const deliveryFee = 20;

    setCartStats({
        mrp: mrp.toFixed(2),
        negotiatedPrice: negotiatedTotal.toFixed(2),  // This is your negotiated subtotal
        discount: discount.toFixed(2),
        total: (negotiatedTotal + platformFee + deliveryFee).toFixed(2),
        itemCount: itemCount
    });
}

    const removeItem = (productId) => {
        axiosInstance.delete("/cart/delete/", {
            data: {
                product_id: productId
            }
        })
        .then(res => {
            console.log("Item removed");
            fetchCart(); // Refresh entire cart
        })
        .catch(err => {
            console.error("Error removing item:", err);
            alert("Failed to remove item");
        });
    }

    const updateQuantity = (product_id, change) => {
        axiosInstance.post("/cart/update/", {
            product_id: product_id,
            updated_quantity: change
        })
        .then(res => {
            const newQuantity = res.data.quantity;
            console.log("Quantity updated to:", newQuantity);

            if (newQuantity === 0) {
                // Item was removed
                setProducts(prevProducts =>
                    prevProducts.filter(product => product.product_id !== product_id)
                );
            } else {
                // Update quantity and recalculate total price
                setProducts(prevProducts =>
                    prevProducts.map(product =>
                        product.product_id === product_id
                            ? { 
                                ...product, 
                                quantity: newQuantity,
                                'total price': product['price per unit'] * newQuantity
                              }
                            : product
                    )
                );
            }
        })
        .catch(err => {
            console.error("Error updating quantity:", err);
            alert("Failed to update quantity");
        });
    };

    // Recalculate stats whenever products change
    useEffect(() => {
        if (products.length > 0) {
            calculateCartStats(products);
        } else {
            setCartStats({ mrp: 0, discount: 0, total: 0, itemCount: 0 });
        }
    }, [products]);

    const placeOrder = () => {
        if (products.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        console.log("Placing order...");
        alert("Order placement feature coming soon!");
    }


    return (
        <div className='cart-body'>
            <header>
                <div className="header-container">
                    <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
                        <span className="green">green</span><span className="black">Grocers</span>
                    </div>
                    <nav className="header-nav">
                        <button className="cart-btn">
                            <BsCart3 /> My Cart
                        </button>
                    </nav>
                </div>
            </header>
            <div className="cart-container">
                <div>
                    <div className="card delivery-card">
                        <div className="delivery-info">
                            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
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
                                <BsCart3 /> My Cart ({cartStats.itemCount})
                            </div>
                            <div className="cart-category">Grocery</div>
                        </div>

                        {products.length > 0 ? (
                            products.map((product) => (
                                <div className="cart-item" key={product.product_id}>
                                    <div className="item-image">{}</div>
                                    <div className="item-details">
                                        <div className="item-name">
                                            {product.name}
                                            {product.is_negotiated && (
                                            <span style={{
                                                marginLeft: '10px',
                                                padding: '2px 8px',
                                                backgroundColor: '#4CAF50',
                                                color: 'white',
                                                borderRadius: '4px',
                                                fontSize: '12px'
                                            }}>
                                                Negotiated
                                            </span>
                                        )}
                                        </div>
                                        <div className="item-unit">₹{product['price per unit']} per unit</div>
                                        <div className="item-category">{product.category}</div>
                                        <div className="item-pricing">
                                            <span className="item-price">₹{product['total price']}</span>
                                            <span className="item-mrp">₹{(product.original_price * product.quantity).toFixed(2)}</span>
                                            <span className="item-discount">
                                                {Math.round(((product.original_price - product['price per unit']) / product.original_price) * 100)}% Off
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item-actions">
                                        <button className="remove-btn" onClick={() => removeItem(product.product_id)}>
                                            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                        <div className="quantity-controls">
                                            <button className="qty-btn" onClick={() => updateQuantity(product.product_id, -1)}>−</button>
                                            <span className="qty-display">{product.quantity}</span>
                                            <button className="qty-btn" onClick={() => updateQuantity(product.product_id, 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-cart" style={{padding: '40px', textAlign: 'center', color: '#666'}}>
                                <p>Your cart is empty</p>
                                <button 
                                    onClick={() => navigate('/')} 
                                    style={{
                                        marginTop: '20px', 
                                        padding: '10px 20px', 
                                        cursor: 'pointer',
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className="card price-card">
                        <div className="price-title">Price Details</div>

                        <div className="price-row">
                            <span className="price-label">MRP</span>
                            <span className="price-value">₹{cartStats.mrp}</span>
                        </div>
                        <div className="price-row">
                            <span className="price-label">Price</span>
                            <span className="price-value">₹{cartStats.negotiatedPrice}</span>
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
                            <span className="price-discount">− ₹{cartStats.discount}</span>
                        </div>

                        <div className="total-divider"></div>

                        <div className="total-row">
                            <span className="total-label">Total Amount</span>
                            <span className="total-value">₹{cartStats.total}</span>
                        </div>

                        <div className="savings-box">
                            <span>🏷️</span>
                            <span className="savings-text">You will save ₹{cartStats.discount} on this order</span>
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

                        <button 
                            className="place-order-btn" 
                            onClick={placeOrder}
                            disabled={products.length === 0}
                        >
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}