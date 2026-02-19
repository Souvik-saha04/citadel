import './categories.css'
import { Link } from 'react-router-dom'
export default function Categories()
{
    const categories=[
        "Vegetables",
        "Leafy",
        "Millets",
        "Cereals",
        "Eggs",
        "Meat"
    ]
     
    return(
            <div className="category-grid">
                {categories.map((category)=>(
                    <Link to={`/products?category=${category}`}>
                    <div className="category-item" key={category}>
                        <div className="category-icon"><img src="/sprouts.jfif" alt={category} /></div>
                        <div className="category-name">
                            {category}
                        </div>
                    </div> 
                    </Link>

                ))}
            </div>
        )
}