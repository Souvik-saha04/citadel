import './add.css';
export default function Add()
{
    return(
        <div className="hero-banner">
            <div className="hero-content">
                <h1>Stock up on daily essentials</h1>
                <p>Get farm-fresh goodness & a range of exotic<br/>fruits, vegetables, eggs & more</p>
                <button className="hero-btn">Shop Now</button>
            </div>
            <div className="hero-image">
                <div style={{width: "500px", height: "200px", display: "flex", gap: "10px", alignItems: "center"}}>
                    <div style={{width: "80px", height: "120px", background: "#fff", borderRadius: "8px"}}></div>
                    <div style={{width: "60px", height: "100px", background: "#fff", borderRadius: "8px"}}></div>
                    <div style={{width: "70px", height: "110px", background: "#fff", borderRadius: "8px"}}></div>
                    <div style={{width: "90px", height: "90px", background: "#fff", borderRadius: "50%"}}></div>
                    <div style={{width: "60px", height: "80px", background: "#fff", borderRadius: "8px"}}></div>
                    <div style={{width: "80px", height: "130px", background: "#fff", borderRadius: "8px"}}></div>
                </div>
            </div>
        </div>
    )
}