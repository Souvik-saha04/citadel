import './smallad.css'
export default function Smallad()
{
    return(
        <div className="category-cards">
            <div className="category-card card-pharmacy">
                <h3 style={{color: "#fff"}}>Pharmacy at<br/>your doorstep!</h3>
                <p style={{color: "#fff"}}>Cough syrups, pain<br/>relief sprays & more</p>
                <button className="card-btn">Order Now</button>
            </div>
            <div className="category-card card-pet">
                <h3 style={{color: "#000"}}>Pet Care supplies<br/>in minutes</h3>
                <p style={{color: "#000"}}>Food, treats,<br/>toys & more</p>
                <button className="card-btn">Order Now</button>
            </div>
            <div className="category-card card-baby">
                <h3 style={{color: "#000"}}>No time for<br/>a diaper run?</h3>
                <p style={{color: "#000"}}>Get baby care<br/>essentials in minutes</p>
                <button className="card-btn">Order Now</button>
            </div>
        </div>
    )
}