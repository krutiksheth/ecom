import {useEffect, useState} from "react";
import {Product} from "../models/product.ts";

function App() {
  
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        fetch("https://localhost:5001/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    },[])
    
    return (
    <>
      <h1>Ecom</h1>
        <ul>
            {products.map((product, index) => (
                <li key={index}>
                    {index+1}: {product.name}: {product.price}
                </li>
            ))}
        </ul>
    </>
  )
}

export default App
