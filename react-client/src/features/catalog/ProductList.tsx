import {Product} from "../../app/models/product.ts";
import {Grid2} from "@mui/material";
import ProductCard from "./ProductCard.tsx";

type Props ={
    products:Product[];
}

const ProductList = ({products}: Props) => {
    return (
        <Grid2 container spacing={3}>
            {products.map((product) => (
                <Grid2 key={product.id} size={3} display="flex">
                    <ProductCard key={product.id} product={product}/>
                </Grid2>
            ))}
        </Grid2>
    );
};

export default ProductList;
