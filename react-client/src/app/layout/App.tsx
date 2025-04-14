import {useEffect, useState} from "react";
import {Product} from "../models/product.ts";
import Catalog from "../../features/catalog/Catalog.tsx";
import {Container, Typography} from "@mui/material";

function App() {
  
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        fetch("https://localhost:5001/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    },[])
    
    return (
    <Container maxWidth="xl">
        <Typography variant="h4">Ecom</Typography>
        <Catalog products={products} />
    </Container>
  )
}

export default App
