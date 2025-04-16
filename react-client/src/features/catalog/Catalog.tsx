import {Product} from "../../app/models/product.ts";
import ProductList from "./ProductList.tsx";
import {useEffect, useState} from "react";

const Catalog = () =>{

const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
    fetch("https://localhost:5001/api/products")
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.log(err));
}, [])
    
    return (
        <>
            <ProductList products={products} />
        </>
    );
};

export default Catalog;
