import './smallad.css'

export default function Smallad() {
    return(
        <div className="category-cards">
            <div className="category-card card-farm">
                <h3>Farm to<br/>Your Table</h3>
                <p>Fresh vegetables sourced<br/>directly from local farms</p>
                <button className="card-btn">Shop Now</button>
            </div>
            <div className="category-card card-delivery">
                <h3>Lightning Fast<br/>Delivery</h3>
                <p>Get your groceries delivered<br/>in just 8 minutes</p>
                <button className="card-btn">Order Now</button>
            </div>
            <div className="category-card card-freshness">
                <h3>Freshness<br/>Guaranteed</h3>
                <p>Track harvest dates and<br/>expiry for every product</p>
                <button className="card-btn">Learn More</button>
            </div>
        </div>
    )
}