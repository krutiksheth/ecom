import ProductList from "./ProductList.tsx";
import {useFetchProductsQuery} from "./catalogApi.ts";

const Catalog = () =>{

 const { data, isLoading } = useFetchProductsQuery();   
 
 if (isLoading || !data) {
     return <div>Loading...</div>;
 }
 
// const [products, setProducts] = useState<Product[]>([]);
//
// useEffect(() => {
//     fetch("https://localhost:5001/api/products")
//         .then(res => res.json())
//         .then(data => setProducts(data))
//         .catch(err => console.log(err));
// }, [])
    
    return (
        <>
            <ProductList products={data} />
        </>
    );
};

export default Catalog;
