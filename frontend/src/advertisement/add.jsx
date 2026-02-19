import './add.css';
import { MessageCircle, TrendingDown, Sparkles } from 'lucide-react';

export default function Add() {
    return(
        <div className="hero-banner">
            <div className="hero-content">
                <div className="feature-badge">
                    <Sparkles size={16} />
                    <span>AI-Powered Feature</span>
                </div>
                <h1>Negotiate. Save. Shop Smart.</h1>
                <p>Our AI negotiates the best prices for you!<br/>Get instant discounts on every product</p>
                <button className="hero-btn">
                    <MessageCircle size={20} />
                    <span>Try AI Negotiation</span>
                </button>
            </div>
            <div className="hero-image">
                <div className="negotiation-visual">
                    <div className="price-card original">
                        <div className="price-label">Original</div>
                        <div className="price-amount">₹100</div>
                    </div>
                    
                    <div className="ai-avatar">
                        <div className="ai-icon">AI</div>
                        <div className="negotiation-waves">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    
                    <div className="price-card negotiated">
                        <div className="price-label">Your Price</div>
                        <div className="price-amount">₹70</div>
                        <div className="savings-badge">
                            <TrendingDown size={14} />
                            30% OFF
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}