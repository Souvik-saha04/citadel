import Card from '../components/card'
import './products.css'
export default function Products()
{
    return(
        <div className="product-section">
            <div className="section-header">
                <h2 className="section-title">Rolling paper & tobacco</h2>
                <a href="#" className="see-all">see all</a>
            </div>
            <div className="product-grid">
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    )
}