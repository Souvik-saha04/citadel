import './categories.css'
import { Link } from 'react-router-dom'
export default function Categories()
{
    const categories=[
        {name:"Vegetables",image:"/vegetables.jfif"},
        {name:"Leafy",image:"/leafy.jfif"},
        {name:"Millets",image:"/millets.jfif"},
        {name:"Cereals",image:"/cereals.jfif"},
        {name:"Eggs",image:"/dairy.jfif"},
         {name:"Meat",image:"/chicken.jfif"}
    ]
     
    return(
            <div className="category-grid">
                {categories.map((category)=>(
                    <Link to={`/products?category=${category.name}`} key={category.name}>
                    <div className="category-item" >
                        <div className="category-icon">
                            <img src={category.image} alt={category.image} />
                        </div>
                        <div className="category-name">
                            {category.name}
                        </div>
                    </div> 
                    </Link>

                ))}
            </div>
        )
}