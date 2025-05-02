import ProductList from "./ProductList.tsx";
import {useFetchProductsQuery} from "./catalogApi.ts";
import {Grid2, Typography} from "@mui/material";
import Filters from "./Filters.tsx";
import {useAppDispatch, useAppSelector} from "../../app/store/store.ts";
import AppPagination from "../../app/shared/AppPagination.tsx";
import {setPage} from "./catalogSlice.ts";

const Catalog = () => {

    const productParams = useAppSelector(
        (state) => state.catalog);
    const {data, isLoading} = useFetchProductsQuery(productParams);
    const dispatch = useAppDispatch();


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
                {data.items.length>0 ? (<> <ProductList products={data.items}/>
                    <AppPagination pagination={data.pagination}
                                   onPageChange={(page) => dispatch(setPage(page))}></AppPagination></>):(
                    <Typography variant="h5">There are no results for this filter</Typography>) 
                }
            </Grid2>
        </Grid2>
    );
};

export default Catalog;
