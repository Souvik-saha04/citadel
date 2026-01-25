import { useState,createContext,useEffect } from "react";

export const ProductContext=createContext();

export function ProductProvider({children}){
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(true)
    /* useEffect(()=>{
        fetch("http://localhost:8000/products/get_products/")
        .then((response)=> response.json())
        .then((data)=>{
        setProducts(data);
        setLoading(false)
        })
        .catch((error)=>console.log(error))
    },[]
    ) */
    return(
        <ProductContext.Provider value={{products,loading}}>
            {children}
        </ProductContext.Provider>
    );
}