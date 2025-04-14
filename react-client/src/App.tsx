import {useEffect, useState} from "react";

function App() {
  
    const [products, setProducts] = useState<any[]>([]);
    
    useEffect(() => {
        fetch("https://localhost:5001/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    },[])
    
    const addProduct = ()=>{
        setProducts((prevProducts) => [...prevProducts, {
            name: `Product ${prevProducts.length+1}`,
            price:(prevProducts.length+1)*100,
        }])
    }
    
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
        <button onClick={addProduct}>Add Product</button>
    </>
  )
}

export default App
