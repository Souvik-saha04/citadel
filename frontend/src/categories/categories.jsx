import './categories.css'
export default function Categories()
{
    return(
        <div className="category-grid">
            <div className="category-item">
                <div className="category-icon"><img src="/sprouts.jfif" alt="sprouts" /></div>
                <div className="category-name">Cuts and Sprouts</div>
            </div>
            <div className="category-item">
                <div className="category-icon"><img src="/dairy.jfif" alt="dairy" /></div>
                <div className="category-name">Dairy, Bread<br/>& Eggs</div>
            </div>
            <div className="category-item">
                <div className="category-icon"><img src="/fruits.jfif" alt="fruits" /></div>
                <div className="category-name">Fruits &<br/>Vegetables</div>
            </div>
            <div className="category-item">
                <div className="category-icon"><img src="/juices.jfif" alt="juices" /></div>
                <div className="category-name">Drinks<br/>& Juices</div>
            </div>
            <div className="category-item">
                <div className="category-icon"><img src="/munchies.jfif" alt="munchies" /></div>
                <div className="category-name">Snacks &<br/>Munchies</div>
            </div>
            <div className="category-item">
                <div className="category-icon"><img src="/instantfood.jfif" alt="instantfood" /></div>
                <div className="category-name">Breakfast &<br/>Instant Food</div>
            </div>
            <div className="category-item">
                <div className="category-icon"><img src="/chocolates.jfif" alt="chocolates" /></div>
                <div className="category-name">Sweet<br/>Tooth</div>
            </div>
            <div className="category-item">
                <div className="category-icon"><img src="/biscuits.jfif" alt="biscuits" /></div>
                <div className="category-name">Bakery &<br/>Biscuits</div>
            </div>
            <div className="category-item">
                <div className="category-icon"><img src="/grains.jfif" alt="grains" /></div>
                <div className="category-name">Seeds &<br/>Grains</div>
            </div>
            <div className="category-item">
                <div className="category-icon"><img src="/chicken.jfif" alt="chicken" /></div>
                <div className="category-name">Chicken, Fish<br/>& Protiens</div>
            </div>
        </div>
    )
}