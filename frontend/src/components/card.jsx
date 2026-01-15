import './card.css'
export default function Card()
{
    return(
         <div className="product-card">
            <div className="product-image">
                <div style={{width: "60px", height: "60px", background: "#333", borderRadius: "50%"}}></div>
            </div>
            <div className="delivery-time">⏱ 8 MINS</div>
            <div className="product-name">Bio-Degradable Crusher - Stash Pro</div>
            <div className="product-quantity">1 piece</div>
            <div className="product-footer">
                <div className="product-price">₹300</div>
                <button className="add-btn">ADD</button>
            </div>
        </div>
    )
}