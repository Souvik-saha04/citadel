import './card.css'
import { lazy, memo } from 'react'
function Card({data})
{
    return(
         <div className="product-card-div">
            <div className="product-card-image">
                {/* <div style={{width: "60px", height: "60px", background: "#333", borderRadius: "50%"}}>{data.image}</div> */}
                <img src={data.image} alt={data.name} loading={lazy}/>
            </div>
            <div className="delivery-time">⏱ 8 MINS</div>
            <div className="product-card-name">{data.name}</div>
            <div className="product-quantity">{data.stock_quantity}</div>
            <div className="product-footer">
                <div className="product-card-price">{data.price_per_unit}/{data.unit}</div>
                <button className="add-btn">ADD</button>
            </div>
        </div>
    )
}
export default memo(Card)