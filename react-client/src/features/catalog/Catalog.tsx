import ProductList from "./ProductList.tsx";
import {useFetchProductsQuery} from "./catalogApi.ts";
import {Grid2} from "@mui/material";
import Filters from "./Filters.tsx";

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
        <Grid2 container spacing={4}>
            <Grid2 size={3}>
                <Filters/>
            </Grid2>
            <Grid2 size={9}>
                <ProductList products={data} />
            </Grid2>
        </Grid2>
    );
};

export default Catalog;
