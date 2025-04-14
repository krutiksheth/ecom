import {Product} from "../../app/models/product.ts";
import ProductList from "./ProductList.tsx";

type Props ={
    products: Product[];
}

const Catalog = ({products}:Props) => {
    return (
        <>
            <ProductList products={products} />
        </>
    );
};

export default Catalog;
