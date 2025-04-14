import {useEffect, useState} from "react";
import {Product} from "../models/product.ts";
import Catalog from "../../features/catalog/Catalog.tsx";
import {Container} from "@mui/material";
import NavBar from "./NavBar.tsx";

function App() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("https://localhost:5001/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <NavBar></NavBar>
            <Container maxWidth="xl" sx={{mt:14}}>
                <Catalog products={products}/>
            </Container>
        </>
    )
}

export default App
