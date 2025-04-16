import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Product} from "../../app/models/product.ts";

const ProductDetails = () => {
    
    const baseUrl = "https://localhost:5001/api/products";
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(baseUrl + `/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.log(err));
    }, [id])

    if(!product) return <></>
    
    return (
        <div>
            Product Details : {product.name}
        </div>
    );
};

export default ProductDetails;
