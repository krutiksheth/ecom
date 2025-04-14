import {Product} from "../../app/models/product.ts";

type Props ={
    products: Product[];
}

const Catalog = ({products}:Props) => {
    return (
        <><ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name}: {product.price}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Catalog;
