import {Product} from "../../app/models/product.ts";
import {Box} from "@mui/material";
import ProductCard from "./ProductCard.tsx";

type Props ={
    products:Product[];
}

const ProductList = ({products}: Props) => {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap:3, justifyContent: "center" }}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </Box>
    );
};

export default ProductList;
